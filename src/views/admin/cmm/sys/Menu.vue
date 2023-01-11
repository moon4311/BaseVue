<template>
  <n-layout embedded content-style="padding: 24px;">
    <n-h1>
      <n-text type="info">메뉴 관리</n-text>
    </n-h1>
    <n-grid x-gap="12" :cols="2">
      <n-gi>
          <n-input v-model:value="pattern" placeholder="Search" />
          <n-card>
              <n-tree
                block-line
                :data="list"
                :show-irrelevant-nodes="showIrrelevantNodes"
                :pattern="pattern"
                :node-props="nodeProps"
                selectable
              />
          </n-card>
      </n-gi>
      <n-gi>
        <n-space justify="end">
          <n-button strong secondary type="info" @click="addRow">하위메뉴 생성</n-button>
          <n-button strong secondary type="info" @click="save">저장</n-button>
          <n-button strong secondary type="info" @click="del">삭제</n-button>
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
            <n-form-item label="경로">
              <n-input v-model:value="selectItem.path" placeholder="path" />
            </n-form-item>
            <n-form-item label="Vue 파일명 (views/{}.vue)">
              <n-input v-model:value="selectItem.component" placeholder="component" />
            </n-form-item>
            <n-form-item label="정렬순서">
              <n-input-number v-model:value="selectItem.sort" :disabled="selectItem.menuId!==''" placeholder="Input" />
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
    const list = ref([] as any);
    const selectItem = ref({});

    const search = ()=>{
      axios.get(apiUrl + "/menu/list").then((res: any)=>{
      var data = res.data.data;
      //메뉴형태로 변경
      list.value = [];
      _.forEach(data,(a)=>{ 
        if(a.upperMenuId!==null) return;
        a.label = a.name + " "+a.path;
        a.key = a.menuId;
        a.upperMenuNm = "";
        var children = _.filter( data, (b)=>{ 
          if(a.menuId === b.upperMenuId){
            b.upperMenuNm=a.name;
            b.label = b.name + " /" + b.path;
            b.key = b.menuId;
            return true;
          } 
        });
        if(children.length>0) a.children = children;
        list.value.push(a);
      });
    });
    }

    //메뉴 선택
    const rowClick = (obj: any)=>{
      selectItem.value = obj;
    }
    
    //하위메뉴 생성
    const addRow = ()=>{
      if(selectItem.value.menuId==="") return false;
      var sort = 1;
      if(selectItem.value.children) sort = selectItem.value.children.length+1;
      selectItem.value = {
        menuId : "",
        upperMenuId : selectItem.value.menuId,
        name : "",
        upperMenuNm : selectItem.value.name,
        path : "",
        level : selectItem.value.level + 1,
        sort : sort
      };
    }

    //저장
    const save = () =>{
      if(selectItem.value.name===undefined){
        alert("메뉴명을 입력해주세요");
        return false;
      }
      axios.post(apiUrl + "/menu/save", selectItem.value ).then((res)=>{
        if(res.status==200){
          alert("저장 되었습니다.");
          search();
        }
      });
    }
    //삭제
    const del = ()=>{
      axios.post(apiUrl + "/menu/del", selectItem.value ).then(res =>{
        if(res.status==200){
          alert("삭제되었습니다.");
          search();
        }
      });
    }


    onMounted(()=>{
      search();
    });


    return {
      search,
      selectItem,
      list,
      addRow, save, del,
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
