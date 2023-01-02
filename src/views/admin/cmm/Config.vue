<template>
  <n-layout embedded content-style="padding: 24px;">
    <n-h1>
      <n-text type="info">환경설정</n-text>
    </n-h1>
    <n-grid x-gap="12" :cols="1">
      <n-gi>
        <n-space justify="end">
          <n-button strong secondary type="info" @click="save">
            저장
          </n-button>
        </n-space>
        <n-card>
          <n-form
            ref="formRef"
            label-width="auto"
            :style="{
              maxWidth: '640px'
            }"
          >
          <n-form-item label="상위메뉴" >
            <n-input v-model:value="selectItem.upperMenuNm" disabled placeholder="" />
          </n-form-item>
            <n-form-item label="메뉴명" >
              <n-input v-model:value="selectItem.name" placeholder="메뉴명" />
            </n-form-item>
            <n-form-item label="path">
              <n-input v-model:value="selectItem.path" placeholder="path" />
            </n-form-item>
            <n-form-item label="component">
              <n-input v-model:value="selectItem.component" placeholder="component" />
            </n-form-item>
            <n-form-item label="Input" path="inputValue">
              <n-input placeholder="Input" />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import _ from 'lodash';
import { TreeOption } from 'naive-ui'

export default defineComponent({
  setup() {
    const list = ref([]);
    const selectItem = ref({});

    const search = ()=>{
      axios.get(apiUrl + "/menu/list").then((res: any)=>{
      var data = res.data.data;
      var menuList = [] as any;
      //메뉴형태로 변경
      _.forEach(data,(a)=>{ 
        if(a.upperMenuId!==null) return;
        a.label = a.name;
        a.key = a.menuId;
        a.upperMenuNm = "";
        var children = _.filter( data, (b)=>{ 
          if(a.menuId === b.upperMenuId){
            b.upperMenuNm=a.name;
            b.label = b.name;
            b.key = b.menuId;
            return true;
          } 
        });
        if(children.length>0) a.children = children;
        menuList.push(a);
      });
      list.value = menuList;
    });
    }

    //메뉴 선택
    const rowClick = (obj: any)=>{
      selectItem.value = obj;
    }
    
    //하위메뉴 생성
    const addRow = ()=>{
      if(selectItem.value.menuId==="") return false;
      var row = {
        menuId : "",
        name : "",
        path : "",
        upperMenuId : selectItem.value.menuId,
        upperMenuNm : selectItem.value.name
      };
      selectItem.value = row;
    }

    //저장
    const save = () =>{
      axios.post(apiUrl + "/menu/save", selectItem.value ).then((res)=>{
        search();
      });
    }


    onMounted(()=>{
      search();
    });


    return {
      search,
      selectItem,
      list,
      addRow, save,
      pattern: ref(''),
      showIrrelevantNodes: ref(false),
      nodeProps: ({ option }: { option: TreeOption }) => {
        return {
          onClick () {
            rowClick(option);
          }
        }
      }
    };
  },
});
</script>
