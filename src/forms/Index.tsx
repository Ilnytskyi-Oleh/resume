import 'react-json-pretty/themes/monikai.css';

import axios from 'axios';
import type { ChangeEvent, FormEvent } from 'react';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import JSONPretty from 'react-json-pretty';

import { Loader } from '@/loader/Loader';
import TextField from '@/textfield/TextField';
import type { FilterParamsType } from '@/types/FilterParamsType';
import {
  getOnlyLettersAndSingleSpace,
  getOnlyNumbers,
} from '@/utils/formatter';

const initFilterParams: FilterParamsType = {
  name: '',
  sex: '',
  salary: {
    min: 0,
    max: 10000,
  },
  age: {
    min: 18,
    max: 150,
  },
  page: 1,
  perPage: 5,
};

function getParam(inputString: string): string | null {
  const match = inputString.match(/\[(.*?)]/);

  return match ? (match[1] as string) : null;
}

const initialErrorsState = {
  name: [],
  age: [],
  salary: [],
  sex: [],
  experience: [],
  page: [],
  perPage: [],
  general: '',
};

const buildUrlWithFilters = (filterParams: FilterParamsType): string => {
  const baseUrl = 'employees';
  const queryParams = [
    `name=${encodeURIComponent(filterParams.name)}`,
    `sex=${encodeURIComponent(filterParams.sex)}`,
    `age[min]=${filterParams.age.min}`,
    `age[max]=${filterParams.age.max}`,
    `salary[min]=${filterParams.salary.min}`,
    `salary[max]=${filterParams.salary.max}`,
    `page=${filterParams.page}`,
    `perPage=${filterParams.perPage}`,
  ];

  return `${baseUrl}?${queryParams.join('&')}`;
};

