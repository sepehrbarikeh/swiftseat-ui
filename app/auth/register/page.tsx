'use client'
import { RegisterHandler } from "@/src/service/user";
import { RegisterType } from "@/src/types/user";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function Page() {

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password is required"),
  })

  const router = useRouter()

  const onSubmit = async (value: RegisterType) => {
    console.log(value)
    try {
      const res = await RegisterHandler(value)
      if (res.status == 201) {
        toast.success("user created");
        router.push("/auth/login")
      }
    } catch (error: any) {
      if (error?.status == 409) {
        toast.error("the email is already exist");
      }
    }
  }


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

      <div className="w-[320px] bg-white p-6 rounded-2xl shadow-sm border border-gray-200">

        <h2 className="text-lg font-bold text-center text-slate-900 mb-6">
          Create an account
        </h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          <Form className="space-y-3">
            <Field
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full px-3 py-2 text-sm text-slate-900 mb-2 border border-gray-200 rounded-lg focus:border-blue-600 outline-none transition"
            />
            <ErrorMessage
              name="name"
              component="p"
              className="text-red-500 text-sm"
            />
            <Field
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 text-sm text-slate-900 mb-2 border border-gray-200 rounded-lg focus:border-blue-600 outline-none transition"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm"
            />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 text-sm text-slate-900 mb-2 border border-gray-200 rounded-lg focus:border-blue-600 outline-none transition"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm"
            />

            <button type="submit" className="w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 transition mt-4 shadow-sm">
              Sign up
            </button>
          </Form>
        </Formik>

        <p className="text-center text-[11px] mt-4 text-gray-400">
          Already have an account? <a href="login" className="text-blue-600 font-medium">Sign in</a>
        </p>
      </div>
    </main>
  );
}