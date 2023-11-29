import 'react-json-pretty/themes/monikai.css';

import axios from 'axios';
import type { ChangeEvent, FormEvent } from 'react';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import JSONPretty from 'react-json-pretty';

import { Loader } from '@/loader/Loader';
import TextField from '@/textfield/TextField';
import type { Employee } from '@/types/EmployeeType';
import {
  getOnlyLettersAndSingleSpace,
  getOnlyNumbers,
} from '@/utils/formatter';

type Props = {
  setCurrent?: (employee: Employee) => void;
  currentEmployee?: Employee;
};
export const Create = ({ setCurrent = () => {} }: Props) => {
  const intl = useIntl();

  // <editor-fold desc="Trans">
  const messages = {
    form_input_name: intl.formatMessage({ id: 'form_input_name' }),
    form_input_age: intl.formatMessage({ id: 'form_input_age' }),
    form_input_salary: intl.formatMessage({ id: 'form_input_salary' }),
    form_input_experience: intl.formatMessage({ id: 'form_input_experience' }),
    form_input_sex: intl.formatMessage({ id: 'form_input_sex' }),
    form_input_sex_m: intl.formatMessage({ id: 'form_input_sex_m' }),
    form_input_sex_f: intl.formatMessage({ id: 'form_input_sex_f' }),
    form_btn_create: intl.formatMessage({ id: 'form_btn_create' }),
    json_result: intl.formatMessage({ id: 'json_result' }),
    reset_btn: intl.formatMessage({ id: 'reset' }),
  };

  // </editor-fold >
  // <editor-fold desc="Form">
  const initialEmployee: Employee = {
    name: '',
    age: undefined,
    salary: undefined,
    experience: undefined,
    sex: '',
  };

  const [newEmployee, setNewEmployee] = useState<Employee>(initialEmployee);
  const [createdEmployee, setCreatedEmployee] = useState<Employee>();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowJson, setIsShowJson] = useState(true);
  const initialErrorsState = {
    name: [],
    age: [],
    salary: [],
    sex: [],
    experience: [],
    general: '',
  };
  const [errors, setErrors] = useState(initialErrorsState);
  // </editor-fold>

  // <editor-fold desc="Handlers">
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEmployee((prevState) => {
      return {
        ...prevState,
        name: getOnlyLettersAndSingleSpace(e.target.value),
      };
    });
  };

  const hideJson = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsShowJson(false);
  };
  const handleChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEmployee((prevState) => {
      return {
        ...prevState,
        age: +getOnlyNumbers(e.target.value),
      };
    });
  };

  const handleChangeSalary = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEmployee((prevState) => {
      return {
        ...prevState,
        salary: +getOnlyNumbers(e.target.value),
      };
    });
  };

  const handleChangeExperience = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEmployee((prevState) => {
      return {
        ...prevState,
        experience: +getOnlyNumbers(e.target.value),
      };
    });
  };

  const handleChangeSex = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewEmployee((prevState) => {
      return {
        ...prevState,
        sex: e.target.value,
      };
    });
  };

  // </editor-fold>

  const storeEmployee = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(initialErrorsState);
    setIsLoading(true);

    try {
      const res = await axios.post('/employees', newEmployee);
      setCreatedEmployee(res.data.data);
      setCurrent(res.data.data);
      setNewEmployee(initialEmployee);
    } catch (err: any) {
      if (!err?.response) {
        setErrors((prev) => ({ ...prev, general: 'Smp went wrong' }));
      } else {
        setErrors((prev) => ({ ...prev, ...err.response.data.errors }));
      }
    } finally {
      setIsLoading(false);
      setIsShowJson(true);
    }
  };

  const resetForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewEmployee(initialEmployee);
  };

  return (
    <>
      <form
        onSubmit={storeEmployee}
        onReset={resetForm}
        action=""
        className="relative"
      >
        <div className="">
          <TextField
            value={newEmployee.name}
            onChange={handleChangeName}
            placeholder={messages.form_input_name}
            name="name"
            required
            error={errors.name[0]}
          />
        </div>

        <div>
          <TextField
            value={newEmployee.age}
            onChange={handleChangeAge}
            placeholder={messages.form_input_age}
            name="age"
            error={errors.age[0]}
            required
          />
        </div>

        <div>
          <TextField
            value={newEmployee.salary}
            onChange={handleChangeSalary}
            placeholder={messages.form_input_salary}
            name="salary"
            error={errors.salary[0]}
            required
          />
        </div>

        <div>
          <TextField
            value={newEmployee.experience}
            onChange={handleChangeExperience}
            placeholder={messages.form_input_experience}
            name="experience"
            error={errors.experience[0]}
          />
        </div>

        <div>
          <select
            name="sex"
            required
            defaultValue=""
            onChange={handleChangeSex}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="" disabled>
              {messages.form_input_sex}
            </option>
            <option value="m">{messages.form_input_sex_m}</option>
            <option value="f">{messages.form_input_sex_f}</option>
          </select>
          <div className="relative bottom-2 ml-3 h-5 text-left text-sm font-light  text-amber-700">
            {errors?.sex[0] || ''}
          </div>
        </div>

        <div className="mt-5 flex">
          {errors?.general && (
            <div className="relative bottom-2 ml-3 h-5 text-left text-sm font-light  text-amber-700">
              {errors?.general}
            </div>
          )}

          <button
            type="submit"
            className="ml-auto inline-block rounded-md bg-primary-500 px-2 text-center  text-base font-semibold text-white hover:bg-primary-600"
          >
            {messages.form_btn_create}
          </button>

          <button
            type="reset"
            className="ml-5 inline-block rounded-md bg-amber-500 px-2 text-center  text-base font-semibold text-white hover:bg-amber-600"
          >
            {messages.reset_btn}
          </button>
        </div>

        {/* Loader */}

        {isLoading && <Loader />}

        {/* JSON Pretty */}

        {createdEmployee && isShowJson && (
          <div className="absolute inset-0 overflow-scroll rounded-lg bg-[#272822] p-3 pt-0 text-left">
            <div className="sticky top-0 flex bg-[#272822] pt-3 font-mono text-base text-gray-50">
              {messages.json_result}:
              <button onClick={hideJson} className="ml-auto mr-2 px-3">
                x
              </button>
            </div>
            <JSONPretty id="json-pretty" data={createdEmployee}></JSONPretty>
          </div>
        )}
      </form>
    </>
  );
};
