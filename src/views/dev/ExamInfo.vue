<template>
  <n-card>
    <n-h3>문제지상세</n-h3>
      <p>문제지상세</p>
  </n-card>
  <n-card>
    <div>
    <div class="mt-8">
      <n-grid x-gap="12" :cols="5">
        <n-gi>
          <n-form-item label="출처">
            <n-tree-select
              multiple  cascade   checkable clearable
              :options="sourceOptions"
              v-model="searchParams.SOURCE_FOLDER_ID"
            />
          </n-form-item>
          <n-form-item label="단원/유형">
            <n-tree-select
              multiple  cascade   checkable clearable
              :options="categoryOptions"
              v-model="searchParams.CATEGORY_ID"
            />
          </n-form-item>
          <n-input-group>
            <n-input placeholder="연도" v-model="searchParams.YEAR" />
            <n-input placeholder="난이도" v-model="searchParams.DIFFICULTY_LEVEL" />
          </n-input-group>

          <n-select 
            multiple
            :options="questionOptions"
            v-model="searchParams.QUESTION_TYPE_CODE"
            clearable
          />
          <n-button type="default" @click="search" > 검색 </n-button>
        </n-gi>
      <n-gi :span="4">
        
      </n-gi>
    </n-grid>
    </div>
  </div>
</n-card>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from "vue";
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useRoute } from "vue-router";
import _ from 'lodash';
import { useMessage, SelectOption } from 'naive-ui'

  const message = useMessage()
  const id = useRoute().params.id;
  const params = ref({});
  const searchParams = ref({});
  const apiPath = 'dev/TB_EXAM';
  const sourceOptions = ref([]);
  const categoryOptions = ref([]);
  const questionOptions = ref([]);
  const loading = ref(false);
  
  onMounted( async()=>{
    
    // 1. 출처
    await axios.get(apiUrl+"/dev/TB_SOURCE_FOLDER/list").then( (res)=>{
      loading.value = true;
      var data = res.data.data;
      var dept1 = _.filter(data,{"DEPTH" : 1});
      var dept2 = _.filter(data,{"DEPTH" : 2});
      var dept3 = _.filter(data,{"DEPTH" : 3});
      var dept4 = _.filter(data,{"DEPTH" : 4});
      var dept5 = _.filter(data,{"DEPTH" : 5});

      _.forEach(data,(o)=>{
        o.isLeaf = !(o.children) ;
      });

      putChildren(dept4,dept5, 'SOURCE_FOLDER_ID', 'SOURCE_FOLDER_NAME');
      putChildren(dept3,dept4, 'SOURCE_FOLDER_ID', 'SOURCE_FOLDER_NAME');
      putChildren(dept2,dept3, 'SOURCE_FOLDER_ID', 'SOURCE_FOLDER_NAME');
      putChildren(dept1,dept2, 'SOURCE_FOLDER_ID', 'SOURCE_FOLDER_NAME');

      _.forEach(dept1, async (o)=> {
          var prop = { key : o.SOURCE_FOLDER_ID, label : o.SOURCE_FOLDER_NAME };
          if(o.children) prop.children = o.children;
          sourceOptions.value.push(prop);          
        });
      loading.value = false;
    })

    //2. 유형
    await axios.get(apiUrl+"/dev/TB_CATEGORY/list").then( (res)=>{
      loading.value = true;
      var data = res.data.data;
      var dept1 = _.filter(data,{"DEPTH" : 1});
      var dept2 = _.filter(data,{"DEPTH" : 2});
      var dept3 = _.filter(data,{"DEPTH" : 3});
      var dept4 = _.filter(data,{"DEPTH" : 4});
      var dept5 = _.filter(data,{"DEPTH" : 5});

      putChildren(dept4,dept5, 'CATEGORY_ID', 'CATEGORY_NAME');
      putChildren(dept3,dept4, 'CATEGORY_ID', 'CATEGORY_NAME');
      putChildren(dept2,dept3, 'CATEGORY_ID', 'CATEGORY_NAME');
      putChildren(dept1,dept2, 'CATEGORY_ID', 'CATEGORY_NAME');

      _.forEach(dept1, async (o)=> {
          var prop = { key : o.CATEGORY_ID, label : o.CATEGORY_NAME };
          if(o.children) prop.children = o.children;
          categoryOptions.value.push(prop);
        });
      loading.value = false;
    })

    //연도

    //난이도

    //정답종류
    await axios.get(
      apiUrl+"/dev/TB_CODE/list"
      , {params:{ CODE_PARENT : 'question_type' }}
    ).then(
      (res)=>{
        loading.value = true;
        _.forEach(res.data.data , async (o)=> {
          var prop = { value : o.CODE, label : o.CODE_NAME };
          questionOptions.value.push(prop);
        });
        loading.value = false;
    })

    // 문제지
    if(id){
      axios.get(apiUrl + "/"+apiPath+"/info/", { params : { EXAM_ID : id }} ).then(res=>{
        params.value=res.data.data;
      })
    }
  });

const putChildren = (parent, child, key, label)=>{
  child.forEach((o)=>{
    //props setting
    var prop = { 'key' : o[key], 'label' : o[label]};
    if(o.children) prop.children = o.children;

    // get target
    var target = _.find(parent,(a)=>{return a[key] == o.PARENT_ID});

    // target.children.push
    if(target.children) target.children.push(prop);
    else target.children = [prop];
  });
}


const search = ()=>{
  console.log(searchParams.value);
  axios.get(apiUrl+"/dev2/question/list", { params : searchParams.value } ).then(
    (res)=>{
      console.log(res.data.data);
    }
  )

}
const save = ()=>{
  params.value.id = id;
  axios.post(apiUrl+"/"+apiPath+"/save",params.value).then(res=>{
    console.log(res);
  });
}
</script>