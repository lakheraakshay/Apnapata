import React, { useState, useRef, useEffect } from "react";
import { makeStyles, TextField, Typography } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import SendIcon from "@material-ui/icons/Send";

// import emptyBg from "../../assets/my-chats/empty-chat.png";
import ChatBubble from "./ChatBubble";
import { base_url, socket } from "../../socket";
import { useParams } from "react-router";
import axios from "axios";

const useStyles = makeStyles({
  conversation: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  center: {
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    "& p": {
      fontWeight: 500,
      marginTop: 10
    }
  },
  title: {
    minHeight: 90,
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: 20,
    borderBottom: "2px solid #CECECE",
    "& .image": {
      width: 45,
      height: 45,
      background: "#C4C4C4"
    },
    "& .message": {
      fontWeight: 400,
      fontSize: "0.9rem",
      "& span": {
        fontFamily: "'Roboto', sans-serif",
        color: "#757575"
      }
    }
  },
  icons: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center"
  },
  chat: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 15,
    maxHeight: "100vh",
    overflow: "auto"
  },
  input: {
    padding: 20,
    marginTop: "auto",
    boxShadow: "0px -1px 7px rgba(0, 0, 0, 0.13)",
    display: "flex",
    alignItems: "center",
    "& input": {
      fontFamily: "'Work Sans', sans-serif",
      fontSize: "1.1rem"
    },
    "& .text-field": {
      width: "100%"
    },
    "& .icons": {
      display: "flex",
      alignItems: "center",
      gap: 15,
      "& .send": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FF813A",
        color: "#fff",
        height: 40,
        width: 40,
        borderRadius: "50%",
        cursor: "pointer"
      }
    }
  }
});

export default function Conversation() {
  const classes = useStyles();
  const messagesEndRef = useRef(null);
  const { name, id, receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  // const [file, setFile] = useState({});
  // const [image, setImage] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    socket.connect();
    socket.on("getMessage", data => {
      console.log(data);
      if (data.conversationId === id) {
        setMessages(prev => [...prev, data]);
      }
    });

    socket.on("image", data => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.off("getMessage");
      socket.off("image");
    };
  }, [id]);

  console.log({ id });

  useEffect(() => {
    let mounted = true;
    axios.get(`${base_url}/message/${id}`).then(res => {
      if (mounted) {
        console.log("message", res.data);
        setMessages(res.data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  }, [messages]);

  const handleSubmit = e => {
    e.preventDefault();
    if (text.length > 0) {
      socket.emit("sendMessage", {
        conversationId: id,
        senderId: localStorage.getItem("userId"),
        receiverId,
        text
      });
      setMessages(prev => [
        ...prev,
        {
          conversationId: id,
          sender: localStorage.getItem("userId"),
          receiverId,
          text
        }
      ]);
  
      setText("");
    }
  };

  return (
    <div className={classes.conversation}>
      <div className={classes.title}>
        <div className="image">{/* <img src="" alt="" /> */}</div>
        <div className="description">
          <Typography variant="body2">{name}</Typography>
          <Typography variant="body2" className="message">
            Last Seen: Today at <span>13:01</span>
          </Typography>
        </div>
        <div className={classes.icons}>
          <MoreIcon htmlColor="#C4C4C4" style={{ marginRight: 15 }} />
          <CloseIcon />
        </div>
      </div>
      <div className={classes.chat}>
        {messages?.map((m, i) => (
          <ChatBubble key={m._id} m={m} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className={classes.input}>
        <TextField
          placeholder="Say something..."
          InputProps={{ disableUnderline: true }}
          className="text-field"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="icons">
          <AttachFileIcon />
          <CameraAltIcon />
          <div className="send" onClick={handleSubmit}>
            <SendIcon />
          </div>
        </div>
      </form>
    </div>
  );
}
