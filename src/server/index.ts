import fs from "fs";
import http, {RequestListener, Server} from "http";
import socketIO, {Server as SocketIOServer, Socket} from "socket.io";
import {IServerType} from "../../params";
import {logerror, loginfo} from "./debug/debug";
import engine from "./engine/engine";

export interface ISocketIOSocket extends Socket {
    username: string,
}

const initApp = (app: Server, params: IServerType, cb: () => any) => {
    const {host, port} = params;

    const handler: RequestListener = (req, res) => {
        const file = req.url === "/bundle.js" ? "/../../bundle.js" : "/../../index.html";
        fs.readFile(__dirname + file, (err, data) => {
            if (err) {
                logerror(err);
                res.writeHead(500);
                return res.end(`Error loading index.html`);
            }
            res.writeHead(200);
            res.end(data);
        });
    };

    app.on("request", handler);

    app.listen({host, port}, () => {
        loginfo(`tetris listen on ${params.url}`);
        cb();
    });
};

const initEngine = (io: SocketIOServer) => {
    io.on("connection", (socket: ISocketIOSocket) => {
        engine(socket, io);
    });
};

const create = (params: IServerType) => {
    const promise = new Promise( (resolve) => {
        const app: Server = http.createServer();
        initApp(app, params, () => {
            const io = socketIO(app);
            const stop = (cb: () => any) => {
                io.close();
                app.close( () => app.unref());
                loginfo(`Engine stopped.`);
                cb();
            };
            initEngine(io);
            resolve({ stop });
        });
    });
    return promise;
};

export default { create };
