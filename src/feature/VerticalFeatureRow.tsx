import className from 'classnames';
import type { ReactComponentLike } from 'prop-types';
import type { ReactNode } from 'react';

import type { Employee } from '@/types/EmployeeType';

type IVerticalFeatureRowProps = {
  title: string;
  description: string | ReactNode;
  form: ReactComponentLike;
  form_description?: string;
  currentEmployee?: Employee;
  reverse?: boolean;
  setEmployee?: (employee: Employee) => void;
};

const VerticalFeatureRow = (props: IVerticalFeatureRowProps) => {
  const verticalFeatureClass = className(
    'mt-20',
    'flex',
    'flex-wrap',
    'items-stretch',
    {
      'flex-row-reverse': props.reverse,
    },
  );

  return (
    <div className={verticalFeatureClass}>
      <div className="w-full sm:w-1/2 sm:px-6 ">
        <h3 className="text-center text-3xl font-semibold text-gray-900">
          {props.title}
        </h3>
        <div className="mt-6 text-xl leading-9 sm:text-center">
          {props.description}
        </div>
      </div>

      <div className="w-full pt-5 sm:w-1/2 sm:px-6 sm:pt-0">
        <div className="text-center text-3xl font-semibold text-gray-900">
          {props.form_description}
        </div>
        <div className="mt-6 text-xl leading-9 sm:text-center">
          <props.form
            setCurrent={props.setEmployee}
            currentEmployee={props.currentEmployee}
          />
        </div>
      </div>
    </div>
  );
};

export { VerticalFeatureRow };
