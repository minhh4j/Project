import axios from "axios";
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

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
      console.log(values, "check");
      const response = await axios.post("http://localhost:3008/user", values);
      console.log("Successfully submitted", response.data);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Invalid email address"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    cpassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="col-12 col-sm-8 col-md-6 col-lg-5">
        <div className="card shadow p-4">
          <h2 className="text-center mb-4">Signup</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Name</label>
                  <Field
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage name="username" component="div" className="text-danger small mt-1" />
                </div>

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

                <div className="mb-3">
                  <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                  <Field
                    type="password"
                    name="cpassword"
                    className="form-control"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage name="cpassword" component="div" className="text-danger small mt-1" />
                </div>

                <div className="d-grid mt-4">
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

export default Signupdup;
