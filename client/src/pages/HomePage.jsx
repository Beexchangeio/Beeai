import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { chatCompletion, clearHistory } from "../api/chat.api";
import axiosClient from "../api/axios.client";
import { toast } from "react-toastify";
import TypeWriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  IconButton,
  FormControl,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "../components/Sidebar";
import styles from "./styles";

const useStyles = makeStyles(styles);

const messageType = {
  answer: "answer",
  question: "question",
};

const HomePage = () => {
  const classes = useStyles();
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  const inputRef = useRef();
  const chatWrapperRef = useRef();

  const [onRequest, setOnRequest] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);

  const getAnswer = async () => {
    if (onRequest) return;

    const newMessages = [
      ...messages,
      {
        type: messageType.question,
        content: question,
      },
    ];
    setIsHistoryLoaded(true);
    setMessages(newMessages);
    setQuestion("");
    setOnRequest(true);

    const { response, err } = await chatCompletion({
      userId: userId,
      prompt: question,
    });

    if (response) {
      setMessages([
        ...newMessages,
        {
          type: messageType.answer,
          content: response.text,
        },
      ]);
    }

    if (err) {
      toast.error(err.message);
      setOnRequest(false);
    }
  };

  const onDefaultQuestion1 = async () => {
    if (onRequest) return;

    const newMessages = [
      ...messages,
      {
        type: messageType.question,
        content:
          "Can you help me to write a social media post for my business?",
      },
    ];

    setIsHistoryLoaded(true);
    setMessages(newMessages);
    setQuestion("");
    setOnRequest(true);

    const { response, err } = await chatCompletion({
      userId: userId,
      prompt: "Can you help me to write a social media post for my business?",
    });

    if (response) {
      setMessages([
        ...newMessages,
        {
          type: messageType.answer,
          content: response.text,
        },
      ]);
    }

    if (err) {
      toast.error(err.message);
      setOnRequest(false);
    }
  };

  const onDefaultQuestion2 = async () => {
    if (onRequest) return;

    const newMessages = [
      ...messages,
      {
        type: messageType.question,
        content: "Can you help me to write an Email to send to my mailing?",
      },
    ];

    setIsHistoryLoaded(true);
    setMessages(newMessages);
    setQuestion("");
    setOnRequest(true);

    const { response, err } = await chatCompletion({
      userId: userId,
      prompt: "Can you help me to write an Email to send to my mailing?",
    });

    if (response) {
      setMessages([
        ...newMessages,
        {
          type: messageType.answer,
          content: response.text,
        },
      ]);
    }

    if (err) {
      toast.error(err.message);
      setOnRequest(false);
    }
  };

  const onDefaultQuestion3 = async () => {
    if (onRequest) return;

    const newMessages = [
      ...messages,
      {
        type: messageType.question,
        content: "How do I invest in BeeAi?",
      },
    ];

    setIsHistoryLoaded(true);
    setMessages(newMessages);
    setQuestion("");
    setOnRequest(true);

    const { response, err } = await chatCompletion({
      userId: userId,
      prompt: "How do I invest in BeeAi?",
    });

    if (response) {
      setMessages([
        ...newMessages,
        {
          type: messageType.answer,
          content: response.text,
        },
      ]);
    }

    if (err) {
      toast.error(err.message);
      setOnRequest(false);
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && question !== "") getAnswer();
  };

  const onSignOut = () => {
    localStorage.removeItem("tkn");
    navigate("/signin");
  };

  const onClearHistory = async () => {
    const { response } = await clearHistory();
    if (response.code === 200) {
      toast.success(response.msg);
      setMessages([]);
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      chatWrapperRef.current.addEventListener("DOMNodeInserted", (e) => {
        e.currentTarget.scroll({
          top: e.currentTarget.scrollHeight,
          behavior: "smooth",
        });
      });
      const response = await axiosClient.post("chats/get", { userId });
      let messageHistory = [];
      response.data.map((history) => {
        messageHistory.push({
          type: messageType.question,
          content: history.question,
        });
        messageHistory.push({
          type: messageType.answer,
          content: history.answer,
        });
      });
      setMessages(messageHistory);
      setIsHistoryLoaded(false);
    }, 200);
  }, []);

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      direction="row"
      sx={{ height: "100%" }}
    >
      <Sidebar bg borderBottom>
        <Box
          sx={{
            width: "100%",
            height: "80%",
            position: "relative",
            paddingX: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="assets/logo.png" style={{ width: "80%", marginTop: 30 }} />
          <div
            className={classes.defaultQuestionItem}
            onClick={onDefaultQuestion1}
          >
            <IconButton className={classes.defaultMessageIcon}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography style={{ fontSize: "0.8rem" }}>
              Can you help me to write a social media post for my business?
            </Typography>
          </div>
          <div
            className={classes.defaultQuestionItem}
            onClick={onDefaultQuestion2}
          >
            <IconButton className={classes.defaultMessageIcon}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography style={{ fontSize: "0.8rem" }}>
              Can you help me to write an Email to send to my mailing?
            </Typography>
          </div>
          <div
            className={classes.defaultQuestionItem}
            onClick={onDefaultQuestion3}
          >
            <IconButton className={classes.defaultMessageIcon}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography style={{ fontSize: "0.8rem" }}>
              How do I invest in BeeAi?
            </Typography>
          </div>
        </Box>
        <hr style={{ width: "-webkit-fill-available", margin: "0px 12px" }} />
        <Box
          sx={{
            width: "100%",
            height: "40%",
            padding: "10px 12px",
          }}
        >
          <div className={classes.menuItem} onClick={onClearHistory}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
            <Typography style={{ fontSize: "0.8rem" }}>
              Clear Conversations
            </Typography>
          </div>
          <div className={classes.menuItem} onClick={onSignOut}>
            <IconButton>
              <LogoutOutlinedIcon />
            </IconButton>
            <Typography style={{ fontSize: "0.8rem" }}>Logout</Typography>
          </div>
        </Box>
      </Sidebar>

      <Box
        ref={chatWrapperRef}
        sx={{
          height: "100%",
          backgroundColor: "rgb(31 33 18)",
          zIndex: 1,
          width: "100%",
          overflowY: "auto",
          position: "relative",
          "&::-webkit-scrollbar": {
            width: "0px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          {messages.map((item, index) => (
            <Box key={index}>
              <Box
                sx={{
                  padding:
                    item.type === messageType.answer
                      ? "24px calc(50% - 24rem)"
                      : "24px 0px",
                  bgcolor: item.type === messageType.answer && "#2f2f2f",
                  maxWidth: item.type === messageType.answer ? "100%" : "48rem",
                  margin: "auto",
                  marginBottom: index === messages.length - 1 && "100px",
                }}
              >
                {index === messages.length - 1 ? (
                  isHistoryLoaded && item.type === messageType.answer ? (
                    <TypeWriter
                      onInit={(writer) => {
                        writer
                          .typeString(item.content)
                          .callFunction(() => {
                            document.querySelector(
                              ".Typewriter__cursor"
                            ).style.display = "none";

                            setOnRequest(false);
                            setTimeout(() => {
                              inputRef.current.focus();
                            }, 500);
                          })
                          .changeDelay(100)
                          .start();
                      }}
                      options={{
                        delay: 20,
                      }}
                    />
                  ) : (
                    item.content
                  )
                ) : (
                  item.content
                )}
              </Box>
            </Box>
          ))}
        </Box>
        <Stack
          width="100%"
          alignItems="center"
          justifyContent="center"
          bgcolor="transparent"
          position="fixed"
          left="125px"
          bottom="0"
          zIndex={3}
        >
          <Box padding={2} width="48rem" marginX="auto">
            <FormControl
              fullWidth
              variant="outlined"
              style={{
                backgroundColor: "rgb(64, 65, 79)",
                borderRadius: "12px",
              }}
            >
              <OutlinedInput
                inputRef={inputRef}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                endAdornment={
                  onRequest ? (
                    <CircularProgress size="1.5rem" />
                  ) : (
                    <SendOutlinedIcon />
                  )
                }
                autoFocus
                disabled={onRequest}
                onKeyUp={onEnterPress}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask something..."
              />
            </FormControl>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default HomePage;
