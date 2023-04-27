import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { userSignUp } from "../api/user.api";
import { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

const SignupPage = () => {
  const navigate = useNavigate();

  const [isRequest, setIsRequest] = useState(false);

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("email is required")
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Invalid email address"
        ),
      password: yup.string().required("password is requried").min(8),
      confirmPassword: yup
        .string()
        .required("Confirm password is requried")
        .min(8)
        .oneOf([yup.ref("password")], "Confirm password not match"),
    }),
    onSubmit: (values) => onSignUp(values),
  });

  const onSignUp = async ({ email, password }) => {
    if (isRequest) return;
    setIsRequest(true);

    const { response, err } = await userSignUp({ email, password });

    setIsRequest(false);

    if (response) {
      toast.success("Signup success");
      navigate("/signin");
    }

    if (err) toast.error(err.message);
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
        <TextField
          fullWidth
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          value={form.values.confirmPassword}
          onChange={form.handleChange}
          error={
            form.touched.confirmPassword &&
            form.errors.confirmPassword != undefined
          }
          helperText={
            form.touched.confirmPassword && form.errors.confirmPassword
          }
        />
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          loading={isRequest}
          color="success"
        >
          signup
        </LoadingButton>
        <Button component={Link} to="/signin" size="small">
          signin
        </Button>
      </Stack>
    </Box>
  );
};

export default SignupPage;
