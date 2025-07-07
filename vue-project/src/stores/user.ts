// src/stores/user.ts
import { defineStore } from "pinia";
import api from "@/lib/axios";
import { toast } from "vue3-toastify";
const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
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
    favorites: [],
    isAdmin: false,
    shows: [] as any[],
    imageBaseUrl: imageBaseUrl,
  }),

  actions: {
    // For traditional login
    async login(email: string, password: string) {
      try {
        const res = await api.post("/auth/login", { email, password });
        if (res.data) {
          toast.success("Login successful");
          this.token = res.data.access_token;
          this.user = res.data.user;
          localStorage.setItem("access_token", this.token ?? "");

          api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        } else {
          toast.error("Login Not Successful");
        }
      } catch (error: unknown) {
        toast.error("Invalid Email or Password");
      }
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
        // if (!this.isAdmin && window.location.pathname.startsWith("/admin")) {
        //   toast.error("You are not authorized to access this page.");
        //   window.location.href = "/";
        // }
      } catch (error) {
        console.error("Error fetching admin status:", error);
        this.isAdmin = false;
      }
    },

    async updateUserRole(role: string) {
      try {
        const { data } = await api.post(
          "/api/user/update-role",
          { role },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        if (data.success && this.user) {
          this.user.role = data.userRole.role;
          toast.success(`You're now ${this.user.role === "admin" ? "an admin" : "a viewer"} `);
        } else {
          toast.error("Role Update not successful");
        }
      } catch (error) {}
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
        console.log("Fetched favorites:", res.data);

        console.log("Fetched favorites:", this.favorites);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
        // toast.error("Failed to fetch favorite movies");
      }
    },

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
        toast.error("check internet connection");
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
