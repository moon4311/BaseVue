<template>
  <n-layout embedded content-style="padding: 24px;">
    <h3 class="text-3xl font-semibold text-gray-700">사용자 정보</h3>

    <div class="mt-8">
        <n-form-item path="id" label="ID">
          <n-input v-model:value="params.id" @keydown.enter.prevent />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button @click="save" > 저장 </n-button>
              <n-button @click="$router.back" > 이전 </n-button>
            </div>
          </n-col>
        </n-row>
    </div>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useRoute } from "vue-router";
import { useMessage } from 'naive-ui'


export default defineComponent({
  setup () {
    const message = useMessage()
    const params = ref({})

    onMounted( ()=>{
      const id = useRoute().params.id;
      if(id){
        axios.get(apiUrl + "/user/info/"+ id ).then(res=>{
          params.value=res.data.data;
        })
      }
    });

    const save = ()=>{
      axios.post(apiUrl+"/user/save",params.value).then(res=>{
        console.log(res);
      });
    }


    return {
      params,
      save,
    }
  }
})
</script>