import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import router from './router'; // ルーターのインポート

const app = createApp(App);

app.use(router); // アプリケーションにルーターを統合

app.mount('#app');
