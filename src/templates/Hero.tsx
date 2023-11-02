import axios from 'axios';
import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useIntl } from 'react-intl';

import { Background } from '@/background/Background';
import { Button } from '@/button/Button';
import { HeroOneButton } from '@/hero/HeroOneButton';
import { Section } from '@/layout/Section';
import { NavbarTwoColumns } from '@/navigation/NavbarTwoColumns';
import { Translate } from '@/utils/Translate';

import UkraineFlag from '../img/flags/ukraine.svg';
import BritishFlag from '../img/flags/united-kingdom-flag-icon.svg';
import { Logo } from './Logo';

const fireAxios = async (e: MouseEvent) => {
  e.preventDefault();
  try {
    const downloadLink = `${window.location.origin}/docs/sample.pdf`;
    axios({
      url: downloadLink,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      document.body.appendChild(link);
      link.click();
    });
  } catch (err) {
    // console.error(err);
  }

  axios.get('/docs/sample.pdf').then((res) => res);
  // axios.post('http://localhost/api/v1/employees/')
  //     .then(res => {
  //         console.log(res)
  //     })
  //     .catch(err => {
  //         console.log(err.response.data.errors)
  //     })
};

const getEmployees = (e: MouseEvent) => {
  e.preventDefault();
  axios.get('http://24.199.125.197/api/v1/employees/').then((res) => {
    console.log(res);
  });
};

const Hero = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'title' });

  return (
    <Background color="bg-gray-100">
      <Section yPadding="py-6">
        <NavbarTwoColumns logo={<Logo xl />}>
          <li>
            <Link className="inline-block w-8" href="/" locale="uk">
              <UkraineFlag />
            </Link>
          </li>
          <li>
            <Link className="inline-block w-8" href="/" locale="en">
              <BritishFlag />
            </Link>
          </li>
        </NavbarTwoColumns>
      </Section>

      <Section yPadding="pt-20 pb-32">
        <HeroOneButton
          title={
            <>
              {`${title}\n`}
              <span className="text-primary-500">
                <Translate index={'job_title'} />
              </span>
            </>
          }
          description="The easiest way to build a React landing page in seconds."
          button={
            <Link href="#" onClick={fireAxios}>
              <Button xl>Download CV</Button>
            </Link>
          }
        />
        <Link href="#" onClick={getEmployees}>
          <Button xl>Get Employees</Button>
        </Link>
      </Section>
    </Background>
  );
};

export { Hero };
