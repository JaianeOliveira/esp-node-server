import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

const socket = io();

let count = 0;

const $tempC = document.querySelector('.temp-c');
const $tempF = document.querySelector('.temp-f');
const $tempK = document.querySelector('.temp-k');

const $humidity = document.querySelector('.hum');

let ctx = document.getElementById('chart').getContext('2d');
let dataChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [],
		datasets: [
			{
				label: 'Temperatura (°C)',
				data: [],
				borderColor: '#38bdf8',
				backgroundColor: '#38bdf8',
			},
			{
				label: 'Umidade (%)',
				data: [],
				borderColor: '#2dd4bf',
				backgroundColor: '#2dd4bf',
			},
		],
	},
	options: {
		responsive: true,
		aspectRatio: 21 / 9,
		scales: {
			x: {
				display: true,
			},
			y: {
				display: true,
			},
		},
		plugins: {
			legend: {
				position: 'bottom',
			},
		},
	},
});

async function handleConnect() {
	const socketConnection = await socket.connect('http://localhost:5000');
	socketConnection.on('send_data', (data) => {
		const { temperature, humidity, moment } = JSON.parse(data);
		$tempC.innerHTML = temperature.c;
		$tempF.innerHTML = temperature.f;
		$tempK.innerHTML = temperature.k;

		$humidity.innerHTML = humidity;

		count += 1;

		dataChart.data.labels.push(new Date(moment).toLocaleTimeString());
		dataChart.data.datasets[0].data.push(temperature.c);
		dataChart.data.datasets[1].data.push(humidity);

		dataChart.update();
	});
}

handleConnect();
