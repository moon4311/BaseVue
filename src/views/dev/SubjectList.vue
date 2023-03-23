<template>
  <n-card>
    <n-h3>과목관리</n-h3>
      <p>과목관리</p>
  </n-card>
   <div>
       <div class="mt-4">
          <!-- Inputs -->
         <div class="mt-4">
           <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
             <div class="relative mx-4 lg:mx-0">
               <n-form inline>
                 <n-form-item label="제목" path="searchValue">
                   <n-input v-model:value="params.userNm" type="text" placeholder="Search" />
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
     const columns = [
      // {"title":"과목ID","key":"SUBJECT_ID"},
      {"title":"과목명","key":"SUBJECT_NAME"},
     {"title":"출처ID","key":"TOP_SOURCE_ID"},
     {"title":"최상위유형ID","key":"TOP_CATEGORY_ID"},
     {"title":"최초등록자ID","key":"RGTR_ID"},
     {"title":"사용여부","key":"USE_YN"},
     {
      'key' : 'SUBJECT_ID',
      render(row: any) {
                      return h(
                        NButton,
                        {
                          strong: true,
                          tertiary: false,
                          size: "small",
                          onClick: () => util.showInfo( row.SUBJECT_ID )
                        },
                        { default: () => "Edit" }
                      );
                    }
     }
    ] ;
     const list = ref([]);
 
     const search = ()=>{
       axios.get(apiUrl + "/dev/TB_SUBJECT/list",{params: params.value } ).then((res: any)=>{
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