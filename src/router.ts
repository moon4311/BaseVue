import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// Sample
import Dashboard from "./views/sample/Dashboard.vue";
import Forms from "./views/sample/Forms.vue";
import Tables from "./views/sample/Tables.vue";
import UIElements from "./views/sample/UIElements.vue";
import Login from "./views/sample/Login.vue";
import Modal from "./views/sample/Modal.vue";
import Card from "./views/sample/Card.vue";
import Blank from "./views/sample/Blank.vue";
import NotFound from "./views/NotFound.vue";




import User from "./views/admin/cmm/User.vue";
import Menu from "./views/admin/cmm/Menu.vue";
import Code from "./views/admin/cmm/Code.vue";
import AuthName from "./views/admin/cmm/Code.vue";
import AuthRole from "./views/admin/cmm/Code.vue";
import AuthGrant from "./views/admin/cmm/Code.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { layout: "empty" },
    },

  {
    path: "/admin/menu",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/admin/user",
    name: "User",
    component: User,
  },
  {
    path: "/admin/code",
    name: "Code",
    component: Code,
  },
  {
    path: "/admin/authName",
    name: "AuthName",
    component: Dashboard,
  },
  {
    path: "/admin/authRole",
    name: "AuthRole",
    component: AuthRole,
  },
  {
    path: "/admin/authGrant",
    name: "AuthGrant",
    component: AuthGrant,
  },





  {
    path: "/sample/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/sample/forms",
    name: "Forms",
    component: Forms,
  },
  {
    path: "/sample/cards",
    name: "Cards",
    component: Card,
  },
  {
    path: "/sample/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/sample/ui-elements",
    name: "UIElements",
    component: UIElements,
  },
  {
    path: "/sample/modal",
    name: "Modal",
    component: Modal,
  },
  {
    path: "/sample/blank",
    name: "Blank",
    component: Blank,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
