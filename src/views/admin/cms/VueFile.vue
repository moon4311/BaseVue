<template>
    <n-layout embedded content-style="padding: 24px;">
      <n-h1>
        <n-text type="info">Vue 파일 관리</n-text>
      </n-h1>
      <n-form-item label="템플릿">
        <n-select :options="templateOpts" v-model:value="vueFile.sno" :default-value="'1'" @update:value="templateUpdateValue" />
      </n-form-item>
      
      <n-form-item label="메뉴명 (화면 상단에 표시되는 이름)">
        <n-input v-model:value="vueFile.title" placeholder="메뉴명" />
      </n-form-item>

      <n-form-item label="파일">
          <n-space vertical>
              <n-input-group>
                  <n-input v-model:value="vueFile.path" placeholder=" views/ 하위경로" />
                  <n-input value="/" disabled />
                  <n-input v-model:value="vueFile.fileNm" placeholder="파일명" />.vue
              </n-input-group>
          </n-space>
      </n-form-item>
      <n-form-item label="API 경로 ( apiUrl 하위 경로 )">
        <n-input v-model="vueFile.apiPath" :value="'/'+vueFile.path" readonly />
      </n-form-item>
      
      <n-form-item label="테이블">
        <n-select :options="tableList" @update:value="tableUpdateValue" />
      </n-form-item>
      <n-form-item :label="'컬럼 선택 (기본제외 :' + excludeList +')'">
        <n-checkbox-group v-model:value="checkedColumns">
          <n-grid :y-gap="columnList.length" :cols="2">
            <n-gi v-for="a in columnList" :key="a">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-checkbox :value="a.field" :label="a.field"/>
                </template>
                {{a.comment}}
              </n-tooltip>
            </n-gi>
          </n-grid>
        </n-checkbox-group>
      </n-form-item>

      <n-button strong secondary type="warning" @click="makeVue">Vue 생성</n-button>
    </n-layout>
  </template>
  
  <script lang="ts" setup>
  import { defineComponent, onMounted, ref } from "vue";
  import axios from 'axios'
  import apiUrl from '/src/assets/base';
  import { SelectOption } from 'naive-ui'
  import _ from 'lodash';
  
  const set = ref([] as any);
  const templateList = ref([] as any);  //템플릿목록
  const vueFile = ref({path : ""});      
  const tableList = ref();              //DB Tables
  const columnList = ref([]);             //Table Columns
  const checkedColumns = ref([] as any);
  const templateOpts = ref([] as any);
  const excludeList = ['MEMO','REGIST_DT','REGIST_ID','UPDATE_DT','UPDATE_ID','USE_YN'];

  const getTmeplate = () =>{
    axios.get(apiUrl + "/template/list" ).then(res =>{
      templateList.value = res.data.data;
      _.each(templateList.value, (o => {
          templateOpts.value.push({ label : o.templateNm, value : o.sno});
      }));
    });
  }

  const getTable = ()=>{
    axios.get(apiUrl + "/db/table").then(res=>{
      tableList.value = _.map(res.data.data,o=>{
        return { label : o, value : o }
      });
    });
  }

  //템플릿 선택
  const templateUpdateValue = (value: string, option: SelectOption) => {
    var one = _.find(templateList.value,(o)=>{ return o.sno === value});
  }

  //테이블 선택
  const tableUpdateValue = (value: string, option: SelectOption) => {
    axios.get(apiUrl + "/db/column?table="+ value).then(res=>{
      // checkedColumns.value = _.map(res.data.data,o=>{return o.field});
      checkedColumns.value = _.chain(res.data.data)
                              .map(o=>{ return o.field})
                              .filter(o=>{ return excludeList.indexOf( o.toUpperCase() )==-1})
                              .value();
      
      console.log(checkedColumns.value);
      columnList.value = res.data.data;
    });
  }
  
  //Vue 생성
  const makeVue = () =>{
    vueFile.value.columns = JSON.stringify(_.map(checkedColumns.value, o => {return { title: o, key: o} } ) );
    axios.post(apiUrl + "/template/make", vueFile.value ).then(res=>{
      alert("생성되었습니다.");
    });
  }


  onMounted(()=>{
    getTmeplate();
    getTable();
  });
  
  </script>
  