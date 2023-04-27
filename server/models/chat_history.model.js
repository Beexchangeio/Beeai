import mongoose from "mongoose";

const ChatHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const ChatHistory = mongoose.model("chat_histories", ChatHistorySchema);

export default ChatHistory;
