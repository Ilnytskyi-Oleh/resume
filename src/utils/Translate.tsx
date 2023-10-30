import type React from 'react';
import { useIntl } from 'react-intl';

type Props = {
  index: string;
};

export const Translate: React.FC<Props> = ({ index = '' }) => {
  const intl = useIntl();

  if (!index) return '';

  return intl.formatMessage({ id: index });
};
