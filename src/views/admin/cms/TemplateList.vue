<template>
  <n-card>
    <n-space wrap-item="false">
    <n-h3>템플릿 관리</n-h3>
      <p>Vue파일 템플릿</p>
    </n-space>
    <n-form-item path="templateTypeCd" label="템플릿 구분">
      <n-select
        v-model:value="params.tempalteTypeCd"
        :options="options"
      ></n-select>
    </n-form-item>
  </n-card>
  <div>
      <div class="mt-4">
        <!-- Table -->
        <div class="flex flex-col mt-6">
          <n-button type="info" @click="util.add">
              등록
            </n-button>
          <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" >
            <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg" >
              <n-data-table
                :columns="columns"
                :data="userList"
                :bordered="false"
              />
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, h, onMounted } from "vue";
import axios from 'axios'
import * as util from '/src/assets/util';
import apiUrl from '/src/assets/base';
import { useRouter } from "vue-router";
import { NButton, useMessage } from "naive-ui";

util.setRouter(useRouter());
const params = ref({});
const options = ref([]);
const searchValue = ref("");
const columns = [
                  {
                    title: "구분",
                    key: "templateTypeCd"
                  },
                  {
                    title: "이름",
                    key: "templateNm"
                  },
                  {
                    title: "연락처",
                    key: "tel"
                  },
                  {
                    title: "",
                    key: "userId",
                    render(row: any) {
                      return h(
                        NButton,
                        {
                          strong: true,
                          tertiary: false,
                          size: "small",
                          onClick: () => util.showInfo(row.sno  )
                        },
                        { default: () => "Edit" }
                      );
                    }
                  }
                ];
const userList = ref([]);
//검색
const search = ()=>{
  axios.get(apiUrl + "/template/list",{params:{ userNm : searchValue.value}}).then((res: any)=>{
    userList.value = res.data.data;
  });
}

onMounted(async ()=>{
  await axios.get(apiUrl + "/code/options/TEMPLATE_TYPE_CD").then(res=>{
    options.value = res.data.data;  
  });

  search();
});
    
</script>