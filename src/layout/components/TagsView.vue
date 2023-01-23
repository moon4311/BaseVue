<template>
     <n-layout>
      <n-layout-header>
        <n-space style="margin-top:5px; margin-bottom:5px;">
            <n-tag style="margin : 5 5 5 2;" size="large" > 메인 </n-tag>
            <n-tag style="margin : 5 5 5 2; cursor: pointer;" v-for="o in tagList" :key="o.name" size="large"
                closable
                :checked="selected==o.name"
                :trigger-click-on-close="false"
                @click="handleClick(o)"
                @close="handleClose(o)">
                {{ o.name }}
            </n-tag>
        </n-space>
      </n-layout-header>
    </n-layout>
</template>
<script lang="ts">
    import { ref } from 'vue'
    const tagList = ref([] as any);
    export default{
        name: 'tags',
        data(){
            const selected= "";

            var s = localStorage.getItem('tagList');
            if(s) tagList.value = JSON.parse(s);
            return{
                selected,
                tagList
            }
        },
        methods:{
            push(o: any ){
                const a = tagList.value.filter((e:any)=> e.name === o.name);
                if(a.length==0) tagList.value.push(o);
                this. selected = o.name;
                localStorage.setItem('tagList',JSON.stringify(tagList.value));
            },
            handleClick(o: any){
                console.log(o);
            },
            handleClose(o : any){
                tagList.value = tagList.value.filter( (e: string)  => e !== o)
                localStorage.setItem('tagList',JSON.stringify(tagList.value));
            }
        }
    }
</script>