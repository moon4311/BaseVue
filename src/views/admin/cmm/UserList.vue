<template>
  <div>
      <h3 class="text-3xl font-medium text-gray-700">사용자 관리</h3>
      <div class="mt-4">
        <h4 class="text-gray-600">Simple Table</h4>
         <!-- Inputs -->
        <div class="mt-4">
          <div class="flex items-center px-4 py-4 space-x-4 overflow-x-auto bg-white rounded-md">
            <div class="relative mx-4 lg:mx-0">
              <n-form inline>
                <n-form-item label="사용자명" path="searchValue">
                  <n-input v-model:value="searchValue" type="text" placeholder="Search" />
                </n-form-item>
                <n-form-item>
                  <n-button @click="search">
                    Search
                  </n-button>
                </n-form-item>
              </n-form>
            </div>
          </div>
        </div>
        <!-- Table -->
        <div class="flex flex-col mt-6">
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

<script lang="ts">
import { defineComponent, ref, h, onMounted } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useRouter } from "vue-router";
import { useTableData } from "/src/hooks/useTableData";
import { NButton, useMessage } from "naive-ui";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { wideTableData, } = useTableData();
    const searchValue = ref("");
    const columns = [
    {
      title: "ID",
      key: "userId"
    },
    {
      title: "이름",
      key: "userNm"
    },
    {
      title: "연락처",
      key: "tel"
    },
    {
      title: "",
      key: "userId",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: false,
            size: "small",
            onClick: () => showInfo(row)
          },
          { default: () => "Edit" }
        );
      }
    }
  ];
    const userList = ref([]);
    const showInfo = (row)=>{
      router.push(router.currentRoute.value.path+"/"+row.userId);
    }

    const search = ()=>{
      axios.get(apiUrl + "/user/list",{params:{ userNm : searchValue.value}}).then((res: any)=>{
        userList.value = res.data.data;
      });
    }

    onMounted(()=>{
      search();
    });
    
    return {
      wideTableData,
      searchValue,
      search,
      columns,
      userList,
      showInfo
    };
  },
});
</script>