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
import UserInfo from "./views/admin/cmm/UserInfo.vue";
import Menu from "./views/admin/cmm/Menu.vue";
import CodeList from "./views/admin/cmm/CodeList.vue";
import AuthName from "./views/admin/cmm/AuthName.vue";
import AuthRole from "./views/admin/cmm/AuthRole.vue";
import AuthGrant from "./views/admin/cmm/AuthGrant.vue";

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
    path: "/admin/user/:id",
    name: "UserInfo",
    component: UserInfo,
  },
  {
    path: "/admin/code",
    name: "Code",
    component: CodeList,
  },
  {
    path: "/admin/authName",
    name: "AuthName",
    component: AuthName,
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
