module.exports = (io) => {
    io.on('connection', (socket) => {

        socket.on('roomjoin', (data) => {
            socket.join(data)
        });

        socket.on("alert", (touserid) => {
            io.to(touserid).emit("heejewake", touserid);
        });

        socket.on("chat", (toRoomName, username, str) => {
            io.to(toRoomName).emit("heejewake", username, str);
        });

        socket.on('alertAll', () => {
            io.emit("alertAll", 'All')
        })

        socket.on('disconnect', () => {
            console.log('disconnected');
        });
    });
};