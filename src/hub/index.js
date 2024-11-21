import { HubConnectionBuilder } from '@microsoft/signalr';


const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7134/signalR") 
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

export { startConnection, onReceiveNoti };