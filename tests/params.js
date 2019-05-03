
const params = {
    server: {
        host: "0.0.0.0",
        port: 3000,
        get url() { return "http://" + this.host + ":" + this.port },
    },
}
