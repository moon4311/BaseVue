<template>
  <div>
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
    const params = ref({})

    const save = ()=>{
      axios.post(apiUrl+"/user/save",params).then(res=>{
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