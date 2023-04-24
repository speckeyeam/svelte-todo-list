import ioClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:2000';

const socket = ioClient(ENDPOINT);

export const io = socket;
