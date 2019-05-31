import { Socket } from "socket.io";

export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

};

// Escuchar mensajes básico
// export const message = (cliente: Socket) => {

//     cliente.on('message', (payload: any, callback?: Function) => {
//         console.log(payload);
//     });
// };

// Escuchar mensajes usando fromEvent
export const messageWithFromEvent = (cliente: Socket, io: SocketIO.Server) => {

    cliente.on('message', (payload: any, callback?: Function) => {
        console.log(payload);
        io.emit('new-message', payload);
    });

};