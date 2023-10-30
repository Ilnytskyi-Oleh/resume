import '../styles/global.css';

import axios from 'axios';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import { IntlProvider } from 'react-intl';

import en from '../lang/en.json';
import uk from '../lang/uk.json';

const messages = {
  uk,
  en,
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter();
  axios.defaults.headers.common.locale = locale || 'en';

  return (
    // @ts-ignore
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Component {...pageProps} />
    </IntlProvider>
  );
};

export default appWithTranslation(MyApp);
