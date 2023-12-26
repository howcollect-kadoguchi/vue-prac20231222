<template>
  <div>
    <h2>書籍リスト</h2>
    <ul class="container">
      <BookItem v-for="item in items" :key="item.id" :item="item" />
    </ul>
  </div>
  <div className="pageScroll">
    <button @click="page--" :disabled="page === 0">Previous Page</button>
    <span>{{ page + 1 }}</span>
    <button @click="page++" :disabled="items.length < 10">Next Page</button>
  </div>
</template>

<script setup lang="ts">
import BookItem from './BookItem.vue';
import { ref, onMounted, watchEffect } from 'vue';
import { getBookList } from '../../services/Home/BookList';

const items = ref([]);
const page: number = ref(0);

onMounted(async () => {
  try {
    items.value = await getBookList(page.value * 10);
  } catch (error) {
    // エラーハンドリング
    console.error('データの取得に失敗しました:', error);
  }
});

watchEffect(async () => {
  try {
    items.value = await getBookList(page.value * 10);
  } catch (error) {
    // エラーハンドリング
    console.error('データの取得に失敗しました:', error);
  }
});
</script>

<style lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: center;
}

.item {
  width: calc(100% / 4 - 20px);
  box-shadow: 0 0 2px var(--color-text);
  padding: 10px;
  margin: 10px;
  & p {
    font-size: 14px;
  }
  &__title {
    font-size: 18px;
    font-weight: bold;
  }
  &__detail {
    font-size: 14px;
  }
  &__review {
    display: flex;
    background: var(--color-back0);
    &__left {
      width: 45px;
      height: calc(30px + 12px);
      display: flex;
      flex-flow: column;
      align-items: center;
      & img {
        width: 30px;
        height: 30px;
        @media screen and (prefers-color-scheme: 'dark') {
          filter: invert(1);
        }
      }
      & > p {
        font-size: 10px;
        line-height: 12px;
      }
    }
    & > p {
      font-size: 14px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .item {
    width: calc(100% / 3 - 20px);
  }
}
@media screen and (max-width: 800px) {
  .item {
    width: calc(50% - 20px);
  }
}

@media screen and (max-width: 500px) {
  .item {
    width: 100%;
  }
}

.pageScroll {
  display: flex;
  justify-content: center;
  & * {
    padding: 10px;
    margin: 10px;
    list-style: none;
    border: none;
    background: var(--color-back0);
  }

  & button {
    cursor: pointer;
    &:disabled {
      cursor: default;
    }
  }
}
</style>
