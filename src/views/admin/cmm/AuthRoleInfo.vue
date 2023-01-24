<template>
  <n-card>
    <div class="n-layout-page-header">
      <n-h3>권한롤 정보</n-h3>
      <p>권한롤 정보</p>
    </div>
  </n-card>
  <n-card class="mt-4">
      <div>
      <n-form-item path="roleId" label="권한 ID">
        <n-input v-model:value="params.roleId" disabled />
      </n-form-item>
      <n-form-item path="roleNm" label="권한명">
        <n-input v-model:value="params.roleNm"/>
      </n-form-item>
      <n-form-item path="rolePttrn" label="권한규칙">
        <n-input v-model:value="params.rolePttrn"/>
      </n-form-item>
      <n-form-item path="roleType" label="권한타입">
        <n-input v-model:value="params.roleType"/>
      </n-form-item>
      <n-form-item path="roleDc" label="설명">
        <n-input v-model:value="params.roleDc"/>
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

  const message = useMessage();
  const id = useRoute().params.id;
  const params = ref({});
 
  onMounted( ()=>{
    if(id){
      axios.get(apiUrl + "/authRole/info/"+ id ).then(res=>{
        params.value=res.data.data;
      })
    }
  });

  const save = ()=>{
    axios.post(apiUrl+"/authRole/save",params.value).then(res=>{
      console.log(res);
    });
  }
</script>