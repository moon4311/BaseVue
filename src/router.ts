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

import EmptyLayout from "./layout/EmptyLayout.vue";




// import User from ;
import UserInfo from "./views/admin/cmm/UserInfo.vue";
import Menu from "./views/admin/cmm/Menu.vue";
import CodeList from "./views/admin/cmm/CodeList.vue";
import Board from "./views/admin/cmm/Board.vue";
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
    path: "/admin",
    name: "사용자",
    component: import("./layout/EmptyLayout.vue"),
    children:[
      {
        path:"user",
        name : "사용자관리",
        component: import("./views/admin/cmm/User.vue")
      },
      {
        path:"user/:id",
        name : "사용자 상세",
        component:()=> import("./views/admin/cmm/UserInfo.vue")
      }
    ]
  },
  
  {
    path: "/admin/auth",
    name: "권한",
    component: EmptyLayout,
    children:[
          {
            path: "authName",
            name: "권한명관리",
            component: AuthName,
          },
          {
            path: "authRole",
            name: "권한롤관리",
            component: AuthRole,
          },
          {
            path: "authGrant",
            name: "권한부여",
            component: AuthGrant,
          }
        ]
  },
  {
    path: "/admin/system",
    name: "시스템",
    component: EmptyLayout,
    children:[
      {
        path: "code",
        name: "공통코드관리",
        component: CodeList,
      },
      {
        path: "menu",
        name: "메뉴관리",
        component: Menu,
      },
    ]
  },
  {
    path: "/admin/board",
    name: "게시판관리",
    component: Board,
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
