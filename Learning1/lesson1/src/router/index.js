import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import User from "../components/User.vue";
import NotFound from "../components/NotFound.vue" 

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/user/:name",
    // name: "User",
    component: User,
    props: true
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
