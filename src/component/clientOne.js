import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { cloneDeep } from 'lodash';
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

const ChatBar = styled(TextField)`
    width: 90%
`

export default function ClientOne(props) {
    console.log(props.roomName)
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

    }, [])

    useEffect(() => {
        return (() => {
            if (socket) {
                socket.disconnect();
            }
        })
    }, [socket])


    useEffect(() => {
        if (socket) {
            console.log('roomjoin')


            socket.on("heejewake", (username, message) => {  // 클라이언트1이 누른 버튼-> 서버-> heejewake이벤트
                console.log('on')
                console.log(message)                  // 에서 메시지 hwi를 받는다
                // alert(massage);
                setMessage((mes) => {
                    let messageArray = cloneDeep(mes);
                    messageArray.push({ username, message })
                    console.log(messageArray)
                    return messageArray;
                })
            });

            socket.on('alertAll', (message) => {
                console.log('all')
                alert(message)
            })
        }
    }, [socket])

    const click = (e) => {

        const name = "hwi2";         //버튼을 클릭하면
        const str = "대화내용2"
        console.log('onclick')
        if (socket) {

            // socket.emit("alertAll", str);
            socket.emit("chat", roomName, username, str);
        }
    };

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

    useEffect(() => {
        console.log('message')
        console.log(message)
    }, [message])
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