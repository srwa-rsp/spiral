import React from 'react';
import { Field, useFormikContext } from 'formik';
import clsx from 'clsx';

function Select(props: any) {
  const { label, name, options, className, ...rest }: any = props;
  const formik = useFormikContext<any>();
  const { error, touched } = formik.getFieldMeta(name);
  return (
    <Field
      as="select"
      id={name}
      name={name}
      onChange={(e: any) => {
        if (e.target.value === 'true' || e.target.value === 'false')
          formik.setFieldValue(name, JSON.parse(e.target.value));
        else formik.setFieldValue(name, e.target.value);
      }}
      {...rest}
      className={clsx(
        'text-black w-full h-[5rem] rounded-2xl border border-1  p-6',
        className ? className : '',
        (touched && error) ? 'border-red-middle focus:border-red-middle' : 'border-gray-500'
      )}>
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.key}
        </option>
      ))}
    </Field>
  );
}

export default Select;
