<template>
  <n-card>
    <div class="n-layout-page-header">
      <n-h3>권한롤 정보</n-h3>
      <p>권한롤 정보</p>
    </div>
  </n-card>
  <n-card class="mt-4">
      <div>
      <n-form-item path="title" label="제목">
        <n-input v-model:value="params.title" />
      </n-form-item>
      <n-form-item path="name" label="이름">
        <n-input v-model:value="params.name"/>
      </n-form-item>
      <n-form-item path="contents" label="내용">
        <n-input v-model:value="params.contents"/>
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