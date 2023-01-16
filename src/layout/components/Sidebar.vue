<template>
  <n-menu :options="menuOptions" />
</template>

<script lang="ts">
import { defineComponent, h, Component,ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import apiUrl from '/src/assets/base'
import { NIcon, useMessage } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import _ from 'lodash';

function getMenu(menu: any, children?: any){
  var s = {key : menu.menuId , label : menu.name};
  if(children && children.length>0) s['children'] = children;
  else {
    s.label = () => h( RouterLink
                      ,{ to: { name: menu.name } }
                      ,{ default: () => menu.name }
                    );
  }
  return s;
}

export default defineComponent({
  setup () {
    const menuOptions = ref([] as MenuOption[]);

    onMounted(async()=>{
      axios.get(apiUrl + "/menu/list").then((res: any)=>{
        var list = res.data.data;
        _.filter(list,(a)=>{return a.upperMenuId==null}).forEach((a :any)=>{
          //1.get Child
          var childrenList = [] as any ;
          _.forEach(list,(b)=>{
            if(a.menuId == b.upperMenuId){ childrenList.push( getMenu(b) ) }
          });
          //2.add Menu
          menuOptions.value.push( getMenu(a,childrenList) );
        });//forEach
      });
    });
    return {
      menuOptions
    }
  }
})
</script>