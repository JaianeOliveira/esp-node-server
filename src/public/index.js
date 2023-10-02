import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

const socket = io();

let temperatureDataHistory = [];
let humidityDataHistory = [];
let timePointsHistory = [];

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
				borderColor: '#06b6d4',
				backgroundColor: '#06b6d4',
			},
			{
				label: 'Umidade (%)',
				data: [],
				borderColor: '#2563eb',
				backgroundColor: '#2563eb',
			},
		],
	},
	options: {
		responsive: true,
		scales: {
			x: {
				display: true,
			},
			y: {
				display: true,
			},
		},
	},
});

async function handleConnect() {
	const socketConnection = await socket.connect('http://localhost:5000');
	socketConnection.on('send_data', (data) => {
		const { temperature, humidity } = JSON.parse(data);
		$tempC.innerHTML = temperature.c;
		$tempF.innerHTML = temperature.f;
		$tempK.innerHTML = temperature.k;

		$humidity.innerHTML = humidity;

		dataChart.data.labels.push(dataChart.data.labels.length + 1);
		dataChart.data.datasets[0].data.push(temperature.c);
		dataChart.data.datasets[1].data.push(humidity);

		dataChart.update();

		if (dataChart.data.labels.length > 29) {
			dataChart.data.labels.shift();
			dataChart.data.datasets.forEach((dataset) => dataset.data.shift());
		}
		dataChart.update();
	});
}

handleConnect();
