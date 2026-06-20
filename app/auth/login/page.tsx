"use client"
import UserLoginToken from "@/src/helper/auth";
import { LoginHandler } from "@/src/service/user";
import { LoginType } from "@/src/types/user";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";


export default function Login() {

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("Password is required"),
  })

  const router = useRouter()



  const onSubmit = async (value: LoginType) => {
    try {
      const res = await LoginHandler(value)
      if (res.data.role == "admin") {
        router.push("/admin")
      } else {
      UserLoginToken(res.data.token)
        router.push("/")
      }
    } catch (error) {
      toast.error("Invalid email or password");
      console.log(error)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-[320px] bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold text-center text-slate-900 mb-6">
          Log In
        </h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>

          <Form className="space-y-3">
            <Field
              name="email"
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 mb-2 text-sm border text-slate-900 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition"
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
              className="w-full px-3 py-2 mt-2 text-sm border text-slate-900 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm"
            />


            <div className="flex items-center mt-2 justify-between text-[11px] text-gray-500 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                Remember
              </label>
              <a href="#" className="hover:text-blue-600">Forgot password?</a>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 transition mt-2 shadow-sm">
              Log In
            </button>
          </Form>
        </Formik>

        <p className="text-center text-[11px] text-gray-400 mt-4 ">
          Not a member? <a href="/auth/register" className="text-blue-600 font-medium">Start a free trial</a>
        </p>
      </div>
    </main>
  );
}