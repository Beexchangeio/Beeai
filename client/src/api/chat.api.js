import axiosClient from "./axios.client";

export const chatCompletion = async ({ userId, prompt }) => {
  try {
    const response = await axiosClient.post("chats", { userId, prompt });

    return { response };
  } catch (err) {
    return { err };
  }
};

export const clearHistory = async () => {
  try {
    const response = await axiosClient.delete("chats");
    return { response };
  } catch (err) {
    return { err };
  }
};
