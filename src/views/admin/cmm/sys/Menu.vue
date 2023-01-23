<template>
  <n-card>
    <n-h3>메뉴 관리</n-h3>
      <p>관리자 메뉴</p>
  </n-card>
  <n-layout embedded content-style="padding: 24px;">
    <n-grid x-gap="12" :cols="2">
      <n-gi>
          <n-space justify="end">
            <n-button strong secondary type="default" @click="clear">선택취소</n-button>
            <n-button strong secondary type="info" @click="addRow">메뉴 생성</n-button>
          </n-space>
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
          <n-button strong secondary type="success" @click="save">저장</n-button>
          <n-button strong secondary type="error" @click="del">삭제</n-button>
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
            <n-form-item label="URL 경로">
              <n-input v-model:value="selectItem.path" placeholder="URL 경로" />
            </n-form-item>
            <n-form-item label="Vue 파일 (views/{}.vue)">
              <n-input-group>
                <n-input v-model:value="selectItem.component" placeholder="파일명 (.vue 제외 )" />
              </n-input-group>
            </n-form-item>
            <n-form-item label="정렬순서">
              <n-input-number v-model:value="selectItem.sort" :disabled="selectItem.menuId!==''" placeholder="Input" />
            </n-form-item>
            <n-form-item label="사용여부">
              <n-input v-model:value="selectItem.useYn" />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>
  </n-layout>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import _ from 'lodash';
import { TreeOption } from 'naive-ui'

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

const clear = ()=>{
  selectItem.value = {
    menuId : "",
    upperMenuId : "",
    name : "",
    upperMenuNm : "",
    path : "",
    level : "",
    sort : ""
  };
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

const pattern = ref('');
const showIrrelevantNodes = ref(false);
const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick () {
      rowClick(option);
    }
  }
}


onMounted(()=>{
  search();
});

</script>
