<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">권한명 정보</h3>

    <div class="mt-8">
        <n-form-item path="id" label="ID">
          <n-input v-model:value="params.id"  />
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
import { defineComponent, ref, onMounted } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useRoute } from "vue-router";
import { FormInst, FormItemInst, FormItemRule, FormValidationError, useMessage, FormRules } from 'naive-ui'


export default defineComponent({
  setup () {
    const message = useMessage()
    const params = ref({})

    onMounted( ()=>{
      const id = useRoute().params.id;
      if(id){
        axios.get(apiUrl + "/authName/info/"+ id ).then(res=>{
          params.value=res.data.data;
        })
      }
    });

    const save = ()=>{
      axios.post(apiUrl+"/authName/save",params.value).then(res=>{
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