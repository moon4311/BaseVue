<template>
  <n-card>
    <n-h3>배너관리</n-h3>
      <p>사용자화면에 표시되는 배너</p>
  </n-card>
   <div>
       <div class="mt-4">
          <!-- Inputs -->
         <div class="mt-4">
           <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
             <div class="relative mx-4 lg:mx-0">
               <n-form inline>
                 <n-form-item label="제목" path="searchValue">
                   <n-input v-model:value="params.bannerNm" type="text" placeholder="Search" />
                 </n-form-item>
                 <n-form-item>
                   <n-button @click="search">
                     검색
                   </n-button>
                 </n-form-item>
               </n-form>
             </div>
           </div>
         </div>
         <!-- Table -->
         <div class="flex flex-col mt-6">
           <n-button type="info" @click="util.add">
               등록
             </n-button>
           <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" >
             <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg" >
               <n-data-table
                 :columns="columns"
                 :data="list"
                 :bordered="false"
               />
             </div>
           </div>
         </div>
       </div>
   </div>
 </template>
 
 <script lang="ts" >
 import { defineComponent, ref, h, onMounted } from "vue";
 import axios from 'axios'
 import apiUrl from '/src/assets/base';
 import * as util from '/src/assets/util';
 import { useRouter } from "vue-router";
 import { NButton, useMessage } from "naive-ui";
 
 export default defineComponent({
   setup() {
     util.setRouter( useRouter() );
     const params = ref({});
     const columns = [{"title":"순번","key":"bannerSno"},{"title":"배너명","key":"bannerNm"},{"title":"길이","key":"width"},{"title":"높이","key":"height"}] ;
     const list = ref([]);
 
     const search = ()=>{
       axios.get(apiUrl + "/banner/list",{params: params.value } ).then((res: any)=>{
        list.value = res.data.data;
       });
     }
 
     onMounted(()=>{
       search();
     });
     
     return {
       params,
       search,
       columns,
       list,
       util
     };
   },
 });
 </script>