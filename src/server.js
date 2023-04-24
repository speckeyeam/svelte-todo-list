// server.js
/*import http from 'http';
import { handler } from './build/handler.js'; // <- Import SvelteKit handlers
import injectSocketIO from './socket-handler.js'; // The SocketIO stuff (see next step)
import express from 'express';

const app = express();
const server = http.createServer(app);

// Inject SocketIO
injectSocketIO(server);

// SvelteKit handlers
app.use(handler);

server.listen(3000, () => {
    console.log('Running on http://localhost:3000');
});*/
import { handler } from './build/handler.ts';
import express from 'express';
const app = express();
app.use(handler);
// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
    res.end('ok');
});
// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);
app.listen(3000, () => {
    console.log('listening on port 3000');
});
//# sourceMappingURL=server.js.map