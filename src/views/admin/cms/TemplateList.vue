<template>
  <div>
      <h3 class="text-3xl font-medium text-gray-700">템플릿 관리</h3>
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

<script lang="ts">
import { defineComponent, ref, h, onMounted } from "vue";
import axios from 'axios'
import * as util from '/src/assets/util';
import apiUrl from '/src/assets/base';
import { useRouter } from "vue-router";
import { NButton, useMessage } from "naive-ui";

export default defineComponent({
  setup() {
    util.setRouter(useRouter());
    const searchValue = ref("");
    const columns = [
                      {
                        title: "ID",
                        key: "templateId"
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
                        render(row) {
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

    onMounted(()=>{
      search();
    });
    
    return {
      searchValue,
      search,
      util,
      columns,
      userList
    };
  },
});
</script>