import clsx from "clsx";
import { Field, useFormikContext } from "formik";

function Input({ name, placeHolder, className,type, ...rest }: any) {
  const formik = useFormikContext();
  const { error, touched, value } = formik.getFieldMeta(name);
  return (
    <Field
      name={name}
      id={name}
      type={type}
      value={value ? value : ""}
      onChange={(e: any) => {
        formik.setFieldValue(name, e.target.value);
        if (rest.onChange) rest.onChange(e);
      }}
      onClick={(e: any) => {
        if (rest.type !== "number") {
          const end = e.target.value.length;
          // e.target.setSelectionRange(end, end);
          e.target.focus();
        }
        rest.onClick && rest.onClick(e);
      }}
      placeholder={placeHolder ? placeHolder : " "}
      className={clsx(
        "text-enable w-full h-[3rem] rounded-lg border  p-6 text-center block focus:outline-none focus:ring-0 focus:border-gray-300 peer",
        className ? className : "",
        touched && error
          ? "border-red-500 focus:border-red-500"
          : "border-gray-300"
      )}
    />
  );
}
export default Input;
