import io from 'socket.io-client';

class SocketClient {
    //建立连接
    connect(socketPath) {
        this.socket = io.connect(socketPath);
        return new Promise((resolve, reject) => {
            this.socket.on("connect", () => reslove());
            this.socket.on("connect_error", (err) => reject(err));
        });
    }

    //断开连接
    disconnect() {
        return new Promise((resolve) => {
            this.socket.disconnect(() => {
                this.socket = null;
                resolve();
            })
        })
    }

    //向服务端发送事件
    emit(event, data) {
        return new Promise((resolve, reject) => {
            if (!this.socket)
                return reject("No socket connection.");
            return this.socket.emit(event, data, (res) => {
                if (res.error)
                    return reject(res.error);
                return resolve();
            });
        });
    }

    //监听服务端发送的事件
    on(event, fn) {
        return new Promise((resolve, reject) => {
            if (!this.socket)
                return reject("No socket connection.");
            this.socket.on(event, fn);
            resolve();
        });
    }
}

export default SocketClient;
