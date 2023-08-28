import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ClientOne from "./clientOne";
import ClientTwo from "./clientTwo";
import Visit from "./visit";
import Chat from "./Chat";

function ComponentRouter(props) {

    return (
        <>
            <Routes>
                {/* <Route path="/" element={<ClientOne roomName="room" username="ClientOne" />} /> */}
                <Route path="/clientOne" element={<ClientOne roomName="room" username="ClientOne" />} />
                <Route path="/clinetTwo" element={<ClientTwo roomName="room" username="ClientTwo" />} />
                <Route path="/chat/:roomName/:userName" element={<Chat />} />
                <Route path="/" element={<Visit />} />
            </Routes>
        </>
    );
}

export default ComponentRouter;
