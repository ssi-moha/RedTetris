export type ServerType = {
        host: string,
        port: number,
        url: string
}

export interface ParamsType {
    server: ServerType
}

const params: ParamsType = {
    server:{
        host: '0.0.0.0'
        , port: 3004
        , get url() { return 'http://' + this.host + ':' + this.port }
    },
}

export default params;
