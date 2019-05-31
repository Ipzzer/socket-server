import express = require('express');

import { SERVER_PORT } from '../globals/environment';
// import socketIO from 'socket.io'
// import http from 'http'

import * as socket from '../sockets/socket';
import http = require('http');
import socketIO = require('socket.io');

export default class Server {
    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    public httpServer: http.Server;
    private static _instance: Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server ( this.app );
        this.io = socketIO( this.httpServer );
        this.escucharSocket();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    // Escuchando conexiones
    private escucharSocket() {
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {
            console.log('Cliente conectado');

            // socket.message(cliente);
            socket.messageWithFromEvent(cliente, this.io);
            socket.listenConfigureUser(cliente, this.io);

            socket.desconectar(cliente);
        });
    }

    start(callback: any) {
        this.httpServer.listen( this.port, callback );
    }
}
