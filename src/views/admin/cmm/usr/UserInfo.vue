<template>
  <n-notification-provider placement="bottom-right">
    <n-card>
      <div class="n-layout-page-header">
        <n-h3>사용자 정보</n-h3>
        <p>사용자 기본 정보</p>
      </div>
    </n-card>
      <n-card class="mt-4">
        <div>
          <n-form-item path="userId" label="ID">
            <n-input v-model:value="params.userId" @keydown.enter.prevent :disabled="id!=null"/>
          </n-form-item>
          <n-form-item path="userNm" label="이름">
            <n-input v-model:value="params.userNm" @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="tel" label="연락처">
            <n-input v-model:value="params.tel" @keydown.enter.prevent />
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
      <save-notification />
  </n-notification-provider>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useRoute } from "vue-router";
import {useNotification } from 'naive-ui'


const notifi = ref();
const SaveNotification = defineComponent({
  setup () {
    notifi.value = useNotification(); 
  }
})

export default defineComponent({
  components: {
    SaveNotification
  },
  setup () {
    const id = useRoute().params.id;
    const params = ref({})
    
    onMounted(async ()=>{
      if(id){
        await axios.get(apiUrl + "/user/info/"+ id ).then(res=>{
          params.value=res.data.data;
        })
      }
    });

    const save = ()=>{
      params.value.id= id;
      axios.post(apiUrl+"/user/save",params.value).then(res=>{
        notifi.value.success({ content:"저장되었습니다."});
      });
    }

    return {
      id, params, save
    }
  }
})

</script>