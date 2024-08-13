import React from "react";
import { Form, Formik } from "formik";
import FormikController from "@/components/formik/FormikController";
import Button from "@/components/Button/Button";
import * as Yup from "yup";
import { ApiResponse, User } from "@/types/apiTypes";
import { useLoginUser } from "@/utils/services";
import { toast } from "react-toastify";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/router";



const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required().email(),
      password: Yup.string().required(),
  });



const Login = () => {

  const router = useRouter();
  const onSubmit = async (values:any) => {
    try {
      const {email,password} = values;
      await signIn('credentials', {
        redirect: false,
        email,
       password,
       callbackUrl: '/',
      });
      router.push('/');
    } catch (err) {
      toast.error(`Error!`);
    }
  };
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

export default Login;
