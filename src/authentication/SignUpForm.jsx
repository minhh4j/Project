import axios from "axios";
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

function Signupdup() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
  };
  const onSubmit = async (values) => {
    if (values.password !== values.cpassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3008/user", values);
      console.log("Successfully submitted", response.data);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("name is requred"),
    email: Yup.string().required("email is requred"),
    password: Yup.string().required("password is requred"),
    cpassword: Yup.string()
      .required("cpassword is requred")
      .oneOf([Yup.ref("password")], "password must match"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => {
          return (
            <Form>
              <div>
                <label htmlFor="username">Name</label>
                <Field type="text" name="username" />
                <ErrorMessage name="username" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" />
              </div>
              <div>
                <label htmlFor="cpassword">Confrim Password</label>
                <Field type="password" name="cpassword" />
                <ErrorMessage name="cpassword" />
              </div>
              <div>
                <button type="submit">add</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Signupdup;
