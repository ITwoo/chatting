import backgroundImage from "../static/20230814155126098vofa.jpg"
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const WrapInput = styled.div`
    position: absolute;
    top: 40%;
    left: 40%;
    background-color: white;
    opacity : 0.5;
`

export default function Visit() {

    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');

    const navigate = useNavigate();

    const onClick = () => {
        if (roomName && userName) {

            navigate(`/chat/${roomName}/${userName}`)

        } else {

            alert('방이름과 사용자 이름을 입력하세요')
        }
    }

    const onUserName = (e) => {
        setUserName(e.target.value)
    }
    const onRoomName = (e) => {
        setRoomName(e.target.value)
    }

    return <div>
        <WrapInput>
            <TextField id="outlined-basic" variant="outlined" style={{ height: "100%" }} placeholder="user name" onChange={onUserName} />
            <TextField id="outlined-basic" variant="outlined" style={{ height: "100%" }} placeholder="room name" onChange={onRoomName} />
            <Button variant="contained" size="large" sx={{ fontSize: "1.4rem" }} onClick={onClick}>
                접속
            </Button>
        </WrapInput>
        <div style={{ width: "100%", height: "100vh", backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
        </div>
    </div>
}