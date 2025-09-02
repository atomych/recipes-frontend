<template>
  <header class="page-header">
    <div class="page-header-left">
      <div class="page-header-left__logo">
        <img src="/dog-icon.png" alt="logo" />
        <p class="page-header-left__logo-text">DogRecipes</p>
      </div>
    </div>
    <div class="page-header-right">
      <div v-if="$infra.user.currentUser.value" class="page-header-right-user">
        <div class="page-header-right-user-avatar">
          <Avatar size="large" :label="$infra.user.currentUser.value.avatar" />
        </div>
        <div class="page-header-right-user-info">
          <p class="page-header-right-user-info__name">{{ $infra.user.currentUser.value.name }}</p>
        </div>
        <div class="page-header-right-user-exit">
          <Button icon="pi pi-sign-out" @click="exit" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { defineComponent } from 'vue';
  import Avatar from 'primevue/avatar';
  import Button from 'primevue/button';
  import infrastructure from "@/infrastructure/index.js";
  import { LocalStorageKeys } from "@/infrastructure/localstorage/consts.js";

  export default defineComponent({
    name: 'PageHeader',
    components: {
      Avatar,
      Button,
    },
    setup: () => {
      function exit() {
        infrastructure.localstorage.clearItem(LocalStorageKeys.ACCESS_TOKEN);
        infrastructure.localstorage.clearItem(LocalStorageKeys.REFRESH_TOKEN);
        window.location.reload();
      }

      return {
        exit,
      };
    },
  });
</script>

<style>
  .page-header {
    padding: 10px 15px;
    box-shadow: 0 0 2px #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .page-header-left__logo {
    width: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
  }

  .page-header-left__logo img {
    display: block;
    max-width: 100%;
    height: auto;
    margin-right: 10px;
  }

  .page-header-left__logo-text {
    font-size: 25px;
    letter-spacing: 2px;
  }

  .page-header-right-user {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .page-header-right-user-avatar {
    margin-right: 5px;
  }

  .page-header-right-user-info {
    margin-right: 50px;
    font-size: 20px;
  }
</style>
