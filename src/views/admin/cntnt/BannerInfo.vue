<template>
  <n-card>
    <n-h3>배너정보</n-h3>
      <p>배너 상세정보 등록/생성</p>
  </n-card>
  <n-card>
    <div>
    <div class="mt-8">
      <n-form-item path="banner" label="제목">
        <n-input v-model:value="params.bannerNm" />
      </n-form-item>
      <n-form-item path="width" label="길이">
        <n-input v-model:value="params.width"/>
      </n-form-item>
      <n-form-item path="height" label="높이">
        <n-input v-model:value="params.height"/>
      </n-form-item>
      <n-form-item path="startDt" label="게시일자">
        <n-date-picker v-model:value="params.startDt" type="date" />
      </n-form-item>
      <n-form-item path="endDt" label="종료일자">
        <n-date-picker v-model:value="params.endDt" type="date" />
      </n-form-item>
      <n-form-item path="useYn" label="사용여부">
        <n-input v-model:value="params.useYn"/>
      </n-form-item>
      <n-upload 
        @change="handleChange"
        :default-upload="false"
        :default-file-list="fileList"
      >
        <n-button>파일 선택</n-button>
      </n-upload>

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
import { ref, onMounted } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useRoute } from "vue-router";
import { UploadFileInfo, useMessage } from 'naive-ui'

  const message = useMessage()
  const id = useRoute().params.id;
  const params = ref({ useYn : 'Y'} as any);
  const apiPath = 'banner';
  const fileList = ref<UploadFileInfo[]>()
  const formData = new FormData();
  const handleChange = (data : { fileList: UploadFileInfo[] }) =>{
    formData.delete('files');
    data.fileList.forEach(o=>{
      formData.append('files', o.file );
    });
  };

  onMounted( ()=>{
    if(id){
      axios.get(apiUrl + "/"+apiPath+"/info/"+ id ).then(res=>{
        params.value=res.data.data;
      })
    }
  });

  const save = ()=>{
    params.value.id = id;

    formData.append("bannerSno", params.value.id);
    formData.append("bannerNm", params.value.bannerNm);
    formData.append("width", params.value.width);
    formData.append("height", params.value.height);
    formData.append('startDt', params.value.startDt/1000);
    formData.append('endDt', params.value.endDt/1000);
    formData.append("useYn", params.value.useYn);

    axios.post(apiUrl+"/"+apiPath+"/save", formData, 
      {
        headers : { "Content-Type" : 'multipart/form-data' }
      }
    ).then(res=>{
      message.success("저장 되었습니다.");
      console.log(res);
    });
  }
</script>