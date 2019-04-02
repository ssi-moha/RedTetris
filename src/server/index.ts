import fs  from 'fs'
import debug from 'debug'
import {ServerType} from "../../params";
import http, {RequestListener, Server} from 'http';

const logerror = debug('tetris:error')
    , loginfo = debug('tetris:info')

const initApp = (app: Server, params:ServerType, cb: () => any) => {
    const {host, port} = params
    console.log('dirname: ', __dirname);

    const handler: RequestListener = (req, res) => {
        const file = req.url === '/bundle.js' ? '/../../bundle.js' : '/../../index.html'
        fs.readFile(__dirname + file, (err, data) => {
            if (err) {
                logerror(err)
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

/*const initEngine = io => {
    io.on('connection', function(socket){
        loginfo("Socket connected: " + socket.id)
        socket.on('action', (action) => {
            if(action.type === 'server/ping'){
                socket.emit('action', {type: 'pong'})
            }
        })
    })
}*/

const create = (params: ServerType) => {
    const promise = new Promise( (resolve, reject) => {
        const app: Server = http.createServer();
        initApp(app, params, () => console.log(`server running on localhost:${params.port}, url:${params.url}`))
    })
    return promise
}

export default { create }
