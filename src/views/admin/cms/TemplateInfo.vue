<template>
  <n-layout embedded content-style="padding: 24px;">
    <h3 class="text-3xl font-semibold text-gray-700">템플릿 정보</h3>
    <div class="mt-8">
      <n-form-item path="id" label="ID">
        <n-input v-model:value="params.templateId" />
      </n-form-item>
      <n-form-item path="nm" label="이름">
        <n-input v-model:value="params.templateNm"/>
      </n-form-item>
      <n-form-item path="contents" label="내용">
        <n-input type="textarea" v-model:value="params.content"/>
      </n-form-item>
      <n-form-item path="memo" label="메모">
        <n-input v-model:value="params.memo"/>
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
    const params= ref({})
    
    onMounted( ()=>{
      const id = useRoute().params.id;
      if(id){
        axios.get(apiUrl + "/template/info/"+id ).then(res=>{
          params.value=res.data.data;
        })
      }
    });
    const save = ()=>{
      axios.post(apiUrl + "/template/save", params.value ).then(res=>{
        alert("저장되었습니다.");
      });
    }
    
    return {
      params,
      save
    }
  }
})
</script>