<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">템플릿 정보</h3>

    <div class="mt-8">
      <n-form-item path="id" label="ID">
        <n-input v-model:value="param.templateId" />
      </n-form-item>
      <n-form-item path="nm" label="이름">
        <n-input v-model:value="param.templateNm"/>
      </n-form-item>
      <n-form-item path="contents" label="내용">
        <n-input v-model:value="param.contents"/>
      </n-form-item>
      <n-form-item path="memo" label="메모">
        <n-input v-model:value="param.memo"/>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useRouter } from "vue-router";
import { FormInst, FormItemInst, FormItemRule, FormValidationError, useMessage, FormRules } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const param= ref({})
    
    const save = ()=>{
      axios.post(apiUrl + "/template/save", param.value ).then(res=>{
        alert("저장되었습니다.");
      });
    }
    
    return {
      param,
      save
    }
  }
})
</script>