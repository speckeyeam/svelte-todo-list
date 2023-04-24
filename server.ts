import express from 'express';
const app = express();
import { join, resolve } from 'path';
import { createServer } from 'http';
const server = createServer(app);
import { Server } from 'socket.io';
const io = new Server(server, { cors: { origin: '*' } });
import cors from 'cors';
import compression from 'compression';

const __dirname = resolve();

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(express.static(join(__dirname, 'dist')));

const PORT = process.env.PORT || 2000;
server.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});

io.on('connection', (socket) => {
	// Generate a random username and send it to the client to display it
	let username = `User ${Math.round(Math.random() * 999999)}`;
	socket.emit('name', username);

	// Receive incoming messages and broadcast them
	socket.on('message', (message) => {
		io.emit('message', {
			from: username,
			message: message,
			time: new Date().toLocaleString()
		});
	});
});
server.setTimeout(10000);
