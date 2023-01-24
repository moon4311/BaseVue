<template>
  <n-card>
    <n-h3>상품관리</n-h3>
      <p>판매할 상품을 관리합니다.</p>
  </n-card>
   <div>
       <div class="mt-4">
          <!-- Inputs -->
         <div class="mt-4">
           <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
             <div class="relative mx-4 lg:mx-0">
               <n-form inline>
                 <n-form-item label="상품명" path="searchValue">
                   <n-input v-model:value="params.productNm" type="text" />
                 </n-form-item>
                 <n-form-item label="가격" path="searchValue">
                   <n-input v-model:value="params.price" type="text" />
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
     const columns = [{"title":"상품 아이디","key":"productId"},{"title":"상품명","key":"productNm"},{"title":"가격","key":"price"},{"title":"수량","key":"cnt"},{"title":"사용여부","key":"useYn"}] ;
     const list = ref([]);
 
     const search = ()=>{
       axios.get(apiUrl + "/shop/product/list",{params: params.value } ).then((res: any)=>{
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