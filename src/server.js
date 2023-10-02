const express = require('express');
const sio = require('socket.io');
const http = require('http');
const cors = require('cors');

function generateLog(title, message, ...args) {
	return `[${new Date().toLocaleTimeString()} - ${title}] ${message}${args.map(
		(arg, index, argsList) => ` | ${arg}`
	)}`;
}

function celsiusToFahrenheit(temp) {
	return Math.round(temp * 1.8 + 32);
}

function celsiusToKelvin(temp) {
	return Math.round(temp + 273);
}

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('src/public'));

const PORT = 5000;
const server = http.createServer(app);

const io = new sio.Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
	console.log(generateLog('Socket.io server', `Conectado em ${socket.id}`));
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/view/index.html');
});

app.post('/data', (req, res) => {
	const body = req.body;
	const { temperature, humidity, moment } = body;
	console.log(moment);
	io.emit(
		'send_data',
		JSON.stringify({
			moment: moment,
			temperature: {
				k: celsiusToKelvin(temperature),
				c: temperature,
				f: celsiusToFahrenheit(temperature),
			},
			humidity,
		})
	);
	console.log(
		`[${new Date().toLocaleTimeString()} - Socket.io server] Dados enviados ao client`
	);

	res.send('Data received successfuly');
});

server.listen(PORT, () => {
	console.log(
		`[${new Date().toLocaleTimeString()} - ESP-node-server] Servidor rodando em http://localhost:${PORT}`
	);
});
