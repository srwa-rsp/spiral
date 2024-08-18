import React from "react";
import { Form, Formik } from "formik";
import FormikController from "@/components/formik/FormikController";
import Button from "@/components/Button/Button";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { UserLogin } from "@/types/interfaces/UserInterface";

const initialValues:UserLogin = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

const Login = () => {
  const router = useRouter();

  const onSubmit = async (values: UserLogin) => {
    try {
      const { email, password } = values;
      await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (err:any) {
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
                  Login
                </Button>
                <Button
                  type="button"
                  color="secondary"
                  className={"w-full rounded-lg  mt-2 "}
                  onClick={() => router.push("/auth/register")}
                >
                  Register
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
