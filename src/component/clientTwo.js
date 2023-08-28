import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "@emotion/styled";
import { cloneDeep } from 'lodash';

const ChatBar = styled(TextField)`
    width: 90%
`
export default function ClientTwo(props) {
    const { username, roomName } = props;

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
                // alert(massage);
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


    const onclick = (e) => {
        const name = "hwi";
        const str = "대화내용"      //버튼을 클릭하면
        if (socket) {

            socket.emit("chat", roomName, username, str); //서버의 소켓 alert이벤트에 "hwi"를 보낸다 
        }
    };

    const inputStr = (e) => {
    }

    const onChange = (e) => {
        setText(e.target.value)
    }

    const onClick = () => {
        console.log('oput')
        if (socket) {
            console.log('in')
            socket.emit("chat", roomName, username, text); //서버의 소켓 alert이벤트에 "hwi"를 보낸다 
        }
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Link to="/clientOne">알람 보내는 페이지</Link>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {message.length > 0 ? message.map((mes) => {
                    return mes.username === username ?
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
                            marginLeft: "auto"
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
                        }}>
                            {mes?.message}
                        </div>
                }) : <></>}
            </div>
            <div style={{ display: "flex", position: "absolute", bottom: "1px", right: "0px", width: "100%" }}>
                <ChatBar id="outlined-basic" variant="outlined" onChange={onChange} />
                <Button variant="contained" onClick={onClick}>Contained</Button>
                {/* <button onClick={onclick}>알림창 보내기</button> */}
            </div>
        </div >
    )
}