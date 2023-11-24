import axios from 'axios';
import Link from 'next/link';
import type { MouseEvent } from 'react';

import { Background } from '@/background/Background';
import { Button } from '@/button/Button';
import { HeroOneButton } from '@/hero/HeroOneButton';
import { Section } from '@/layout/Section';
import { NavbarTwoColumns } from '@/navigation/NavbarTwoColumns';
import { Translate } from '@/utils/Translate';

import UkraineFlag from '../img/flags/ukraine.svg';
import BritishFlag from '../img/flags/united-kingdom-flag-icon.svg';
import { Logo } from './Logo';

const download = async (e: MouseEvent) => {
  e.preventDefault();

  try {
    const downloadLink = `${window.location.origin}/docs/Oleh_Ilnytskyi.pdf`;
    axios({
      url: downloadLink,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Oleh_Ilnytskyi.pdf');
      document.body.appendChild(link);
      link.click();
    });
  } catch (err) {
    // console.error(err);
  }
};

const Hero = () => {
  return (
    <Background color="bg-gray-100">
      <div className="sticky top-0 bg-gray-100">
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
      </div>

      <Section yPadding="pt-20 pb-32">
        <HeroOneButton
          title={
            <>
              <Translate index={'title'} />
              <br />
              <span className="text-primary-500">
                <Translate index={'job_title'} />
              </span>
            </>
          }
          description={
            <>
              <Translate index={'easiest_way'} />
            </>
          }
          button={
            <Link href="#" onClick={download}>
              <Button xl>
                <Translate index={'download_cv'} />
              </Button>
            </Link>
          }
        />
      </Section>
    </Background>
  );
};

export { Hero };
