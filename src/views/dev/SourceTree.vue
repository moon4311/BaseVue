<template>
  <n-card>
    <n-h3>출처폴더</n-h3>
      <p>출처폴더</p>
  </n-card>
  <n-layout embedded content-style="padding: 24px;">
    <n-grid x-gap="12" :cols="3">
      <!-- 폴더목록 -->
      <n-gi>
          <n-space justify="end">
            <n-button strong secondary type="default" @click="clear">선택취소</n-button>
            <n-button strong secondary type="info" @click="addRow">폴더생성</n-button>
            <n-button strong secondary type="error" :disabled="!selectItem.SOURCE_FOLDER_ID" @click="del">삭제</n-button>
          </n-space>
          <n-input v-model:value="pattern" placeholder="폴더명을 검색하세요" />
          <n-card>
              <n-tree
                block-line
                :data="list"
                :show-irrelevant-nodes="showIrrelevantNodes"
                :pattern="pattern"
                :node-props="nodeProps"
                selectable
              />
          </n-card>
      </n-gi>
      <!-- 폴더상세 -->
      <n-gi>
        <n-card>
          <n-form
            ref="formRef"
            label-width="auto"
            :style="{
              maxWidth: '640px'
            }"
          >
            <n-space>
              <n-form-item label="상위ID" >
                <n-input v-model:value="selectItem.PARENT_ID" placeholder="" />
              </n-form-item>
              <n-form-item label="트리명" >
                <n-input v-model:value="selectItem.SOURCE_FOLDER_NAME" placeholder="트리명" />
              </n-form-item>
            </n-space>
            <n-space>
              <n-input-group>
                <n-form-item label="깊이">
                <n-input-number v-model:value="selectItem.DEPTH" placeholder="Input" />
              </n-form-item>
              <n-form-item label="정렬순서">
                <n-input-number v-model:value="selectItem.LIST_ORDER" placeholder="Input" />
              </n-form-item>
              </n-input-group>
            </n-space>
            <n-space>
              <n-input-group>
                <n-form-item label="공개여부">
                  <n-input v-model:value="selectItem.OPEN_YN" />
                </n-form-item>
                <n-form-item label="사용여부">
                  <n-input v-model:value="selectItem.USE_YN" />
                </n-form-item>
              </n-input-group>
            </n-space>
            <n-button strong secondary type="success" @click="save">저장</n-button>
          </n-form>
        </n-card>
      </n-gi>
      <!-- 출처목록 -->
      <n-gi>
        <n-space>
          <n-card>
            <n-list>
              <n-list-item style="cursor: pointer;" v-for="one in sourceList" :key="one" @click="goSource(one.SOURCE_ID)">
                  {{ one.SOURCE_NAME  }} [ {{ one.SOURCE_ID }} ]
                  <n-button secondary size="tiny" type="default" v-show='"file_none"===one.STATUS_CODE'>작업전</n-button>
                  <n-button secondary size="tiny" type="warning" v-show='"uploaded"===one.STATUS_CODE'>업로드</n-button>
                  <n-button secondary size="tiny" type="success" v-show='"complete"===one.STATUS_CODE'>완료</n-button>
              </n-list-item>
            </n-list>
            <n-input-group>
              <n-form-item label="폴더">
                <n-input v-model:value="source.SOURCE_FOLDER_ID" readonly="true"/>
              </n-form-item>
              <n-form-item label="출처명">
                <n-input v-model:value="source.SOURCE_NAME"/>
              </n-form-item>
              <n-form-item label="상태">
                <n-input v-model:value="source.STATUS_CODE"/>
              </n-form-item>
            </n-input-group>
            <n-button strong secondary type="success" :disabled="!selectItem.EXAM_FOLDER_ID" @click="addSource">추가</n-button>
          </n-card>
        </n-space>
      </n-gi>
    </n-grid>
  </n-layout>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import apiUrl from '/src/assets/base';
import _ from 'lodash';
import { TreeOption } from 'naive-ui';


