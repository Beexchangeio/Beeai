import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { userSignIn } from "../api/user.api";
import { useRef, useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import emailjs from "emailjs-com";

const SigninPage = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  let email = localStorage.getItem("email");

  const [isRequest, setIsRequest] = useState(false);

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Email address is required"),
      password: yup.string().required("password is requried").min(8),
    }),
    onSubmit: (values) => onSignIn(values),
  });

  const onSignIn = async ({ email, password }) => {
    if (isRequest) return;
    setIsRequest(true);

    const { response, err } = await userSignIn({ email, password });

    setIsRequest(false);

    if (response) {
      localStorage.setItem("tkn", response.token);
      navigate("/");
    }

    if (err) toast.error(err.message);
  };

  const onResetPassword = (e) => {
    e.preventDefault();
    // Note that this value come from state variables linked to your text input
    emailjs
      .sendForm(
        "Submit_Profile",
        "template_7jg5wen",
        formRef.current,
        "7Za7VEINCTOsUz9PV"
      )
      .then(
        (result) => {
          toast.success("Check your Mail!");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Box component="form" noValidate onSubmit={form.handleSubmit}>
      <Stack spacing={3}>
        <img src="assets/logo.png" style={{ width: "230px", margin: "auto" }} />
        <TextField
          fullWidth
          placeholder="email"
          name="email"
          value={form.values.email}
          onChange={form.handleChange}
          error={form.touched.email && form.errors.email != undefined}
          helperText={form.touched.email && form.errors.email}
        />
        <TextField
          fullWidth
          type="password"
          placeholder="password"
          name="password"
          value={form.values.password}
          onChange={form.handleChange}
          error={form.touched.password && form.errors.password != undefined}
          helperText={form.touched.password && form.errors.password}
        />
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          loading={isRequest}
          color="success"
        >
          signin
        </LoadingButton>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <form ref={formRef} hidden>
            <input defaultValue={email} hidden name="to_email" />
            <input
              defaultValue={"http://localhost:5173/reset-password"}
              hidden
              name="link"
            />
          </form>
          <Link
            style={{ color: "#d0d6df", marginLeft: 40 }}
            onClick={onResetPassword}
          >
            Forgot password?
          </Link>
          <Button
            component={Link}
            to="/signup"
            size="small"
            style={{ marginRight: 40 }}
          >
            Registration
          </Button>
        </div>
      </Stack>
    </Box>
  );
};

export default SigninPage;
