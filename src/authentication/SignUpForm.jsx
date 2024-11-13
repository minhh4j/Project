import axios from "axios";
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "tailwindcss/tailwind.css"; // Ensure this is imported if not already

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
    <div className="flex justify-start items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-xs p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
                <Field
                  type="text"
                  name="username"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <Field
                  type="password"
                  name="cpassword"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                />
                <ErrorMessage name="cpassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Signupdup;
