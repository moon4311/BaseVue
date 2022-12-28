<template>
  <div>
    <div class="mt-8">
      <h4 class="text-gray-600">메뉴 관리</h4>

      <div class="flex flex-col mt-6">
        <div
          class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          <div
            class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
          >
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                    메뉴명
                  </th>
                  <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                    메뉴ID
                  </th>
                  <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                    상위메뉴ID
                  </th>
                  <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                    경로
                  </th>
                  <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                    정렬순서
                  </th>
                  <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                    사용여부
                  </th>
                  <th
                    class="px-6 py-3 bg-gray-100 border-b border-gray-200"
                  ></th>
                </tr>
              </thead>

              <tbody class="bg-white">
                <tr v-for="(u, index) in list" :key="index">
                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ u.menuNm }}
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ u.menuId }}
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ u.upperMenuId }}
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ u.url }}
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ u.sort }}
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ u.useYn }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
                  >
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                      >Edit</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useTableData } from "/src/hooks/useTableData";

export default defineComponent({
  setup() {
    const { wideTableData, } = useTableData();
    const list = ref([]);
    axios.get(apiUrl + "/menu/list").then((res: any)=>{
      list.value = res.data.data;
    });
    return {
      wideTableData,
      list
    };
  },
});
</script>
