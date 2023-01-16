<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">#{title}</h3>

    <div class="mt-8">
      <n-form-item path="title" label="제목">
        <n-input v-model:value="param.title" />
      </n-form-item>
      <n-form-item path="name" label="이름">
        <n-input v-model:value="param.name"/>
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
      axios.post(apiUrl + "/board/save", param.value ).then(res=>{
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