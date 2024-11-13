import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import axios from "axios";
import { ProductContext } from "../Context/ProductContext";

function LoginForm() {
  const initialValues = {
    email: "",
    password: "",
  };

  const { login } = useContext(ProductContext);

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email address"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.get("http://localhost:3008/user");
      const users = response.data;

      const user = users.find((x) => x.email === values.email && x.password === values.password);

      if (user) {
        login(user.username);
      } else {
        setErrors({ login: "Invalid email or password" });
      }
    } catch (error) {
      setErrors({ login: "Something went wrong. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full sm:w-96">
        <div className="card shadow-lg p-6 rounded-lg bg-white">
          <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {errors.login && <div className="text-red-500 text-xs mb-3">{errors.login}</div>}

                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Submit"}
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
