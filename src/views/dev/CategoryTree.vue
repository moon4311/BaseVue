<template>
  <n-card>
    <n-h3>유형트리</n-h3>
      <p>유형트리</p>
  </n-card>
  <n-layout embedded content-style="padding: 24px;">
    <n-grid x-gap="12" :cols="2">
      <n-gi>
          <n-space justify="end">
            <n-button strong secondary type="default" @click="clear">선택취소</n-button>
            <n-button strong secondary type="info" @click="addRow">생성</n-button>
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

          <n-form-item label="상위ID" >
            <n-input v-model:value="selectItem.PARENT_ID" placeholder="" />
          </n-form-item>
            <n-form-item label="트리명" >
              <n-input v-model:value="selectItem.CATEGORY_NAME" placeholder="트리명" />
            </n-form-item>
            <n-space>
              <n-form-item label="깊이">
                <n-input-number v-model:value="selectItem.DEPTH" placeholder="Input" />
              </n-form-item>
              <n-form-item label="정렬순서">
                <n-input-number v-model:value="selectItem.LIST_ORDER" placeholder="Input" />
              </n-form-item>
            </n-space>
            <n-space>
              <!-- <n-form-item label="공개여부">
                <n-input v-model:value="selectItem.OPEN_YN" />
              </n-form-item> -->
              <n-form-item label="사용여부">
                <n-input v-model:value="selectItem.USE_YN" />
              </n-form-item>
            </n-space>
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
  axios.get(apiUrl + "/dev/TB_CATEGORY/list").then((res: any)=>{
  var data = res.data.data;

  //key, label 생성
  _.forEach(data,(a)=>{ 
    a.label = a.CATEGORY_NAME;
    a.key = a.CATEGORY_ID;
    a.PARENT_NAME = "";
  });

  list.value = _.filter(data,{"DEPTH" : 1});
  var dept2 = _.filter(data,{"DEPTH" : 2});
  var dept3 = _.filter(data,{"DEPTH" : 3});
  var dept4 = _.filter(data,{"DEPTH" : 4});
  var dept5 = _.filter(data,{"DEPTH" : 5});

  putChildren(dept4,dept5);
  putChildren(dept3,dept4);
  putChildren(dept2,dept3);
  putChildren(list.value,dept2);

 
  });
}
const putChildren = (parent, child)=>{
  child.forEach((o)=>{
    var target = _.find(parent,{'CATEGORY_ID': o.PARENT_ID});
    if(target.children) target.children.push(o);
    else target.children = [o];
  });
}

//메뉴 선택
const rowClick = (obj: any)=>{
  selectItem.value = obj;
}

const clear = ()=>{
  selectItem.value = {
    PK : 'CATEGORY_ID',
    CATEGORY_ID : "",
    PARENT_ID : "-1",
    CATEGORY_NAME : "",
    DEPTH : 1,
    LIST_ORDER : "",
    // OPEN_YN : 'N',
    USE_YN : "Y"
  };
}

//하위트리 생성
const addRow = ()=>{
  if(selectItem.value.CATEGORY_ID==="") return false;
  var sort = 1;
  if(selectItem.value.children) sort = selectItem.value.children.length+1;
  selectItem.value = {
    PK : 'CATEGORY_ID',
    CATEGORY_ID: "",
    PARENT_ID : selectItem.value.CATEGORY_ID,
    CATEGORY_NAME : "",
    DEPTH : 1,
    LIST_ORDER : sort,
    // OPEN_YN : 'N',
    USE_YN : 'Y'
  };
}

//저장
const save = () =>{
  if(selectItem.value.CATEGORY_NAME===undefined){
    alert("이름을 입력해주세요");
    return false;
  }
  console.log(selectItem.value);
  axios.post(apiUrl + "/dev/TB_CATEGORY/save", selectItem.value ).then((res)=>{
    if(res.status==200){
      alert("저장 되었습니다.");
      search();
    }
  });
}
//삭제
const del = ()=>{
  axios.post(apiUrl + "/dev/TB_CATEGORY/del", selectItem.value ).then(res =>{
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
