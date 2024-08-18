import React from "react";
import { Form, Formik } from "formik";
import FormikController from "@/components/formik/FormikController";
import Button from "@/components/Button/Button";
import * as Yup from "yup";
import { useRegisterUser } from "@/utils/services";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
  name: Yup.string().required(),
});


const Register = () => {
  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      const response = await useRegisterUser(values);
      toast.success(response.message)
      router.push('/auth/login')
    } catch (err) {
      toast.error(err);
    }
  };
  

  return (
    <div className="flex justify-start gap-40 px-6 ">
      <div className="p-10 border-2 border-gray-200 rounded-lg">
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
