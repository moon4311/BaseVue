<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">게시판 정보</h3>

    <div class="mt-8">
      <n-form-item path="title" label="제목">
        <n-input v-model:value="params.title" />
      </n-form-item>
      <n-form-item path="name" label="이름">
        <n-input v-model:value="params.name"/>
      </n-form-item>
      <n-form-item path="contents" label="내용">
        <n-input v-model:value="params.content"/>
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
    const params = ref({})

    onMounted( ()=>{
      axios.get(apiUrl + "/board/info/"+useRoute().params.id ).then(res=>{
        params.value=res.data.data;
      })
    });

    const save = ()=>{
      axios.post(apiUrl+"/board/save",params).then(res=>{
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