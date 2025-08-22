<template>
  <div class="login">
    <div class="login-form">
      <InputText
        :model-value="RECIPES_LOGIN.state.login"
        placeholder="Имя или почта"
        :disabled="RECIPES_LOGIN.state.loading"
        @update:model-value="RECIPES_LOGIN.updateLogin($event)"
        class="login-form-item"
      />
      <InputText
        :model-value="RECIPES_LOGIN.state.password"
        placeholder="Пароль"
        :disabled="RECIPES_LOGIN.state.loading"
        type="password"
        @update:model-value="RECIPES_LOGIN.updatePassword($event)"
        class="login-form-item"
      />
      <Button
        :disabled="RECIPES_LOGIN.state.loading"
        @click="RECIPES_LOGIN.login"
        class="login-form-item login-form-item_button"
        >Войти</Button
      >
    </div>
  </div>
</template>

<script src="./login.ts"></script>
<style src="./css/login.css"></style>
