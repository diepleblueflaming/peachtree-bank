import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18nInit from '@/locales/index';

(async () => {
  const i18n = await i18nInit();
  createApp(App).
    use(store).
    use(router).
    use(i18n).
    mount('#app');
})();
