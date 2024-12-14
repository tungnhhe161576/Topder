import { HubConnectionBuilder } from '@microsoft/signalr';


export const connection = new HubConnectionBuilder()
    .withUrl("https://dovandat1611-001-site1.mtempurl.com/signalR") 
    .withAutomaticReconnect()
    .build();


const startConnection = async () => {
    try {
        await connection.start();
        console.log('Connected to SignalR server');
    } catch (err) {
        console.error('Error connecting to SignalR: ', err);
    }
};

const onReceiveNoti = (callback) => {
    connection.on('CreateNotification', (notification) => {
        if(callback) callback(notification);
    });
};


const createChat = (callback) => {
    connection.on('CreateChat', (chat) => {
        if(callback) callback(chat);
    });
};

export { startConnection, onReceiveNoti, createChat };