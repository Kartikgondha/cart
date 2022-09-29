import React, { useState } from "react";
import { Input, Label, FormGroup, Button, Form } from "reactstrap";
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import "./Login.css";
import { useDispatch } from "react-redux";
import {
  ForgotPasswordAction,
  GoogleLoginAction,
  singinAction,
  singupAction,
} from "../../redux/action/Action";

function Login(props) {
  const [usetype, SetUseType] = useState("Login");
  const [password, SetPassword] = useState(false);

  const handleGoggleLogin = () => {
    dispatch(GoogleLoginAction());
  };
  const 
  HandlePassword = (values) => {
    console.log(values);
    dispatch(ForgotPasswordAction(values));
  };

  const dispatch = useDispatch();

  let LogicSchema, initialVal;

  if (usetype === "Login") {
    LogicSchema = {
      email: yup.string().email().required("please enter Email"),
      password: yup.string().required("Please enter Password"),
    };

    initialVal = {
      password: "",
      email: "",
    };
  } else if (usetype === "Signup") {
    LogicSchema = {
      email: yup.string().email().required("please enter Email"),
      password: yup.string().required("Please enter Password"),
      name: yup.string().required("please enter Name"),
    };

    initialVal = {
      password: "",
      email: "",
      name: "",
    };
  }

  let handleLogin = (values) => {
    localStorage.setItem("user", "123");
    dispatch(singinAction(values));
  };
  let schema = yup.object().shape(LogicSchema);

  const formik = useFormik({
    initialValues: {
      lastName: "",
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (usetype === "Login" && !password) {
        handleLogin(values);
      } else if (usetype === "Signup" && !password) {
        // alert(JSON.stringify(values, null, 2));
        dispatch(singupAction(values));
      } else if (password === true) {
        dispatch(HandlePassword(values));
      }
    },
  });

  const { errors, handleChange, handleSubmit, handleBlur, touched } = formik;
  return (
    <>
      <div className="kartik_main">
        {password ? (
          <h1 className="kartik_h1">Forgot Password</h1>
        ) : usetype === "Login" ? (
          <h1 className="kartik_h1">Login</h1>
        ) : (
          <h1 className="kartik_h1">Signup</h1>
        )}
      </div>
      <div className="col-3">
        <Formik values={formik}>
          <Form onSubmit={handleSubmit}>
            {password ? (
              <>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="text"
                    name="email"
                    placeholder="Your Email Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/* <img className="how-pos4 pointer-none" src="images/icons/icon-email.png" alt="ICON" /> */}
                </div>
                <p>{errors.email && touched.email ? errors.email : ""}</p>
              </>
            ) : usetype === "Login" ? (
              <>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="text"
                    name="email"
                    placeholder="Your Email Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/* <img className="how-pos4 pointer-none" src="images/icons/icon-email.png" alt="ICON" /> */}
                </div>
                <p>{errors.email && touched.email ? errors.email : ""}</p>

                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="text"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <p>
                  {errors.password && touched.password ? errors.password : ""}
                </p>
              </>
            ) : (
              <>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/* <img className="how-pos4 pointer-none" src="images/icons/icon-email.png" alt="ICON" /> */}
                </div>
                <p>{errors.name && touched.name ? errors.name : ""}</p>

                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="text"
                    name="email"
                    placeholder="Your Email Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/* <img className="how-pos4 pointer-none" src="images/icons/icon-email.png" alt="ICON" /> */}
                </div>
                <p>{errors.email && touched.email ? errors.email : ""}</p>

                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="text"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <p>
                  {errors.password && touched.password ? errors.password : ""}
                </p>
              </>
            )}

            {password ? (
              <Button className="flex-c-m stext-101 cl0 size-111 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer mb-4 mt-4">Forgot Password</Button>
            ) : usetype === "Login" ? (
              // <Button className="kartik_btn">Login</Button>
              <button className="flex-c-m stext-101 cl0 size-111 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer mb-4 mt-4">
                Submit
              </button>
            ) : (
              <Button className="flex-c-m stext-101 cl0 size-111 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer mb-4 mt-4">Signup</Button>
            )}
             <button className="flex-c-m stext-101 cl0 size-111 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer mb-4 mt-4" type="submit" onClick={()=>handleGoggleLogin()}>
                                                Google Signin
                                            </button>

            <div className="kartik_link">
              {password ? (
                <a className="creat_kartik" onClick={() => SetPassword(false)}>
                  Remember Your Password ?
                </a>
              ) : usetype === "Login" || SetPassword === false ? (
                <>
                  <a
                    className="creat_kartik"
                    onClick={() => SetUseType("Signup")}
                  >
                    Create an Account ?
                  </a>
                  <a
                    className="forggot_kartik"
                    onClick={() => SetPassword(true)}
                  >
                    Forgot Password ?
                  </a>
                </>
              ) : (
                <a className="creat_kartik" onClick={() => SetUseType("Login")}>
                  Already an Account?
                </a>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Login;
