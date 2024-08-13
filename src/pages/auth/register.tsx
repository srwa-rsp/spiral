import React from "react";
import { Form, Formik } from "formik";
import FormikController from "@/components/formik/FormikController";
import Button from "@/components/Button/Button";
import * as Yup from "yup";
import { useRegisterUser } from "@/utils/services";
import { User, ApiResponse } from "@/types/apiTypes";
import { toast } from "react-toastify";

const initialValues: User = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
  name: Yup.string().required(),
});

const onSubmit = async (values: User) => {
  try {
    const response: ApiResponse<User> = await useRegisterUser(values);
    // toast.success("Success!")
    console.log(response);
  } catch (err) {
    toast.error(`Error!`);
  }
};

const Register = () => {
  return (
    <div className="flex justify-between px-6">
      <div className="">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props: any) => {
            const { setFieldValue, setValue, resetForm, values } = props;
            return (
              <Form autoComplete="off">
                <FormikController
                  control={`input`}
                  name={"name"}
                  label={"name"}
                  type="input"
                />
                <FormikController
                  control={`input`}
                  name={"email"}
                  label={"email"}
                  type="email"
                />
                <FormikController
                  control={`input`}
                  name={"password"}
                  label={"password"}
                  type="password"
                />
                <Button
                  type="submit"
                  color="primary"
                  className={"w-full rounded-lg  mt-32 "}
                >
                  submit{" "}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div>image</div>
    </div>
  );
};

export default Register;
