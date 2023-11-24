import Link from 'next/link';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { VerticalFeatureRow } from '@/feature/VerticalFeatureRow';
import { Create } from '@/forms/Create';
import { Index } from '@/forms/Index';
import { Show } from '@/forms/Show';
import { Update } from '@/forms/Update';
import { Section } from '@/layout/Section';
import type { Employee } from '@/types/EmployeeType';

const VerticalFeatures = () => {
  const intl = useIntl();
  // <editor-fold desc="Trans">
  const messages = {
    section_title: intl.formatMessage({ id: 'section_title' }),
    general_description: intl.formatMessage({ id: 'general_description' }),
    feature_one_title: intl.formatMessage({ id: 'feature_one_title' }),
    feature_two_title: intl.formatMessage({ id: 'feature_two_title' }),
    feature_two_cs50: intl.formatMessage({ id: 'feature_two_cs50' }),
    feature_one_desc_cib: intl.formatMessage({ id: 'feature_one_desc_cib' }),
    form_development: intl.formatMessage({ id: 'form_development' }),
    form_bank_site: intl.formatMessage({ id: 'form_bank_site' }),
    form_quality: intl.formatMessage({ id: 'form_quality' }),
    create_employee: intl.formatMessage({ id: 'create_employee' }),
    edit_employee: intl.formatMessage({ id: 'edit_employee' }),
    filter_employees: intl.formatMessage({ id: 'filter_employees' }),
    created_by: intl.formatMessage({ id: 'created_by' }),
    docs: intl.formatMessage({ id: 'docs' }),
  };

  // </editor-fold >

  // <editor-fold desc="Form">
  const initialEmployee: Employee = {
    name: undefined,
    age: undefined,
    salary: undefined,
    experience: undefined,
    sex: '',
  };

  const [currentEmployee, setCurrentEmployee] =
    useState<Employee>(initialEmployee);

  const setEmployee = (employee: Employee): void => {
    setCurrentEmployee(employee);
  };
  // </editor-fold >

  return (
    <Section
      title={messages.section_title}
      description={messages.general_description}
    >
      <VerticalFeatureRow
        title={messages.feature_one_title}
        description={
          <>
            <ul className="ml-6 list-disc text-left">
              <li>
                {messages.feature_one_desc_cib}

                <div className="text-base">
                  <span>{messages.form_development}</span>
                  <div>
                    <Link
                      className="text-indigo-500 hover:underline"
                      href="https://cib.com.ua"
                      target="_blank"
                    >
                      {messages.form_bank_site},
                    </Link>
                    <Link
                      className="ml-1 text-indigo-500 hover:underline"
                      href="https://cib.com.ua"
                      target="_blank"
                    >
                      Prodajka,
                    </Link>
                    <Link
                      className="ml-1 text-indigo-500 hover:underline"
                      href="https://cib.com.ua"
                      target="_blank"
                    >
                      UkrPayments,
                    </Link>
                    <Link
                      className="ml-1 text-indigo-500 hover:underline"
                      href="https://app.swaggerhub.com/apis-docs/UKRPAYMENTSCOM_1/ukr-payments_api_ecom/1"
                      target="_blank"
                    >
                      {messages.docs}
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  className="text-indigo-500 hover:underline"
                  href="https://cloud.google.com/speech-to-text"
                  target="_blank"
                >
                  Google Speech Project
                </Link>

                <div className="text-base">{messages.form_quality}</div>
              </li>
              <li>
                WP Rock
                <div className="text-base">
                  {messages.form_development}
                  <Link
                    className="ml-1 text-indigo-500 hover:underline"
                    href="https://royaldi.com/"
                    target="_blank"
                  >
                    Royaldi
                  </Link>
                </div>
              </li>
            </ul>
          </>
        }
        form={Create}
        setEmployee={setEmployee}
        form_description={messages.create_employee}
      />

      <VerticalFeatureRow
        title={messages.feature_two_title}
        description={
          <>
            <ul className="ml-6 list-disc text-left">
              <li>
                Mate Academy
                <div className="text-base">
                  <div className="flex flex-col">
                    <Link
                      className="text-indigo-500 hover:underline"
                      href="https://mate.academy/courses/python"
                      target="_blank"
                    >
                      Python Developer (stand-by)
                    </Link>
                    <Link
                      className="text-indigo-500 hover:underline"
                      href="https://beetroot.academy/"
                      target="_blank"
                    >
                      Front-end Developer (04/22 - 09/22)
                    </Link>
                  </div>
                </div>
              </li>

              <li>
                Beetroot Academy
                <div className="text-base">
                  <div className="flex flex-col">
                    <Link
                      className="text-indigo-500 hover:underline"
                      href="https://beetroot.academy/"
                      target="_blank"
                    >
                      Front-End Developer (03/21 - 09/21)
                    </Link>
                    <Link
                      className="text-indigo-500 hover:underline"
                      href="https://beetroot.academy/"
                      target="_blank"
                    >
                      PHP (Laravel) Developer (09/19 - 02/20)
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                CS50
                <div className="text-base">
                  <div className="flex flex-col">
                    <Link
                      className="text-indigo-500 hover:underline"
                      href="https://prometheus.org.ua/course/course-v1:Prometheus+CS50+2019_T1"
                      target="_blank"
                    >
                      {messages.feature_two_cs50} (07/19 - 09/19)
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </>
        }
        form={currentEmployee.id ? Update : Show}
        currentEmployee={currentEmployee}
        setEmployee={setEmployee}
        form_description={messages.edit_employee}
        reverse
      />

      <VerticalFeatureRow
        title={messages.created_by}
        description={
          <>
            <ul className="ml-6 list-disc text-left text-base text-primary-500">
              <li className="">
                <Link href="https://www.digitalocean.com/">DigitalOcean</Link>
              </li>
              <li>
                <Link href="https://www.docker.com/">Docker</Link>
              </li>
              <li>
                <Link href="https://docs.docker.com/compose/">
                  Docker Compose
                </Link>
              </li>
              <li>
                <Link href="https://laravel.com/docs/10.x/releases">
                  Laravel 10
                </Link>
              </li>
              <li>
                <Link href="https://vercel.com/docs/">Vercel</Link>
              </li>
              <li>
                <Link href="https://nextjs.org/">Next.js</Link>
              </li>
              <li>
                <Link href="https://formatjs.io/docs/getting-started/installation/">
                  React&nbsp;Intl
                </Link>
              </li>
              <li>
                <Link href="https://www.typescriptlang.org/">TypeScript</Link>
              </li>
              <li>
                <Link href="https://tailwindcss.com/">Tailwind&nbsp;CSS</Link>
              </li>
            </ul>
          </>
        }
        form={Index}
        currentEmployee={currentEmployee}
        setEmployee={setEmployee}
        form_description={messages.filter_employees}
        reverse={false}
      />
    </Section>
  );
};

export { VerticalFeatures };