const router = useRouter();
const list = ref([] as any);
const sourceList = ref([]);
const selectItem = ref({});
const source = ref({});
const search = ()=>{
  axios.get(apiUrl + "/dev/TB_SOURCE_FOLDER/list").then((res: any)=>{
  var data = res.data.data;

  //key, label 생성
  _.forEach(data,(a)=>{ 
    a.label = a.SOURCE_FOLDER_NAME;
    a.key = a.SOURCE_FOLDER_ID;
    a.PARENT_NAME = "";
  });

  list.value = _.filter(data,{"DEPTH" : 1});
  var dept2 = _.filter(data,{"DEPTH" : 2});
  var dept3 = _.filter(data,{"DEPTH" : 3});
  var dept4 = _.filter(data,{"DEPTH" : 4});
  var dept5 = _.filter(data,{"DEPTH" : 5});

  putChildren(dept4,dept5);
  putChildren(dept3,dept4);
  putChildren(dept2,dept3);
  putChildren(list.value,dept2);

  
  });
}

const putChildren = (parent, child)=>{
  child.forEach((o)=>{
    var target = _.find(parent,{'SOURCE_FOLDER_ID': o.PARENT_ID});
    if(target.children) target.children.push(o);
    else target.children = [o];
  });
}


//메뉴 선택
const rowClick = (obj: any)=>{
  selectItem.value = obj;
  getSourceList(obj.SOURCE_FOLDER_ID);
}

const clear = ()=>{
  selectItem.value = {
    PK : 'SOURCE_FOLDER_ID',
    SOURCE_FOLDER_ID : "",
    PARENT_ID : "-1",
    SOURCE_FOLDER_NAME : "",
    DEPTH : 1,
    LIST_ORDER : "",
    OPEN_YN : 'N',
    USE_YN : "Y"
  };
}

//하위트리 생성
const addRow = ()=>{
  if(selectItem.value.SOURCE_FOLDER_ID==="") return false;
  var sort = 1;
  if(selectItem.value.children) sort = selectItem.value.children.length+1;
  selectItem.value = {
    PK : 'SOURCE_FOLDER_ID',
    SOURCE_FOLDER_ID: "",
    PARENT_ID : selectItem.value.SOURCE_FOLDER_ID,
    SOURCE_FOLDER_NAME : "",
    DEPTH : 1,
    LIST_ORDER : sort,
    OPEN_YN : 'N',
    USE_YN : 'Y'
  };
}

//저장
const save = () =>{
  if(selectItem.value.SOURCE_FOLDER_NAME===undefined){
    alert("이름을 입력해주세요");
    return false;
  }
  axios.post(apiUrl + "/dev/TB_SOURCE_FOLDER/save", selectItem.value ).then((res)=>{
    if(res.status==200){
      alert("저장 되었습니다.");
      search();
    }
  });
}
//삭제
const del = ()=>{
  axios.post(apiUrl + "/dev/TB_SOURCE_FOLDER/del", selectItem.value ).then(res =>{
    if(res.status==200){
      alert("삭제되었습니다.");
      search();
    }
  });
}

//출처목록 조회
const getSourceList = (SOURCE_FOLDER_ID)=>{
  source.value.SOURCE_FOLDER_ID = SOURCE_FOLDER_ID;
  axios.get(apiUrl+"/dev/TB_SOURCE/list?SOURCE_FOLDER_ID="+SOURCE_FOLDER_ID).then(
  (res)=>{
    sourceList.value = res.data.data;
  });
}

//출처 상세보기
const goSource = (SOURCE_ID)=>{
  router.push("/dev/source/" +SOURCE_ID);
}

//출처생성
const addSource = ()=>{
  source.value.PK = 'SOURCE_ID';
  axios.post(apiUrl+"/dev/TB_SOURCE/save", source.value ).then(
    (res)=>{
      console.log(res.data.data);
      getSourceList(source.value.SOURCE_FOLDER_ID);
    }
  )
}


const pattern = ref('');
const showIrrelevantNodes = ref(false);
const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick () {
      rowClick(option);
    }
  }
}

onMounted(()=>{
  search();
});

</script>
