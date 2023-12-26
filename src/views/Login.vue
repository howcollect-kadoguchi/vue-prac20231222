<script setup lang="ts">
import Header from '../components/common/Header.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');

const cookies = VueCookies;
const router = useRouter();

onMounted(() => {
  // ログイン済みの場合はリダイレクト
  if (cookies.get('token')) router.push('/');
});

const login = async () => {
  // ログインの処理
  const url = import.meta.env.VITE_BASE_URL;

  await axios
    .post(`${url}/signin`, { email: email.value, password: password.value })
    .then((res) => {
      cookies.set('token', res.data.token);
      router.push('/');
    })
    .catch((err) => {
      console.error(err);
    });
};
</script>

<template>
  <Header />
  <div class="main">
    <h2>サインイン</h2>
    <form class="form" id="form" data-testid="signin-form" @submit.prevent="login">
      <label for="email">メールアドレス</label>
      <input type="email" v-model="email" required />
      <label for="password">パスワード</label>
      <input type="password" v-model="password" required />
      <button type="submit">サインイン</button>
      <p>アカウントがありませんか？<router-link to="/signup">新規作成はこちら</router-link></p>
    </form>
  </div>
</template>

<style lang="scss">
.main {
  width: 100%;
  max-width: 800px;
  min-height: calc(100svh - 48px);
  margin: 0 auto;
  padding: 10px;
  text-align: center;
  background: var(--color-back1);
  & h2 {
    padding: 10px;
  }
}

.form {
  border: 1px solid var(--color-text);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 16px;
  & label {
    display: block;
    padding: 10px;
    font-size: 18px;
  }
  & input {
    width: 100%;
    font-size: 16px;
    line-height: 200%;
    border: none;
    margin-bottom: 10px;
    background: var(--color-back0);
    color: var(--color-text);
  }
  & button {
    width: 100%;
    background: var(--color-button);
    margin: 20px 0;
    border: none;
    padding: 10px;
    color: var(--color-text);
    cursor: pointer;
    &:hover {
      background: var(--color-button-hover);
    }
  }
  & a {
    color: var(--color-text);
    text-decoration: underline;
  }

  &__image {
    background: var(--color-back0);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100px;
    & input[type='file'] {
      position: absolute;
      opacity: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    &__container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      z-index: 10;
      & button {
        width: auto;
      }
    }
  }
}
</style>
