<template>
    <div>
        <div v-bind:key="path" v-for="(item) in tabList">
            <router-link :to="item.path" tag="button">
                {{ item.name }}
            </router-link>
        </div>
    </div>
</template>


<script>
import { defineComponent, ref, onMounted, h, computed } from "vue";
import { useTabsViewStore } from '../store/modules/tagsView';
import { useRoute, useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';

export default defineComponent({
    setup() {
        const tabsViewStore = useTabsViewStore();
        // const samplePath =  { "path": "", "name": "",}
        // tabsViewStore.addTabs( samplePath )
        const tabList = computed(() => tabsViewStore.tabsList);
        return{
            tabsViewStore,
            tabList,
        }
    },
    
})
</script>

