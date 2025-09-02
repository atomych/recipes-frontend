<template>
  <div class="dogrecipes-loader">
    <div class="dogrecipes-loader-wrapper">
      <div class="dogrecipes-loader-circle">
        <div />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Loader',
  });
</script>

<style>
  .dogrecipes-loader {
    width: fit-content;
    height: 32px;
  }

  @keyframes animate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .dogrecipes-loader-circle div {
    position: absolute;
    width: 28px;
    height: 28px;
    border: 2px solid #00a800;
    border-top-color: transparent;
    border-radius: 50%;
  }

  .dogrecipes-loader-circle div {
    animation: animate 1s linear infinite;
    top: 16px;
    left: 16px;
  }

  .dogrecipes-loader-wrapper {
    width: 32px;
    height: 32px;
    display: inline-block;
    overflow: hidden;
    background: none;
  }

  .dogrecipes-loader-circle {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0;
  }

  .dogrecipes-loader-circle div {
    box-sizing: content-box;
  }

  .dogrecipes-loader,
  .dogrecipes-loader .dogrecipes-loader-wrapper {
    width: 56px;
    height: 56px;
  }

  .dogrecipes-loader .dogrecipes-loader-circle div {
    width: 44px;
    height: 44px;
    left: 28px;
    top: 28px;
  }
</style>
