import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup"
import React from "react";

function LoginForm() {
  const initialValues = {
    email: "",
    password: "",
  };


  const validationSchema = Yup.object({
    email: Yup.string().required("email is requred").email("Invalid email address"),
    password: Yup.string().required("password is requred").min(6,"password must be least 6 character")
  });

  const handleSubmith = async (values , {setSubmit , setErorr})
 
  return (
    <div>
      <Formik initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={}>
        <Form>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" />
          </div>
          <div>
            <label htmlFor="password">Passwoord</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" />
          </div>
          <div>
            <button type="submit">Set</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
