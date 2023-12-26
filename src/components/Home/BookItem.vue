<template>
  <li class="item">
    <h3 class="item__title">{{ item.title }}</h3>
    <p class="item__detail">{{ item.detail }}</p>
    <div class="item__review">
      <div class="item__review__left">
        <img src="/images/kkrn_icon_user_13.png" alt="ユーザアイコン" />
        <p>{{ item.reviewer }}</p>
        <p>{{ item.review }}</p>
      </div>
    </div>
    <p>
      <a :href="item.url" target="_blank">書籍リンクはこちら</a>自分：{{
        item.isMine ? 'はい' : 'いいえ'
      }}
    </p>
  </li>
</template>

<script lang="ts">
export default {
  props: ['item'],
};
</script>
