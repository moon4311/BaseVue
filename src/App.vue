<template>
  <component :is="layout">
    <n-notification-provider>
      <n-message-provider>
        <router-view />
      </n-message-provider>
    </n-notification-provider>
    <!-- <router-view /> -->
  </component>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";

const defaultLayout = "default";

export default defineComponent({
  setup() {
    const { currentRoute } = useRouter();

    const layout = computed(
      () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
    );

    return {
      layout,
    };
  },
});
</script>
