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

const routes = [
  { path: "/", component: Home },
  { path: "/movies", component: Movies },
  { path: "/movies/:id/:date", component: SeatLayout },
  { path: "/movies/:id", component: MovieDetails },

  { path: "/my-bookings", component: MyBookings },
  { path: "/favorite", component: Favourite },
  {
    path: "/admin",
    component: LayoutPage,
    children: [
      { path: "", component: DashboardAdmin },
      { path: "add-shows", component: AddShows },
      { path: "list-shows", component: ListShows },
      { path: "list-bookings", component: ListBookings },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const clerk = await import("@clerk/clerk-js").then(
//     (m) => new m.Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)
//   );
//   await clerk.load();

//   if (to.meta.requiresAuth && !clerk.user) {
//     return next("/"); // redirect to home or login
//   }

//   next();
// });

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem("loggedInUser");
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router;
