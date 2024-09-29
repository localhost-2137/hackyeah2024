import { createServer } from "node:http";
import next from "next";
import {Server, Socket} from "socket.io";
import {db} from "@/lib/db";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const PORT = 3000;

const app = next({ dev, hostname, port: PORT });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on("connection", handleSocketConnection);

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(PORT, () => {
            console.log(`> Ready on http://${hostname}:${PORT}`);
        });
});

async function handleSocketConnection(socket: Socket) {
    socket.on("message", (message) => {
        const req = JSON.parse(message);
        switch (req.type) {
            case "send-chat-message":
                sendChatMessage(req.data);
                break;
        }
    });
}

function sendChatMessage(data: any) {
    db.chatMessage;
}