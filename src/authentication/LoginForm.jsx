import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import axios from "axios";
import { ProductContext } from "./Context/ProductContext";

function LoginForm() {
  const initialValues = {
    email: "",
    password: "",
  };

  const { login } = useContext(ProductContext);

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email address"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.get("http://localhost:3008/user");
      const users = response.data;

      const user = users.find((x) => x.email === values.email && x.password === values.password);
      console.log(user)

      if (user) {
        login(user.username);
      } else {
        setErrors({ login: "Invalid email or password" });
      }
    } catch (error) {
      setErrors({ login: "Something went wrong. Please try again later." });
    }
    setSubmitting(false);
    
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="container col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">
        <div className="card shadow p-4">
          <h2 className="text-center mb-4">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                </div>

                {errors.login && <div className="text-danger small mb-3">{errors.login}</div>}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
