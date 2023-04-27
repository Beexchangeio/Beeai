import axiosClient from "./axios.client";

export const userSignUp = async ({ email, password }) => {
  try {
    const response = await axiosClient.post("users/signup", {
      email,
      password,
    });

    return { response };
  } catch (err) {
    return { err };
  }
};

export const userSignIn = async ({ email, password }) => {
  try {
    const response = await axiosClient.post("users/signin", {
      email,
      password,
    });

    return { response };
  } catch (err) {
    return { err };
  }
};

export const userResetPassword = async ({ email, password }) => {
  try {
    const response = await axiosClient.post("users/reset-password", {
      email,
      password,
    });

    return { response };
  } catch (err) {
    return { err };
  }
};

export const userCheckTkn = async () => {
  try {
    const response = await axiosClient.get("users/check-token");

    return { response };
  } catch (err) {
    return { err };
  }
};
