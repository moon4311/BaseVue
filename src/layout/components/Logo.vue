<template>
    <div class="logo">
      <img :src="websiteConfig.logo" alt="" :class="{ 'mr-2': !collapsed }" />
      <h2 v-show="!collapsed" class="title">{{ websiteConfig.title }}</h2>
    </div>
  </template>
  
  <script lang="ts">
    import { websiteConfig } from '../../config/website.config';
    export default {
      name: 'Index',
      props: {
        collapsed: {
          type: Boolean,
        },
      },
      data() {
        return {
          websiteConfig,
        };
      },
    };
  </script>
  
  <style scoped>
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
      line-height: 64px;
      overflow: hidden;
      white-space: nowrap;
    }

    .logo img {
      width: auto;
      height: 32px;
    }
  
    .logo .title {
      margin: 0;
    }
  </style>
  