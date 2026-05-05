module.exports = (io) => {

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join-project", (projectId) => {
            socket.join(projectId);
        });

        socket.on("code-change", (data) => {
            socket.to(data.projectId).emit("code-change", data);
        });

        socket.on("cursor-move", (data) => {
            socket.to(data.projectId).emit("cursor-move", data);
        });

        socket.on("file-created", (data) => {
            socket.to(data.projectId).emit("file-created", data);
        });

        socket.on("file-deleted", (data) => {
            socket.to(data.projectId).emit("file-deleted", data);
        });

        socket.on("file-renamed", (data) => {
            socket.to(data.projectId).emit("file-renamed", data);
        });

    });

};