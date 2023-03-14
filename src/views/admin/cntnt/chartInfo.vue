<template>
  <n-card>
    <n-h3>차트관리</n-h3>
      <p>차트관리</p>
  </n-card>
  <n-card>
    <div>
    <div class="mt-8">
      <n-form-item path="chartTypeCd" label="구분">
        <!-- TODO. select box -->
        <n-select :options="options" />
        <n-input v-model:value="params.chartTypeCd" />
      </n-form-item>
      <n-form-item path="chartNm" label="이름">
        <n-input v-model:value="params.chartNm"/>
      </n-form-item>
      <n-form-item path="width" label="넓이">
        <n-input v-model:value="params.width"/>
      </n-form-item>
      <n-form-item path="height" label="높이">
        <n-input v-model:value="params.height"/>
      </n-form-item>
      <n-form-item path="labels" label="라벨">
        <n-input v-model:value="params.labels"/>
      </n-form-item>
      <n-form-item path="datasets" label="데이터셋">
        <n-input v-model:value="params.datasets"/>
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
  const options =ref([]);
  const apiPath = 'chart';
  onMounted( ()=>{

    axios.get(apiUrl + "/code/options/chart_type_cd").then(res=>{
      options.value = res.data.data;
    });

    if(id){
      axios.get(apiUrl + "/"+apiPath+"/info/"+ id ).then(res=>{
        params.value=res.data.data;

        // params.value.labels = JSON.parse(params.value.labels);
        // params.value.datasets = JSON.parse(params.value.datasets);

      })
    }
  });

  const save = ()=>{
    params.value.id = id;
    axios.post(apiUrl+"/"+apiPath+"/save",params.value).then(res=>{
      message.success("저장 되었습니다.");
    });
  }
</script>