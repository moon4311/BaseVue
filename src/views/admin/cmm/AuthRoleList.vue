<template>
  <div>
      <h3 class="text-3xl font-medium text-gray-700">권한롤 관리</h3>
      <div class="mt-4">
        <!-- <h4 class="text-gray-600">Simple Table</h4> -->
         <!-- Inputs -->
        <div class="mt-4">
          <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
            <div class="relative mx-4 lg:mx-0">
              <n-form inline>
                <n-form-item label="제목" path="searchValue">
                  <n-input v-model:value="searchValue" type="text" placeholder="Search" />
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

<script lang="ts">
import { defineComponent, ref, h, onMounted } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import * as util from '/src/assets/util';
import { useRouter } from "vue-router";
import { NButton, useMessage } from "naive-ui";

export default defineComponent({
  setup() {
    util.setRouter( useRouter() );
    const searchValue = ref("");
    const columns = [
    {
      title: "제목",
      key: "title"
    },
    {
      title: "등록자",
      key: "registId"
    },
    {
      title: "등록일",
      key: "registDt"
    },
    {
      title: "",
      key: "userId",
      render(row : any) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: false,
            size: "small",
            onClick: () => util.showInfo(row.seq)
          },
          { default: () => "Edit" }
        );
      }
    }
  ];
    const list = ref([]);

    const search = ()=>{
      axios.get(apiUrl + "/board/list",{params:{ userNm : searchValue.value}}).then((res: any)=>{
        list.value = res.data.data;
      });
    }

    onMounted(()=>{
      search();
    });
    
    return {
      searchValue,
      search,
      columns,
      list,
      util
    };
  },
});
</script>