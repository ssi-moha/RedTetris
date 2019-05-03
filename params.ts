export interface IServerType {
        host: string,
        port: number,
        url: string,
}

export interface IParamsType {
    server: IServerType
}

const params: IParamsType = {
    server: {
        host: "0.0.0.0"
        , port: 3004
        , get url() { return "http://" + this.host + ":" + this.port },
    },
}

export default params;
