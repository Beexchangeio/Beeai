import { Configuration, OpenAIApi } from "openai";
import chatHistoryModel from "../models/chat_history.model.js";

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openapi = new OpenAIApi(openAIConfig);

export const chatCompletion = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    const answer = await openapi.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 3000,
    });

    const text = answer.data.choices[0].text;
    const newHistory = new chatHistoryModel({
      userId: userId,
      question: prompt,
      answer: answer.data.choices[0].text,
    });
    await newHistory.save();
    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getChatHistory = (param, callback) => {
  chatHistoryModel
    .find({ userId: param.userId })
    .then((data) => {
      callback({
        code: 200,
        data: data,
      });
    })
    .catch((err) => {
      callback({
        code: 500,
        msg: err.toString(),
      });
    });
};

export const clearChatHistory = (param, callback) => {
  chatHistoryModel
    .deleteMany({})
    .then(() => {
      callback({
        code: 200,
        msg: `Deleted Successfully`,
      });
    })
    .catch((err) => {
      callback({
        code: 500,
        msg: err.toString(),
      });
    });
};
