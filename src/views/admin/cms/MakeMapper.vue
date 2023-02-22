<template>
  <n-card>
    <n-h3>Xml 파일 관리</n-h3>
      <p>템플릿을 이용한 Xml 파일 생성</p>
  </n-card>
  <n-card class="mt-4">
    <div>
      <n-text>
        * 파일 생성 시 첫자 대문자
      </n-text>
      <n-form-item label="파일">
        <n-space>
          src/main/resources/mapper/
          <n-input v-model:value="vueFile.path" placeholder="하위경로" />
          <n-input value="/" disabled />
          <n-input v-model:value="vueFile.fileNm" placeholder="파일명" />.xml
        </n-space>
      </n-form-item>

      <n-form-item label="템플릿">
        <n-select :options="templateOpts" v-model:value="vueFile.sno" :default-value="''" @update:value="templateUpdateValue" />
      </n-form-item>
      <n-form-item label="테이블 선택">
        <n-select :options="tableList" @update:value="tableUpdateValue" />
      </n-form-item>
      <n-form-item>
        <n-input type="textarea" v-model:value="vueFile.content"></n-input>
      </n-form-item>
      <n-form-item label="컬럼 선택" v-show="columnList.length>0">
        <n-checkbox-group v-model:value="checkedColumns">
          <n-grid :y-gap="3" :cols="2">
            <n-gi v-for="a in columnList" :key="a">
              <n-space>
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-checkbox :value="a.field" :label="a.field"/>
                  </template>
                  {{a.comment}}
                </n-tooltip>
                <n-input v-model:value="a.name" :placeholder="a.comment" />
              </n-space>
            </n-gi>
          </n-grid>
        </n-checkbox-group>
      </n-form-item>

      <div v-for="obj in set" :key="obj">
        <n-form-item :label="obj.name? obj.name : ''">
          <n-input v-model:value="obj.val" :placeholder="obj.key"/>
        </n-form-item>
      </div>
      <n-button strong secondary type="warning" @click="makeFile">파일 생성</n-button>
    </div>
  </n-card>
</template>
  
  <script lang="ts" setup>
  import { defineComponent, onMounted, ref } from "vue";
  import axios from 'axios'
  import apiUrl from '/src/assets/base';
  import { SelectOption, useMessage } from 'naive-ui'
  import _ from 'lodash';
  
  const set = ref([] as any);
  const message = useMessage();
  const templateList = ref([] as any);  //템플릿목록
  const names = { "#{title}" : "화면명","#{subTitle}" : "화면설명", "#{columns}": "컬럼목록", "#{apiPath}" : "API 경로"};
  const vueFile = ref({path : ""});      
  const tableList = ref();              //DB Tables
  const columnList = ref([]);             //Table Columns
  const checkedColumns = ref([] as any);
  const templateOpts = ref([] as any);
  const excludeList = ['MEMO','REGIST_DT','REGIST_ID','UPDATE_DT','UPDATE_ID','USE_YN'];

  //템플릿 조회
  const getTmeplate = () =>{
    axios.get(apiUrl + "/template/list",{ params : { templateTypeCd : 'xml' } } ).then(res =>{
      templateList.value = res.data.data;
      _.each(templateList.value, (o => {
          templateOpts.value.push({ label : o.templateNm, value : o.sno});
      }));
    });
  }

  //템플릿 선택
  const templateUpdateValue = (value: string, option: SelectOption) => {
    var one = _.find(templateList.value,(o)=>{ return o.sno === value});
    //파일내용 세팅
    vueFile.value.content = one.content;

    //input창 생성
    set.value = _.map( one.content.match(/#{+\b[\w]+}/gi) , o=>{
      return { key : o, name : names[o]? names[o]:o };
    });
  }

  //테이블 조회
  const getTable = ()=>{
    axios.get(apiUrl + "/db/table").then(res=>{
      tableList.value = _.map(res.data.data,o=>{
        return { label : o.toUpperCase(), value : o }
      });
    });
  }

  //테이블 선택
  const tableUpdateValue = (value: string, option: SelectOption) => {
    axios.get(apiUrl + "/db/column?table="+ value).then(res=>{
      // checkedColumns.value = _.map(res.data.data,o=>{return o.field});
      checkedColumns.value = _.chain(res.data.data)
                              .map(o=>{ return o.field})
                              .filter(o=>{ return excludeList.indexOf( o.toUpperCase() )==-1})
                              .value();
      columnList.value = _.map(res.data.data, o =>{ o.name = o.comment; return o });
    });
  }
  
  //파일 생성
  const makeFile = () =>{

    //1. 컬럼 가공
    var columns = _.map(checkedColumns.value, o => {
       var col = _.find(columnList.value,a=> {return a.field == o});
       return { title: col.name, key: _.camelCase(col.field)} 
    } ) ;

    //content 변수값 치환
    var content = vueFile.value.content;
    _.forEach(set.value,o=>{
      if(o.key=='#{columns}'){
        o.val = JSON.stringify(columns);
      }
      content = content.replace(o.key, o.val);
    });

    vueFile.value.content = content;
    
    axios.post(apiUrl + "/template/makeMapper", vueFile.value ).then(res=>{
      message.success("생성되었습니다.");
    });
  }


  onMounted(()=>{
    getTmeplate();
    getTable();
  });
  
  </script>
  