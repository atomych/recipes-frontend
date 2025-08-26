<template>
  <div class="register">
    <div class="register-form">
      <InputText
        :model-value="RECIPES_REGISTER.state.name"
        placeholder="Введите имя"
        :disabled="RECIPES_REGISTER.state.loading"
        @update:model-value="RECIPES_REGISTER.updateName($event)"
        class="register-form-item"
      />
      <InputText
        :model-value="RECIPES_REGISTER.state.email"
        placeholder="Введите почту"
        :disabled="RECIPES_REGISTER.state.loading"
        @update:model-value="RECIPES_REGISTER.updateEmail($event)"
        class="register-form-item"
      />
      <InputText
        :model-value="RECIPES_REGISTER.state.password"
        type="password"
        placeholder="Введите пароль"
        :disabled="RECIPES_REGISTER.state.loading"
        @update:model-value="RECIPES_REGISTER.updatePassword($event)"
        class="register-form-item"
      />
      <InputText
        :model-value="RECIPES_REGISTER.state.repeatPassword"
        type="password"
        placeholder="Повторите пароль"
        :disabled="RECIPES_REGISTER.state.loading"
        @update:model-value="RECIPES_REGISTER.updateRepeatPassword($event)"
        class="register-form-item"
      />
      <Button
        :disabled="
          RECIPES_REGISTER.state.loading || !RECIPES_REGISTER.state.isValid
        "
        label="Зарегистрироваться"
        @click="RECIPES_REGISTER.register"
        class="login-form-item login-form-item_button"
      />
      <Button
        variant="outlined"
        label="Вернуться"
        class="login-form-item login-form-item_button"
        @click="RECIPES_REGISTER.toLogin"
      />
    </div>
  </div>
</template>

<script src="./register.ts"></script>
<style src="./css/register.css"></style>
