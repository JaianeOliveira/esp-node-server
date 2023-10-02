import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

const socket = io();

let count = 0;

const $tempC = document.querySelector('.temp-c');
const $tempF = document.querySelector('.temp-f');
const $tempK = document.querySelector('.temp-k');

const $humidity = document.querySelector('.hum');

let tempChartCtx = document.getElementById('temp-chart').getContext('2d');
let tempChart = new Chart(tempChartCtx, {
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
		],
	},
	options: {
		responsive: true,
		aspectRatio: 16 / 9,
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

let humChartCtx = document.getElementById('hum-chart').getContext('2d');
let humChart = new Chart(humChartCtx, {
	type: 'line',
	data: {
		labels: [],
		datasets: [
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
		aspectRatio: 16 / 9,
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
		$tempC.innerHTML = temperature.c.toFixed(1);
		$tempF.innerHTML = temperature.f.toFixed(1);
		$tempK.innerHTML = temperature.k.toFixed(1);

		$humidity.innerHTML = humidity;

		count += 1;

		tempChart.data.labels.push(new Date(moment).toLocaleTimeString());
		humChart.data.labels.push(new Date(moment).toLocaleTimeString());

		tempChart.data.datasets[0].data.push(temperature.c);
		humChart.data.datasets[0].data.push(humidity);

		tempChart.update();
		humChart.update();
	});
}

handleConnect();
