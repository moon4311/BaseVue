<template>
  <n-card>
    <n-h3>권한부여 관리</n-h3>
      <p>권한명 - 권한롤 연결</p>
  </n-card>
  <div>
      <div class="mt-4">
        <n-transfer ref="transfer" v-model:value="value" :options="options" />
      </div>
      <n-button @click="save">저장</n-button>
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
    const value = ref([] as any);
    const options = ref([] as any);
    const list = ref([]);

    const search = ()=>{
      axios.get(apiUrl + "/authRole/list").then(res=>{
         res.data.data.forEach( (one: any) => {
            console.log(one);
            options.value.push({ label : one.roleNm, value: one.roleId});
         });
      });

      axios.get(apiUrl + "/authGrant/list",{params:{ userNm : searchValue.value}}).then((res: any)=>{
        list.value = res.data.data;
      });
    }

    onMounted(()=>{
      search();
    });
    
    return {
      searchValue,
      search,
      value, options,
      list,
      util
    };
  }, // setup
  methods:{
    save(){
      console.log(this.value);
    }
  }
});
</script>