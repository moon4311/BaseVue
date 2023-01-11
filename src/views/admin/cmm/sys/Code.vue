<template>
  <n-layout embedded content-style="padding: 24px;">
    <n-h1>
      <n-text type="info">코드 관리</n-text>
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
          <n-button strong secondary type="info" @click="addRow">코드 생성</n-button>
          <n-button strong secondary type="info" @click="save">저장</n-button>
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
          <n-form-item label="그룹코드" >
            <n-input v-model:value="selectItem.groupCd" disabled placeholder="" />
          </n-form-item>
            <n-form-item label="코드" >
              <n-input v-model:value="selectItem.cd" placeholder="코드" />
            </n-form-item>
            <n-form-item label="코드명">
              <n-input v-model:value="selectItem.nm" placeholder="코드명" />
            </n-form-item>
            <n-form-item label="정렬순서">
              <n-input-number v-model:value="selectItem.sort" readonly placeholder="Input" />
            </n-form-item>
            <n-form-item label="메모">
              <n-input v-model:value="selectItem.component" placeholder="component" />
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
      list.value = [];
      axios.get(apiUrl + "/code/list").then((res: any)=>{
      var data = res.data.data;
      //메뉴형태로 변경
      _.forEach(data,(a)=>{ 
        if(a.groupCd!=="GROUP") return;
        a.label = a.nm;
        a.key = a.cd;
        var children = _.filter( data, (b)=>{ 
          if(a.cd === b.groupCd){
            b.label = b.nm;
            b.key = b.cd;
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
    
    //코드 생성
    const addRow = ()=>{
      var sort = 1;
      var obj = selectItem.value;
      if(obj.children) sort = obj.children.length+1;
      var groupCd = (obj.groupCd==="GROUP") ? obj.cd : obj.groupCd;
      var row = {
        groupCd : groupCd,
        cd : "",
        nm : "",
        sort : sort
      };

      selectItem.value = row;
    }

    //저장
    const save = () =>{
      if(selectItem.value.nm===undefined || selectItem.value.nm===""){
        alert("코드명을 입력해주세요");
        return false;
      }
      if(selectItem.value.groupCd===undefined || selectItem.value.groupCd===""){
        selectItem.value.groupCd = "GROUP";
      }
      axios.post(apiUrl + "/code/save", selectItem.value ).then((res)=>{
        if(res.status==200)
          alert("저장 되었습니다.");
        search();
      });
    }

    //삭제
    const del = ()=>{
      axios.post(apiUrl + "/code/del", selectItem.value ).then(res =>{
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
