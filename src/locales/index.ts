import i18next from 'i18next';
import en from '@/locales/en_US/translation.json';

const resources = {
  en
};

const initI18Next = async () => {
  await i18next.init({
    lng: 'en',
    debug: true,
    resources
  });
  return {
    install: (app: any) => {
      app.config.globalProperties.$t = (key: string) => i18next.t(key);
    }
  };
};

export default initI18Next;
