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
  var menu = { path : b.path, name : b.name, component : import("./layout/EmptyLayout.vue") };
  if(b.component!=null) menu.component = import( "./views/" + b.component + ".vue") 
  // if(b.component!=null) menu.component = () => import( "./views/" + b.component + ".vue") 
  return menu;
}

await axios.get(apiUrl+"/menu/list").then((res)=>{
  var list = res.data.data;
  //childen 생성
  list.forEach((a)=> 
    {
      a.children = [];
      _.forEach(list,(b,idx)=>{
        if(a.menuId == b.upperMenuId){
          list[idx] = getMenu(b);
          a.children.push( list[idx] );
        }// if
      });//forEach
      if(a.children.length==0) delete a.children;
    });
  //최상위 메뉴만
  _.forEach(list,(a)=>{ 
    if(a.menuId){
      var menu = getMenu(a);
      if(a.children) menu.children = a.children;
      routes.push( menu );
    }
  });
});

console.log(routes);
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
