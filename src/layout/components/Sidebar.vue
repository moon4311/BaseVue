<template>
  <n-menu :options="menuOptions"  @update:value="clickMenuItem"/>
</template>

<script lang="ts">
import { defineComponent, h, Component,ref, onMounted } from 'vue'
import axios from 'axios'
import apiUrl from '/src/assets/base'
import { NIcon, useMessage } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import _ from 'lodash';
import { RouterLink, useRouter } from 'vue-router';
import TabsView from './TagsView.vue';


export default defineComponent({
  setup () {
    const menuOptions = ref([] as MenuOption[]);
    const route = useRouter().getRoutes();
    const getMenu : any = (menu: any, children?: any)=> {
      let s  = {key : menu.menuId , label : menu.name, path: menu.path, name: menu.name, component: menu.component};
      if(children && children.length>0) s['children'] = children;
      else {
        s.label = () => h( RouterLink
                          ,{ to: { name: menu.name } }
                          ,{ default: () => menu.name }
                        );
        s.component = menu.component
        s.name = menu.name
        s.path = _.find( route , {'name': menu.name}).path;
      }
      return s;
    };

    onMounted(async()=>{
      axios.get(apiUrl + "/menu/list", {params:{'showYn':'Y'}}).then((res: any)=>{
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
  },
  methods:{
    clickMenuItem(key: string, menu: any){
      TabsView.methods.push( { "path": menu.path , "name": menu.name } );
    }
  }
})
</script>