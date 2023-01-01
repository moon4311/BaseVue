<template>
  <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
</template>

<script lang="ts">
import { defineComponent, h, Component,ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import apiUrl from '/src/assets/base'
import { NIcon, useMessage } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import _ from 'lodash';

const menuOptions = ref([] as MenuOption[]);

export default defineComponent({
  setup () {
    
    onMounted(async()=>{
      axios.get(apiUrl + "/menu/list").then((res: any)=>{
        var list = res.data.data;
        _.forEach(list,(a)=>{
          if(a.upperMenuId == null){
            //1.get Child
            var childrenList = [] as any ;
            _.forEach(list,(b)=>{ 
              if(a.menuId == b.upperMenuId){
                childrenList.push({
                      label: () => h(RouterLink,
                                    { to: { name: b.name } },
                                    { default: () => b.name }
                                  ),
                     key: b.menuId });
              }
            });
            //2.add Menu
            var menu = {
              label: a.name,
              key: a.menuId,
              children : childrenList
            };
            if(childrenList.length==0 ){ 
              delete menu.children;
              menu.label = () => h(RouterLink,
                                  { to: { name: a.name } },
                                  { default: () => a.name }
                                );
            }
            menuOptions.value.push(menu);
          }//if
        });//forEach
    });
    })

    return {
      menuOptions,
      handleUpdateValue (key: string, item: MenuOption) {
        // message.info('[onUpdate:value]: ' + JSON.stringify(key))
        // message.info('[onUpdate:value]: ' + JSON.stringify(item))
      }
    }
  }
})
</script>