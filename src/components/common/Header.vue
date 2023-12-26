<template>
  <header class="header">
    <h1 class="header__title">書籍レビューアプリ</h1>
    <div class="header__right">
      <form @submit.prevent="buttonClick">
        <p>{{ user.name }}さん</p>
        <button class="sign-out-button" id="signout">
          {{ auth ? 'サインアウト' : 'サインイン' }}
        </button>
      </form>
      <img :src="user.iconUrl" alt="アイコン画像" />
    </div>
  </header>
</template>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  background: var(--color-theme);
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  &__title {
    color: var(--color-title);
  }
  &__right {
    display: flex;
    & > form {
      width: 120px;
      text-align: center;
      // display: flex;
      color: var(--color-title);
      // overflow: hidden;
      & p {
        height: 24px;
      }
      & button {
        height: 24px;
        text-align: center;
        width: 100%;
        color: var(--color-title);
        display: block;
        background: none;
        border: none;
        cursor: pointer;
        &:hover {
          background: var(--color-button-hover);
        }
      }
    }
    & img {
      width: 48px;
      height: 48px;
    }
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchGetUserData } from '../../services/Home/Header';
import VueCookies from 'vue-cookies';

const router = useRouter();

const guestData = { name: 'ゲスト', iconUrl: '/images/kkrn_icon_user_13.png' };
const user = ref(guestData);
const auth = ref(false);

const cookies = VueCookies;

const setUser = (data: any) => {
  user.value = data;
  auth.value = true;
};
const remove = () => {
  cookies.remove('token');
  auth.value = false;
  user.value = guestData;
};
const setErrorMessage = (message: string) => {
  console.error(message);
};

onMounted(async () => {
  try {
    const token = cookies.get('token');
    if (!token || token === '') return;
    await fetchGetUserData(cookies.get('token'), setUser, remove, setErrorMessage);
  } catch (error) {
    // エラーハンドリング
    console.error('データの取得に失敗しました:', error);
  }
});

const buttonClick = () => {
  if (auth.value) {
    remove();
  } else {
    router.push('/login');
  }
};
</script>
