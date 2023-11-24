import 'react-json-pretty/themes/monikai.css';

import axios from 'axios';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { Loader } from '@/loader/Loader';
import TextField from '@/textfield/TextField';
import type { Employee } from '@/types/EmployeeType';

type Props = {
  setCurrent: (employee: Employee) => void;
  currentEmployee?: Employee;
};
export const Show = ({ setCurrent = () => {} }: Props) => {
  const intl = useIntl();

  // <editor-fold desc="Trans">
  const messages = {
    form_find_by_id: intl.formatMessage({ id: 'form_find_by_id' }),
    general_error: intl.formatMessage({ id: 'general_error' }),
    form_find: intl.formatMessage({ id: 'form_find' }),
    no_employee: intl.formatMessage({ id: 'no_employee' }),
  };
  // </editor-fold >

  const [status, setStatus] = useState<{ isLoading: boolean; error?: string }>({
    isLoading: false,
  });

  const [employeeId, setEmployeeId] = useState<string>('');
  const getEmployee = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ isLoading: true });

    if (!employeeId.trim()) {
      setStatus({ isLoading: false, error: 'Add ID' });

      return;
    }

    try {
      const res = await axios.get(`employees/${employeeId}`);
      alert(res);
      setCurrent(res.data.data);
    } catch (error: any) {
      alert(error);
      if (!error.response) {
        setStatus({ isLoading: false, error: messages.general_error });
        return;
      }
      setStatus({ isLoading: false, error: messages.no_employee });
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const onlyNumbers = inputText.replace(/[A-Za-zА-Яа-я]+/g, '');
    setEmployeeId(onlyNumbers);
  };

  return (
    <>
      <form onSubmit={getEmployee} action="" className="relative">
        <div className="">
          <TextField
            required
            value={employeeId}
            onChange={handleChangeInput}
            placeholder={messages.form_find_by_id}
            name="id"
            error={status?.error}
          />
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

        {status.isLoading && <Loader />}
      </form>
    </>
  );
};
