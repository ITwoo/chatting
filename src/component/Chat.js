import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "@emotion/styled";
import { cloneDeep, debounce } from 'lodash';

const ChatBar = styled(TextField)`
    width: 90%
`
export default function Chat(props) {

    const { roomName, userName } = useParams();

    const [socket, setSocket] = useState();

    const [message, setMessage] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const socketIo = io("http://localhost:8081/", {
            withCredentials: true,
            transports: ["websocket"]
        });

        socketIo.emit("roomjoin", roomName);

        setSocket(socketIo)

    }, [roomName])

    useEffect(() => {
        return () => {
            if (socket)
                socket.disconnect();
        }
    }, [socket])

    useEffect(() => {
        if (socket) {

            socket.on("heejewake", (username, message) => {  // 클라이언트1이 누른 버튼-> 서버-> heejewake이벤트
                setMessage((mes) => {
                    let messageArray = cloneDeep(mes);
                    messageArray.push({ username, message })
                    return messageArray;
                })
            });

            socket.on('alertAll', (message) => {
                alert(message)
            })


        }

    }, [socket])


    const onChange = (e) => {
        setText(e.target.value)
    }

    const onClick = () => {
        if (socket) {
            socket.emit("chat", roomName, userName, text); //서버의 소켓 alert이벤트에 "hwi"를 보낸다 
            setText('')
        }
    }

    const onKeyDown = debounce((e) => {
        if (e.code === "Enter") {
            if (e.shiftKey === true) {
                return;
            } else {
                if (socket) {
                    socket.emit("chat", roomName, userName, text); //서버의 소켓 alert이벤트에 "hwi"를 보낸다 
                }
                e.preventDefault();
                setText('')
            }
        }
    }, 1)

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {message.length > 0 ? message.map((mes) => {
                    return mes.username === userName ?
                        <div style={{
                            border: "1px solid",
                            borderRadius: "500px",
                            padding: "1%",
                            wordBreak: "break-word",
                            overflow: "hidden",
                            textAlign: "center",
                            width: "fit-content",
                            maxWidth: "45%",
                            flexGrow: "1",
                            marginLeft: "auto",
                            whiteSpace: "pre-wrap"
                        }}>
                            {mes?.message}
                        </div> :
                        <div style={{
                            border: "1px solid",
                            borderRadius: "500px",
                            padding: "1%",
                            wordBreak: "break-word",
                            overflow: "hidden",
                            textAlign: "center",
                            width: "fit-content",
                            maxWidth: "45%",
                            flexGrow: "1",
                            whiteSpace: "pre-wrap"
                        }}>
                            {mes?.message}
                        </div>
                }) : <></>}
            </div>
            <div style={{ display: "flex", position: "absolute", bottom: "1px", right: "0px", width: "100%" }}>
                <ChatBar id="outlined-basic" multiline variant="outlined" onChange={onChange} onKeyDownCapture={onKeyDown} value={text} />
                <Button variant="contained" onClick={onClick}>Contained</Button>
            </div>
        </div >
    )
}