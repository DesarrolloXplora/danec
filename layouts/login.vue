<template>
  <div class="mx-auto p-4 login-bg">
    <slot></slot>
  </div>
</template>

<style>
.login-bg {
  background-size: cover;
  background-position: center;
  background-image: url("https://storage.googleapis.com/static-content-seed/danec/login-bg.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
