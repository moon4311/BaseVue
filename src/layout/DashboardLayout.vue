<template>
    <n-space vertical>
      <n-layout has-sider>
        <n-layout-sider
        show-trigger="arrow-circle"
        >
          <Logo :collapsed="collapsed" />
          <Sidebar />
        </n-layout-sider>
        <n-layout >
          <n-layout-header>
            <Header />
          </n-layout-header>
          <n-layout-content content-style="padding: 24px;">
              
                <slot />
              
          </n-layout-content>
          <!-- <n-layout-footer>Chengfu Road</n-layout-footer> -->
        </n-layout>
      </n-layout>
    </n-space>
</template>

<script lang="ts" setup>
import { defineComponent, unref, ref, computed, onMounted } from "vue";

import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
import Logo from './components/Logo.vue';
import PageHeader  from './components/Header.vue';

const collapsed = ref<boolean>(false);


</script>
