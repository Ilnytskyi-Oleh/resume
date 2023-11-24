import 'react-json-pretty/themes/monikai.css';

import axios from 'axios';
import type { ChangeEvent, FormEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import JSONPretty from 'react-json-pretty';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Loader } from '@/loader/Loader';
import TextField from '@/textfield/TextField';
import type { Employee } from '@/types/EmployeeType';
import type { ErrorsType } from '@/types/ErrorsType';

const MySwal = withReactContent(Swal);

type Props = {
  setCurrent?: (employee: Employee) => void;
  currentEmployee?: Employee;
};

const initialCurrent: Employee = {
  name: undefined,
  age: undefined,
  salary: undefined,
  experience: undefined,
  sex: undefined,
};

interface MyObject {
  [key: string]: any;
}

const isTheSameObj = (obj1: MyObject, obj2: MyObject): boolean => {
  const keys1 = Object.keys(obj1);

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

const initialErrorsState: ErrorsType = {
  name: [],
  age: [],
  salary: [],
  sex: [],
  experience: [],
  general: '',
};
export const Update = ({
  setCurrent = () => {},
  currentEmployee = initialCurrent,
}: Props) => {
  const intl = useIntl();

  // <editor-fold desc="Trans">
  const messages = {
    form_input_name: intl.formatMessage({ id: 'form_input_name' }),
    form_input_age: intl.formatMessage({ id: 'form_input_age' }),
    form_input_salary: intl.formatMessage({ id: 'form_input_salary' }),
    form_input_experience: intl.formatMessage({ id: 'form_input_experience' }),
    form_input_sex_m: intl.formatMessage({ id: 'form_input_sex_m' }),
    form_input_sex_f: intl.formatMessage({ id: 'form_input_sex_f' }),
    form_btn_update: intl.formatMessage({ id: 'form_btn_update' }),
    json_result: intl.formatMessage({ id: 'json_result' }),
    find_again: intl.formatMessage({ id: 'find_again' }),
    reset: intl.formatMessage({ id: 'reset' }),
    delete_btn: intl.formatMessage({ id: 'delete' }),
    confirm_update: intl.formatMessage({ id: 'confirm_update' }),
    confirm_delete: intl.formatMessage({ id: 'confirm_delete' }),
    cant_delete: intl.formatMessage({ id: 'cant_delete' }),
    yes: intl.formatMessage({ id: 'yes' }),
    went_wrong: intl.formatMessage({ id: 'went_wrong' }),
  };
  // </editor-fold >

  // <editor-fold desc="Form">
  const [isShowJson, setIsShowJson] = useState(true);
  const [deletedEmployee, setDeletedEmployee] = useState<JSON>();
  const [editedEmployee, setEditedEmployee] = useState(currentEmployee);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [errors, setErrors] = useState(initialErrorsState);

  useEffect(() => {
    setEditedEmployee(currentEmployee);
  }, [currentEmployee]);

  // </editor-fold>

  // <editor-fold desc="Handlers">
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedEmployee((prevState) => {
      const inputText = e.target.value;

      const onlyLettersAndSingleSpace = inputText
        .replace(/[^.A-Za-zА-Яа-я ]+/g, '')
        .replace('  ', ' ');

      return {
        ...prevState,
        name: onlyLettersAndSingleSpace,
      };
    });
  };

  const handleChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedEmployee((prevState) => {
      const inputText = e.target.value;

      const onlyNumbers = inputText.replace(/[A-Za-zА-Яа-я]+/g, '');

      return {
        ...prevState,
        age: +onlyNumbers,
      };
    });
  };

  const handleChangeSalary = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedEmployee((prevState) => {
      const inputText = e.target.value;

      const onlyNumbers = inputText.replace(/[A-Za-zА-Яа-я]+/g, '');

      return {
        ...prevState,
        salary: +onlyNumbers,
      };
    });
  };

  const handleChangeExperience = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedEmployee((prevState) => {
      const inputText = e.target.value;

      const onlyNumbers = inputText.replace(/[A-Za-zА-Яа-я]+/g, '');

      return {
        ...prevState,
        experience: +onlyNumbers,
      };
    });
  };

  const handleChangeSex = (e: ChangeEvent<HTMLSelectElement>) => {
    setEditedEmployee((prevState) => {
      return {
        ...prevState,
        sex: e.target.value,
      };
    });
  };

  const handleDeleteEmployee = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    MySwal.fire({
      title: messages.confirm_delete,
      showCancelButton: true,
      confirmButtonText: messages.yes,
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        axios
          .delete(`/employees/${editedEmployee.id}`)
          .then((res) => {
            setDeletedEmployee(res.data);
          })
          .catch(() => {
            setErrors((prev) => {
              return {
                ...prev,
                general: messages.cant_delete,
              };
            });
          })
          .finally(() => {
            setEditedEmployee(currentEmployee);
            setIsShowJson(true);
            setIsLoading(false);
          });
      }
    });
  };

  const handleUpdateEmployee = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    MySwal.fire({
      title: messages.confirm_update,
      showCancelButton: true,
      confirmButtonText: messages.yes,
    }).then((result) => {
      if (result.isConfirmed) {
        setErrors(initialErrorsState);
        setIsLoading(true);
        setIsEdited(false);

        axios
          .patch(`/employees/${editedEmployee.id}`, editedEmployee)
          .then((res) => {
            setCurrent(res.data.data);
            setIsEdited(true);
          })
          .catch((err) => {
            if (!err.response) {
              setErrors((prev) => {
                return {
                  ...prev,
                  general: messages.went_wrong,
                };
              });

              return;
            }

            setErrors((prev) => {
              return {
                ...prev,
                ...err.response.data.errors,
              };
            });
          })
          .finally(() => {
            setEditedEmployee(currentEmployee);
            setIsShowJson(true);
            setIsLoading(false);
          });
      }
    });
  };

  // </editor-fold>

  const resetForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditedEmployee(currentEmployee);
  };

  const hideJson = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsShowJson(false);
  };

  const closeIsDeleted = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setDeletedEmployee(undefined);
    setCurrent(initialCurrent);
  };

  return (
    <>
      <form
        onSubmit={handleUpdateEmployee}
        onReset={resetForm}
        action=""
        className="relative"
      >
        <div className="">
          <TextField
            value={editedEmployee.name}
            onChange={handleChangeName}
            placeholder={messages.form_input_name}
            name="name"
            required={false}
            error={errors.name[0]}
          />
        </div>

        <div>
          <TextField
            value={editedEmployee.age}
            onChange={handleChangeAge}
            placeholder={messages.form_input_age}
            name="age"
            required={false}
            error={errors.age[0]}
          />
        </div>

        <div>
          <TextField
            value={editedEmployee.salary}
            onChange={handleChangeSalary}
            placeholder={messages.form_input_salary}
            name="salary"
            required={false}
            error={errors.salary[0]}
          />
        </div>

        <div>
          <TextField
            value={editedEmployee.experience}
            onChange={handleChangeExperience}
            placeholder={messages.form_input_experience}
            name="experience"
            required={false}
            error={errors?.experience[0]}
          />
        </div>

        <div>
          <select
            name="sex"
            value={editedEmployee.sex}
            onChange={handleChangeSex}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="m">{messages.form_input_sex_m}</option>
            <option value="f">{messages.form_input_sex_f}</option>
          </select>
          <div className="relative bottom-2 ml-3 h-5 text-left text-sm font-light  text-amber-700">
            {errors.sex[0] || ''}
          </div>
        </div>
        {errors.general && (
          <div className="relative bottom-2 ml-3 h-5 text-left text-sm font-light  text-amber-700">
            {errors.general}
          </div>
        )}
        <div className="mt-5  flex flex-wrap gap-x-5 gap-y-2">
          {!isTheSameObj(currentEmployee, editedEmployee) && (
            <button
              type="reset"
              className="inline-block rounded-md bg-amber-500 px-2 text-center text-base font-semibold text-white hover:bg-amber-600"
            >
              {messages.reset}
            </button>
          )}

          <button
            type="button"
            onClick={handleDeleteEmployee}
            className="inline-block rounded-md bg-amber-700 px-2 text-center text-base font-semibold text-white first-letter:uppercase hover:bg-amber-900"
          >
            {messages.delete_btn}
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrent(initialCurrent);
            }}
            className="inline-block rounded-md bg-yellow-300 px-2 text-center  text-base font-semibold hover:bg-yellow-400"
          >
            {messages.find_again}
          </button>

          {!isTheSameObj(currentEmployee, editedEmployee) && (
            <button
              type="submit"
              className="inline-block rounded-md bg-primary-500 px-2 text-center text-base font-semibold text-white hover:bg-primary-600 lg:ml-auto"
            >
              {messages.form_btn_update}
            </button>
          )}
        </div>

        {/* Loader */}

        {isLoading && <Loader />}

        {/* JSON Pretty */}

        {isEdited && isShowJson && (
          <div className="absolute inset-0 overflow-scroll rounded-lg bg-[#272822] p-3 pt-0 text-left">
            <div className="sticky top-0 flex bg-[#272822] pt-3 font-mono text-base text-gray-50">
              {messages.json_result}:
              <button onClick={hideJson} className="ml-auto mr-2 px-3">
                x
              </button>
            </div>
            <JSONPretty id="json-pretty" data={currentEmployee}></JSONPretty>
          </div>
        )}

        {deletedEmployee && (
          <div className="absolute inset-0 overflow-scroll rounded-lg bg-[#272822] p-3 text-left">
            <div className="flex font-mono text-base text-gray-50">
              {messages.json_result}:
              <button onClick={closeIsDeleted} className="ml-auto mr-2 px-3">
                x
              </button>
            </div>
            <JSONPretty id="json-pretty" data={deletedEmployee}></JSONPretty>
          </div>
        )}
      </form>
    </>
  );
};
