const token = localStorage.getItem('jwtToken');

if (!token) {
	window.location.replace("index.html");
}

const usernameSpan = document.getElementById("username");
if (usernameSpan) {
	usernameSpan.textContent = localStorage.getItem("username") || "Käyttäjänimi";
}

function logout() {
	localStorage.removeItem("jwtToken");
	window.location.replace("index.html");
}

const fetchData = async (url, options = {}) => {
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			const errorData = await response.json();
			return { error: errorData.message || 'An error occurred' };
		}
		return await response.json();
	} catch (error) {
		console.error('fetchData() error:', error.message);
		return { error: error.message };
	}
};

const getUserInfo = async () => {
	console.log('Käyttäjän INFO Kubioksesta');

	const url = 'http://localhost:3000/api/kubios-data/user-info';
	const headers = { Authorization: `Bearer ${token}` };
	const options = { headers };
	const userData = await fetchData(url, options);

	if (userData.error) {
		console.log('Käyttäjän tietojen haku Kubioksesta epäonnistui');
		return;
	}
	console.log(userData);
};

const getUserInfoBtn = document.querySelector('.get_user_info');
getUserInfoBtn.addEventListener('click', getUserInfo);

let globalUserData = null;

const getUserData = async () => {
	console.log('Käyttäjän DATA Kubioksesta');

	const url = 'http://localhost:3000/api/kubios-data/user-data';
	const headers = { Authorization: `Bearer ${token}` };
	const options = { headers };
	const userData = await fetchData(url, options);

	if (userData.error) {
		console.log('Käyttäjän tietojen haku Kubioksesta epäonnistui');
		return;
	}
	console.log(userData);

	globalUserData = userData;

	const latest = userData.results.at(-1);
	if (latest && latest.result) {
	  const hrv = latest.result.rmssd_ms;
	  const stress = latest.result.stress_index;
	
	  const latestDate = new Date(latest.daily_result).toDateString();
	  const today = new Date().toDateString();
	
	  if (latestDate === today) {
		let hrvStatus = '–';
		if (hrv < 20) hrvStatus = 'Matala';
		else if (hrv <= 50) hrvStatus = 'Kohtalainen';
		else if (hrv <= 100) hrvStatus = 'Hyvä';
		else hrvStatus = 'Erittäin hyvä';
	
		document.getElementById('hrv-value').textContent = `${hrv.toFixed(1)} ms`;
		document.getElementById('hrv-status').textContent = hrvStatus;
		document.getElementById('stress-level').textContent = `${stress.toFixed(1)} (indeksi)`;
	
		const shortStatus = hrvStatus.split(" ")[0].toLowerCase();
		localStorage.setItem("todayHRVStatus", shortStatus);
		localStorage.setItem("todayHRVDate", today);
	  }
	
	  const allHRV = userData.results
		.map(r => r?.result?.rmssd_ms)
		.filter(val => typeof val === 'number');
	  if (allHRV.length > 0) {
		const avg = allHRV.reduce((a, b) => a + b, 0) / allHRV.length;
		document.getElementById('hrv-avg').textContent = `${avg.toFixed(1)} ms`;
	  }
	}
	

	drawChart(userData);
	drawFullCalendar(userData);

	updateView('hrv', 'all');
	updateView('avg', 'all');
	updateView('stress', 'all');
	updateView('status', 'all');
};

const getUserDataBtn = document.querySelector('.get_user_data');
getUserDataBtn.addEventListener('click', getUserData);

function filterByDays(data, days) {
	if (days === 'all') return data;
	const cutoff = new Date();
	cutoff.setDate(cutoff.getDate() - days);
	return data.filter(item => new Date(item.daily_result) >= cutoff);
}

