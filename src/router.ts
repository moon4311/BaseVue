import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import _ from 'lodash'

// Sample
import Login from "./views/Login.vue";
import axios from 'axios';
import apiUrl from './assets/base';

let routes: any[] = [{
  path: "/",
  name: "Login",
  component: Login,
  meta: { layout: "empty" },
},
];

function getMenu(b: any){
  var menu = { path : b.path, name : b.name, children: undefined, component : ()=> import("./layout/EmptyLayout.vue") };
  //하위메뉴 담기
  if(b.children) menu.children = b.children;
  //화면 있다면 연결
  if(b.component) menu.component = () => import( "./views/" + b.component + ".vue") ;
  return menu;
}

function push(target:any, b: any){
  if(b.component!==null && b.component.indexOf("List")>0){
      target.push( getMenu({ path : b.path+"/:id", name : b.name+"상세", component: b.component.replace("List","Info")}) );
      target.push( getMenu({ path : b.path+"Add", name : b.name+"등록", component: b.component.replace("List","Info")})  );
  }
}

await axios.get(apiUrl+"/menu/list",{params:{'useYn':'Y'}}).then((res)=>{
  var list = res.data.data;
  //childen 생성
  list.forEach((a: any)=> {
      a.children = [];
      list.forEach((b : any ,idx :number )=>{
        if(a.menuId && a.menuId == b.upperMenuId){
          list[idx] = getMenu(b);
          a.children.push( list[idx] );
          push(a.children,b);
        }// if
      });//forEach
      if(a.children.length==0) delete a.children;
  });
  //최상위 메뉴만
  list.forEach((a: any)=>{ 
    if(a.menuId){
      routes.push( getMenu(a) );
      push(routes,a);
    }
  });
});

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
