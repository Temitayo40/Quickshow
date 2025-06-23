// src/stores/user.ts
import { defineStore } from "pinia";
import api from "@/lib/axios";
import { toast } from "vue3-toastify";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as null | {
      userId: string;
      email: string;
      role: string;
      name: string;
      imageUrl?: string;
    },
    token: null as string | null,
    favorites: [] as string[],
    isAdmin: false,
    shows: [] as any[],
  }),

  actions: {
    // For traditional login
    async login(email: string, password: string) {
      const res = await api.post("/auth/login", { email, password });
      this.token = res.data.access_token;
      this.user = res.data.user;
      api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
    },

    // For Google login callback
    async handleGoogleCallback(token: string) {
      this.token = token;
      localStorage.setItem("access_token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await this.fetchUser();
    },

    async fetchIsAdmin() {
      try {
        const { data } = await api.get("/api/admin/is-admin", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.isAdmin = data.isAdmin;
        if (!this.isAdmin && window.location.pathname.startsWith("/admin")) {
          window.location.href = "/";
          toast.error("You are not authorized to access this page.");
        }
      } catch (error) {
        console.error("Error fetching admin status:", error);
        this.isAdmin = false;
      }
    },

    async fetchUser() {
      const res = await api.post("/api/user/find", {
        email: this.getEmailFromToken(),
      });
      this.user = {
        userId: res.data._id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        imageUrl: res.data.imageUrl,
      };
    },

    getEmailFromToken(): string {
      if (!this.token) return "";
      const payload = JSON.parse(atob(this.token.split(".")[1]));
      return payload.email;
    },

    async toggleFavorite(movieId: string) {
      const res = await api.patch("/users/favorites", { movieId });
      this.favorites = res.data.favorites;
    },

    async register(data: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) {
      try {
        const res = await api.post("/auth/register", data);
        this.token = res.data.access_token;
        toast.success("Registration successful!");
        localStorage.setItem("token", this.token ?? "");
        await this.fetchUser();
        return true;
      } catch (err) {
        toast.error("Registration failed. Please try again.");
        console.error("Registration error:", err);
        return false;
      }
    },

    async fetchFavoritesMovies() {
      try {
        const res = await api.get("/api/user/favorites", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.favorites = res.data.favorites;
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
        toast.error("Failed to fetch favorite movies");
      }
    },

    // shows
    async fetchShows() {
      try {
        const { data } = await api.get("/api/show/all");
        if (data.success) {
          this.shows = data.shows;
        } else {
          toast.error(data.message || "Failed to fetch shows");
        }
      } catch (error) {
        console.error("Error fetching shows:", error);
        toast.error("Failed to fetch shows");
      }
    },

    async logout() {
      this.token = null;
      this.user = null;
      this.favorites = [];
      this.isAdmin = false;
      this.shows = [];
      delete api.defaults.headers.common["Authorization"];
    },
  },

  persist: true,
});
