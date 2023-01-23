<template>
    <n-space vertical>
      <n-layout has-sider>
        <n-layout-sider
          show-trigger="arrow-circle"
        >
          <Logo :collapsed="collapsed" />
          <Sidebar />
        </n-layout-sider>
        <n-layout>
          <n-layout-header>
            <Header />
          </n-layout-header>
                <div style="background-color:red !important">
                  <tabs-view v-model:collapsed="collapsed" />
                </div>
          <n-layout-content embedded>
                <slot />
          </n-layout-content>
          <!-- <n-layout-footer>Chengfu Road</n-layout-footer> -->
        </n-layout>
      </n-layout>
    </n-space>
</template>
<script lang="ts">
export default defineComponent({
  Sidebar,Header,Logo,PageHeader, TabsView

});
</script>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";

import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
import Logo from './components/Logo.vue';
import PageHeader  from './components/Header.vue';
import TabsView from './components/TagsView.vue';

const collapsed = ref<boolean>(false);

</script>

