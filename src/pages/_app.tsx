import '../styles/global.css';

import axios from 'axios';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import * as process from 'process';
import { IntlProvider } from 'react-intl';

import en from '../lang/en.json';
import uk from '../lang/uk.json';

const baseURL =
  process.env.NEXT_PUBLIC_APP_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_PROD_API
    : process.env.NEXT_PUBLIC_DEV_API;

const messages = {
  uk,
  en,
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter();
  axios.defaults.headers.common.locale = locale || 'en';
  axios.defaults.headers.common.Accept = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.baseURL = baseURL;

  return (
    // @ts-ignore
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Component {...pageProps} />
    </IntlProvider>
  );
};

export default appWithTranslation(MyApp);
