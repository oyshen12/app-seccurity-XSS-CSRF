<script setup lang="ts">
interface IProps {
  active?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  active: false,
});
</script>

<template>
  <button
    class="common-btn"
    :class="{
      'common-btn--active': props.active,
    }"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.common-btn {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;

  &--active {
    outline: 4px auto -webkit-focus-ring-color;
  }

  &:hover {
    border-color: #646cff;
  }
}
</style>
