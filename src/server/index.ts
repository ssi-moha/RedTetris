import fs  from 'fs'
import debug from 'debug'
import {ServerType} from "../../params";
import http, {RequestListener, Server} from 'http';
import socketIO, {Server as SocketIOServer} from 'socket.io';


const logerror = debug('tetris:error')
    , loginfo = debug('tetris:info')

const initApp = (app: Server, params:ServerType, cb: () => any) => {
    const {host, port} = params

    const handler: RequestListener = (req, res) => {
        const file = req.url === '/bundle.js' ? '/../../bundle.js' : '/../../index.html'
        fs.readFile(__dirname + file, (err, data) => {
            if (err) {
                logerror(err)
                console.log('err: ', err);
                res.writeHead(500)
                return res.end(`Error loading index.html: ${err}`)
            }
            res.writeHead(200)
            res.end(data)
        })
    }

    app.on('request', handler)

    app.listen({host, port}, () =>{
        loginfo(`tetris listen on ${params.url}`)
        cb()
    })
}

const initEngine = (io: SocketIOServer) => {
    console.log('initEngine: ');
    io.on('connection', (socket) => {
        loginfo("Socket connected: " + socket.id)
        console.log('info: Socket connected: ', socket.id);
        socket.on('action', (action) => {
            if(action.type === 'server/ping'){
                socket.emit('action', {type: 'pong'})
            }
        })
    })
}

const create = (params: ServerType) => {
    const promise = new Promise( (resolve, reject) => {
        const app: Server = http.createServer();
        initApp(app, params, () => {
            const io = socketIO(app)
            const stop = (cb: () => any) => {
                io.close()
                app.close( () => {
                    app.unref()
                })
                loginfo(`Engine stopped.`)
                cb()
            }
            console.log(`server running on localhost:${params.port}, url:${params.url}`)
            initEngine(io)
            resolve({stop})
        })
    })
    return promise
}

export default { create }
