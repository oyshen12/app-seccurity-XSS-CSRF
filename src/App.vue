<script setup lang="ts">
import { ref } from 'vue';
import CommonBtn from './components/CommonBtn.vue';
import XSS from './XSS/XSS.vue';

const typeOfAttack = ref<'xss' | 'csrf'>('xss');
</script>

<template>
  <div class="app">
    <div class="app__navigation">
      <CommonBtn :active="typeOfAttack === 'xss'" class="app__navigation-btn" @click="typeOfAttack = 'xss'"
        >XSS</CommonBtn
      >
      <CommonBtn :active="typeOfAttack === 'csrf'" class="app__navigation-btn" @click="typeOfAttack = 'csrf'"
        >CSRF</CommonBtn
      >
    </div>
    <XSS class="app__xss" v-if="typeOfAttack === 'xss'" />
  </div>
</template>

<style scoped lang="scss">
.app {
  padding: 32px;
}

.app__navigation {
  display: flex;
  justify-content: center;
}

.app__navigation-btn {
  & + & {
    margin-left: 32px;
  }
}
</style>