function updateView(type, range) {
	if (!globalUserData) return;
  
	// Highlight the active button
	document.querySelectorAll(`.buttons button[data-type="${type}"]`).forEach(btn => {
	  if (btn.getAttribute("data-range") == range) {
		btn.classList.add("active");
	  } else {
		btn.classList.remove("active");
	  }
	});
  
	const filtered = filterByDays(globalUserData.results, range);
  
	if (filtered.length === 0) {
	  if (type === 'hrv') document.getElementById('hrv-value').textContent = '– ei dataa –';
	  if (type === 'avg') document.getElementById('hrv-avg').textContent = '– ei dataa –';
	  if (type === 'stress') document.getElementById('stress-level').textContent = '– ei dataa –';
	  if (type === 'status') document.getElementById('hrv-status').textContent = '– ei dataa –';
	  return;
	}
  
	if (type === 'hrv') {
	  const latest = filtered.at(-1);
	  document.getElementById('hrv-value').textContent = `${latest.result.rmssd_ms.toFixed(1)} ms`;
	}
  
	if (type === 'avg') {
	  const values = filtered.map(r => r.result.rmssd_ms).filter(n => typeof n === 'number');
	  const avg = values.reduce((a, b) => a + b, 0) / values.length;
	  document.getElementById('hrv-avg').textContent = `${avg.toFixed(1)} ms`;
	}
  
	if (type === 'stress') {
	  const latest = filtered.at(-1);
	  document.getElementById('stress-level').textContent = `${latest.result.stress_index.toFixed(1)} (indeksi)`;
	}
  
	if (type === 'status') {
	  const latest = filtered.at(-1);
	  const hrv = latest.result.rmssd_ms;
	  let status = '–';
	  if (hrv < 20) status = 'Matala';
	  else if (hrv <= 50) status = 'Kohtalainen';
	  else if (hrv <= 100) status = 'Hyvä';
	  else status = 'Erittäin hyvä';
	  document.getElementById('hrv-status').textContent = status;
	}
  }
  

window.updateView = updateView;

let chartInstance = null;

const drawChart = (userData, range = 'all') => {
	const results = filterByDays(userData.results, range);

	document.querySelectorAll(`.buttons button[data-type="chart"]`).forEach(btn => {
		if (btn.getAttribute("data-range") == range) {
		btn.classList.add("active");
		} else {
		btn.classList.remove("active");
		}
	});
  

	// 🔁 Clean chart
	if (chartInstance) {
		chartInstance.destroy();
		chartInstance = null;
	}

	if (!results.length) {
		showPopup('– ei dataa valitulla aikavälillä –');
		return;
	}

	const formatter = new Intl.DateTimeFormat('fi-FI', { day: 'numeric', month: 'long' });
	const labels = results.map(r => formatter.format(new Date(r.daily_result)));
	const readiness = results.map(r => r.result.readiness);
	const stressIndex = results.map(r => r.result.stress_index);

	const ctx = document.getElementById('jsChart');
	chartInstance = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{ label: 'readiness', data: readiness, borderWidth: 1, borderColor: 'red' },
				{ label: 'stress index', data: stressIndex, borderWidth: 1, borderColor: 'blue' }
			],
		},
		options: {
			responsive: true,
			locale: 'fi-FI',
			scales: {
				x: { title: { display: true, text: 'Päivä' } },
				y: { beginAtZero: true, title: { display: true, text: 'Readiness / Stressi' } }
			},
		}
	});
	
};


function showPopup(message) {
	const popup = document.getElementById('popup-alert');
	popup.textContent = message;
	popup.style.display = 'block';

	// Reset animation
	popup.classList.remove('popup-alert');
	void popup.offsetWidth; // force reflow
	popup.classList.add('popup-alert');

	// Hide after animation
	setTimeout(() => {
		popup.style.display = 'none';
	}, 3000);
}


function drawFullCalendar(userData) {
	const calendarEl = document.getElementById('calendar2');

	const calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: 'dayGridMonth',
		aspectRatio: 1.5,
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay',
		},
		events: userData.results.map(item => {
			const readiness = item.result.readiness ?? 0;
			const stress = item.result.stress_index ?? 0;
			const hrv = item.result.rmssd_ms ?? null;

			return {
				title: `HRV: ${hrv?.toFixed(1)} ms\nStressi: ${stress.toFixed(1)}`,
				start: item.daily_result,
				color: readiness >= 80 ? '#4CAF50' : '#F44336',
				extendedProps: {
					readiness,
					stress,
					hrv,
				},
			};
		}),
		eventClick(info) {
			console.log('Event clicked:', info.event.extendedProps);
		},
		eventContent(info) {
			const { readiness, stress, hrv } = info.event.extendedProps;

			let emoji = readiness >= 80 ? '💪' : '⚡';
			let hrvStatus = "–";
			if (hrv !== null) {
				if (hrv < 20) hrvStatus = "Matala";
				else if (hrv <= 50) hrvStatus = "Kohtalainen";
				else if (hrv <= 100) hrvStatus = "Hyvä";
				else hrvStatus = "Erittäin hyvä";
			}

			return {
				html: `
					<div style="font-size: 11px;">
						${emoji} HRV: ${hrv?.toFixed(1)} ms<br>
						Stressi: ${stress?.toFixed(1)}<br>
						Taso: ${hrvStatus}
					</div>
				`
			};
		},
	});

	calendar.render();
}


window.addEventListener('DOMContentLoaded', () => {
	getUserData();
});

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }