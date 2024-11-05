<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { iframeXss, scriptString, svgXss } from '../variables';

const xssContent = ref<HTMLElement | null>(null);

onMounted(() => {
  if (xssContent.value) xssContent.value.innerHTML = scriptString;
  const element = document.createElement('div');
  element.innerHTML = scriptString;
  document.body.appendChild(element);
});
</script>

<template>
  <div class="query-attack">
    <button onclick="alert('Cookie: ' + document.cookie)">Read Cookie</button>
    <iframe :srcdoc="iframeXss" sandbox="allow-scripts" class="iframe" />
    <img src="" onerror="alert('xss attack')" />
    <div>{{ scriptString }}</div>
    <div v-html="scriptString"></div>
    <div v-text="scriptString"></div>
    <div ref="xssContent"></div>
    <div v-html="svgXss"></div>
  </div>
</template>

<style scoped lang="scss">
.query-attack {
  margin-top: 16px;
}
</style>