export const Index = () => {
  const intl = useIntl();

  // <editor-fold desc="Trans">
  const messages = {
    json_result: intl.formatMessage({ id: 'json_result' }),
    form_input_name: intl.formatMessage({ id: 'form_input_name' }),
    form_input_sex: intl.formatMessage({ id: 'form_input_sex' }),
    form_input_sex_m: intl.formatMessage({ id: 'form_input_sex_m' }),
    form_input_sex_f: intl.formatMessage({ id: 'form_input_sex_f' }),
    form_input_age: intl.formatMessage({ id: 'form_input_age' }),
    form_input_salary: intl.formatMessage({ id: 'form_input_salary' }),
    form_find: intl.formatMessage({ id: 'form_find' }),
    per_page: intl.formatMessage({ id: 'per_page' }),
    current_page: intl.formatMessage({ id: 'current_page' }),
  };

  // </editor-fold >

  const [isShowJson, setIsShowJson] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(initialErrorsState);
  const [filteredEmployees, setFilteredEmployees] = useState<JSON>();
  const [filterParams, setFilterParams] = useState(initFilterParams);
  const getEmployees = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(initialErrorsState);
    setIsLoading(true);
    setFilteredEmployees(undefined);

    const urlWithFilters = buildUrlWithFilters(filterParams);

    axios
      .get(urlWithFilters)
      .then((res) => {
        setFilteredEmployees(res.data);
      })
      .catch((res) => {
        if (!res.response) {
          setErrors((prevState) => {
            return {
              ...prevState,
              general: res.message,
            };
          });

          return;
        }

        setErrors((prev) => {
          return {
            ...prev,
            ...res.response.data.errors,
          };
        });
      })
      .finally(() => {
        setIsLoading(false);
        setIsShowJson(true);
      });
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterParams((prevState) => {
      return {
        ...prevState,
        name: getOnlyLettersAndSingleSpace(e.target.value),
      };
    });
  };

  const handleChangeSex = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterParams((prevState) => {
      return {
        ...prevState,
        sex: e.target.value,
      };
    });
  };

  const handleChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param: string | null = getParam(e.target.name);

    if (!param) return;

    setFilterParams((prevState) => {
      return {
        ...prevState,
        age: { ...prevState.age, [param]: +e.target.value },
      };
    });
  };

  const handleChangeSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param: string | null = getParam(e.target.name);

    if (!param) return;

    setFilterParams((prevState) => {
      return {
        ...prevState,
        salary: { ...prevState.salary, [param]: +e.target.value },
      };
    });
  };

  const handleChangePerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParams((prevState) => {
      return {
        ...prevState,
        perPage: +getOnlyNumbers(e.target.value),
      };
    });
  };

  const handleChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParams((prevState) => {
      return {
        ...prevState,
        page: +getOnlyNumbers(e.target.value),
      };
    });
  };
  const hideJson = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsShowJson(false);
  };

  return (
    <>
      <form onSubmit={getEmployees} action="" className="relative">
        <div>
          <TextField
            value={filterParams.name}
            onChange={handleChangeName}
            placeholder={messages.form_input_name}
            name="name"
            required={false}
            error={errors.name[0]}
          />
        </div>

        <div>
          <select
            name="sex"
            defaultValue="def"
            onChange={handleChangeSex}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="def" disabled>
              {messages.form_input_sex}
            </option>
            <option value="m">{messages.form_input_sex_m}</option>
            <option value="f">{messages.form_input_sex_f}</option>
          </select>
          <div className="relative bottom-2 ml-3 h-5 text-left text-sm font-light  text-amber-700">
            {errors.sex[0] || ''}
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <div className="text-base">{messages.form_input_age}:</div>
            <div className="ml-auto flex w-8/12 items-center">
              <div className="">
                <input
                  name="age[min]"
                  type="text"
                  value={filterParams.age.min}
                  onChange={handleChangeAge}
                  placeholder={messages.form_input_name}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="px-2">-</div>
              <div>
                <input
                  name="age[max]"
                  type="text"
                  value={filterParams.age.max}
                  onChange={handleChangeAge}
                  placeholder={messages.form_input_name}
                  className=" block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>
          <div className="relative bottom-2 ml-3 h-5 text-left text-sm font-light text-amber-700">
            {errors.age[0] || ''}
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <div className="mr-1 text-base">{messages.form_input_salary}:</div>
            <div className="ml-auto flex w-8/12 items-center">
              <div>
                <input
                  name="salary[min]"
                  type="text"
                  value={filterParams.salary.min}
                  onChange={handleChangeSalary}
                  placeholder={messages.form_input_name}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="px-2">-</div>
              <div>
                <input
                  name="salary[max]"
                  type="text"
                  value={filterParams.salary.max}
                  onChange={handleChangeSalary}
                  placeholder={messages.form_input_name}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>
          <div className="relative bottom-2 ml-3 h-5 text-left text-sm font-light text-amber-700">
            {errors.salary[0] || ''}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="w-1/2 text-left text-base">{messages.per_page}:</div>
          <div>
            <input
              name="perPage"
              type="text"
              value={filterParams.perPage}
              onChange={handleChangePerPage}
              placeholder={messages.per_page}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="relative bottom-2 ml-3 h-5 text-left text-sm font-light text-amber-700">
          {errors.perPage[0] || ''}
        </div>

        <div className="flex items-center ">
          <div className="w-1/2 text-left text-base">
            {messages.current_page}:
          </div>
          <div>
            <input
              name="page"
              type="text"
              value={filterParams.page}
              onChange={handleChangePage}
              placeholder={messages.current_page}
              className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="relative bottom-2 ml-3 h-5 text-left text-sm font-light  text-amber-700">
          {errors.page[0] || ''}
        </div>

        <div className="mt-5 flex">
          <button
            type="submit"
            className="ml-auto inline-block rounded-md bg-primary-500 px-3 py-1 text-center text-lg font-semibold text-white hover:bg-primary-600"
          >
            {messages.form_find}
          </button>
        </div>

        {/* Loader */}

        {isLoading && <Loader />}

        {/* JSON Pretty */}

        {filteredEmployees && isShowJson && (
          <div className="absolute inset-0 overflow-scroll rounded-lg bg-[#272822] p-3 pt-0 text-left">
            <div className="sticky top-0 flex bg-[#272822] pt-3 font-mono text-base text-gray-50">
              {messages.json_result}:
              <button onClick={hideJson} className="ml-auto mr-2 px-3 ">
                x
              </button>
            </div>
            <JSONPretty id="json-pretty" data={filteredEmployees}></JSONPretty>
          </div>
        )}
      </form>
    </>
  );
};
