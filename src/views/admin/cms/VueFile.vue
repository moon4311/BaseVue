<template>
    <n-layout embedded content-style="padding: 24px;">
      <n-h1>
        <n-text type="info">Vue 파일 관리</n-text>
      </n-h1>
      <n-form-item label="템플릿">
        <n-select :options="templateOpts" v-model:value="vueFile.sno" :default-value="'1'" placeholder="템플릿" />
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

    <n-form-item label="메뉴명">
      <n-input v-model:value="vueFile.title" placeholder="메뉴명" />
    </n-form-item>

    <n-form-item label="컬럼 목록">
      <n-input v-model:value="vueFile.columns" placeholder="컬럼목록" />
    </n-form-item>

    <n-form-item label="API 경로">
      <n-input v-model:value="vueFile.apiPath" placeholder="API 경로" />
    </n-form-item>

        <n-button strong secondary type="warning" @click="makeVue">Vue 생성</n-button>
    </n-layout>
  </template>
  
  <script lang="ts" setup>
  import { defineComponent, onMounted, ref } from "vue";
  import axios from 'axios'
  import apiUrl from '/src/assets/base';
  import _ from 'lodash';
  
  const list = ref([] as any);
  const vueFile = ref({});
  const templateOpts = ref([] as any);
  const search = ()=>{
    axios.get(apiUrl + "/menu/list").then((res: any)=>{
        list.value = res.data.data;
    });
  }

  const getTmeplate = () =>{
    axios.get(apiUrl + "/template/list" ).then(res =>{
      const list = res.data.data;
      _.each(list, (o => {
          templateOpts.value.push({ label : o.templateNm, value : o.sno});
      }));
    });
  }

  
  //Vue 생성
  const makeVue = () =>{
    axios.post(apiUrl + "/template/make", vueFile.value ).then(res=>{
      alert("생성되었습니다.");
    });
  }


  onMounted(()=>{
    getTmeplate();
    search();
  });
  
  </script>
  