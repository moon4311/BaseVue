<template>
  <n-card>
    <div class="n-layout-page-header">
      <n-h3>템플릿 정보</n-h3>
      <p>Vue 템플릿 정보</p>
    </div>
  </n-card>
  <n-card class="mt-4">
    <n-config-provider :hljs="hljs">
        <n-form
          :label-width="80"
          >
          <n-form-item path="templateTypeCd" label="템플릿 구분">
            <n-select
              v-model:value="params.templateTypeCd"
              :options="options"
              :disabled="id!=undefined"
            >
            </n-select>
            <!-- <n-input v-model:value="params.templateTypeCd" /> -->
          </n-form-item>
          <n-form-item path="nm" label="이름">
            <n-input v-model:value="params.templateNm"/>
          </n-form-item>
          <n-form-item path="contents" label="내용">
            <n-input type="textarea" 
              v-model:value="params.content"
              :autosize="{ minRows: 3, maxRows : 20 }"
              />
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
        </n-form>
    </n-config-provider>
  </n-card>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useRoute } from "vue-router";
import { useMessage } from 'naive-ui';

const message = useMessage()
const params= ref({})
const options = ref([]);
const id = useRoute().params.id;
onMounted(async ()=>{
  

  await axios.get(apiUrl + "/code/options/TEMPLATE_TYPE_CD").then(res=>{
    options.value = res.data.data;  
  });

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
</script>