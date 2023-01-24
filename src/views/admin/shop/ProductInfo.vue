<template>
  <n-card>
    <n-h3>상품정보</n-h3>
      <p>상품의 상세정보를 조회, 수정합니다.</p>
  </n-card>
  <n-card>
    <div>
    <div class="mt-8">
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
  const apiPath = 'shop/product';
  onMounted( ()=>{
    if(id){
      axios.get(apiUrl + "/"+apiPath+"/info/"+ id ).then(res=>{
        params.value=res.data.data;
      })
    }
  });

  const save = ()=>{
    params.value.id = id;
    axios.post(apiUrl+"/"+apiPath+"/save",params.value).then(res=>{
      console.log(res);
    });
  }
</script>