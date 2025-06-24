import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import MovieDetails from "@/pages/MovieDetails.vue";
import Favourite from "@/pages/Favourite.vue";
import Movies from "@/pages/Movies.vue";
import MyBookings from "@/pages/MyBookings.vue";
import SeatLayout from "@/pages/SeatLayout.vue";
import LayoutPage from "@/pages/admin/LayoutPage.vue";
import DashboardAdmin from "@/pages/admin/DashboardAdmin.vue";
import AddShows from "@/pages/admin/AddShows.vue";
import ListShows from "@/pages/admin/ListShows.vue";
import ListBookings from "@/pages/admin/ListBookings.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterationPage from "@/pages/RegisterationPage.vue";
import { useUserStore } from "@/stores/user";

const routes = [
  { path: "/", component: Home },
  { path: "/movies", component: Movies },
  { path: "/movies/:id/:date", component: SeatLayout },
  { path: "/movies/:id", component: MovieDetails },
  { path: "/my-bookings", component: MyBookings },
  { path: "/favorite", component: Favourite },
  { path: "/login", component: LoginPage, meta: { public: true } },
  { path: "/register", component: RegisterationPage, meta: { public: true } },

  {
    path: "/admin",
    component: LayoutPage,
    meta: { requiresAuth: true, allowedRoles: ["admin"] },
    children: [
      { path: "", component: DashboardAdmin },
      { path: "add-shows", component: AddShows },
      { path: "list-shows", component: ListShows },
      { path: "list-bookings", component: ListBookings },
    ],
  },

  {
    path: "/auth/callback",
    name: "AuthCallback",
    component: () => import("@/pages/AuthCallback.vue"),
    meta: { public: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useUserStore();

  if (authStore.token && !authStore.user) {
    await authStore.fetchUser();
    await authStore.fetchShows();
    await authStore.fetchFavoritesMovies();
  }

  const isAuthenticated = !!authStore.user;
  const requiresAuth = to.meta.requiresAuth;
  const isPublic = to.meta.public || false;
  const allowedRoles = to.meta.allowedRoles as string[] | undefined;
  const userRole = authStore.user?.role;

  if (requiresAuth && !isAuthenticated) {
    return next("/login");
  }

  if (isPublic && isAuthenticated) {
    return next("/");
  }

  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    return next("/");
  }

  return next();
});

export default router;
