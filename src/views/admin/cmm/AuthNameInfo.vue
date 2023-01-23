<template>
  <n-card>
    <div class="n-layout-page-header">
      <n-h3>권한명 정보</n-h3>
      <p>권한명 정보</p>
    </div>
  </n-card>
    <n-card class="mt-4">
      <div>
        <n-form-item path="authId" label="권한 ID">
          <n-input v-model:value="params.authId" :disabled="id!=null" />
        </n-form-item>
        <n-form-item path="authNm" label="권한 명">
          <n-input v-model:value="params.authNm"  />
        </n-form-item>
        <n-form-item path="authDc" label="권한 설명">
          <n-input v-model:value="params.authDc"  />
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
  </n-card>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useRoute } from "vue-router";
import { useMessage } from 'naive-ui'

  const message = useMessage()
  const id = useRoute().params.id;
  const params = ref({})

  onMounted( ()=>{
    if(id){
      axios.get(apiUrl + "/authName/info/"+ id ).then(res=>{
        params.value=res.data.data;
      })
    }
  });

  const save = ()=>{
    axios.post(apiUrl+"/authName/save",params.value).then(res=>{
      message.info("저장되었습니다.");
    });
  }
</script>