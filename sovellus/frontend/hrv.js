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
      return {error: errorData.message || 'An error occurred'};
    }
    return await response.json(); // Return successful response data
  } catch (error) {
    console.error('fetchData() error:', error.message);
    return {error: error.message};
  }
};

const getUserInfo = async () => {
  console.log('Käyttäjän INFO Kubioksesta');

  const url = 'http://localhost:3000/api/kubios-data/user-info';
  const token = localStorage.getItem('jwtToken');
  const headers = { Authorization: `Bearer ${token}` };
  const options = {
    headers: headers,
  };
  const userData = await fetchData(url, options);

  if (userData.error) {
    console.log('Käyttäjän tietojen haku Kubioksesta epäonnistui');
    return;
  }
  console.log(userData);
};

const getUserInfoBtn = document.querySelector('.get_user_info');
getUserInfoBtn.addEventListener('click', getUserInfo);

const drawChart = async (userData) => {
	


	// You need to formulate data into correct structure in the BE
	// OR you can extract the data here in FE from one or multiple sources
	// Extract data: https://www.w3schools.com/jsref/jsref_map.asp

	// Labels

	const formatter = new Intl.DateTimeFormat('fi-FI', { day: 'numeric', month: 'long' });
	const labels = userData.results.map((rivi) => formatter.format(new Date(rivi.daily_result)));

	// Ilman formulointia
	//const labels = userData.results.map((rivi) => rivi.daily_result);

	// Line 1
	const readiness = userData.results.map((rivi) => rivi.result.readiness);
	// Line 2
	const stressIndex = userData.results.map((rivi) => rivi.result.stress_index);

	// Create the chart
	// https://www.chartjs.org/docs/latest/charts/line.html
	// https://www.chartjs.org/docs/latest/samples/line/line.html

	const ctx = document.getElementById('jsChart');

	new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'readiness',
					data: readiness,
					borderWidth: 1,
					borderColor: 'red',
				},
				{
					label: 'stress index',
					data: stressIndex,
					borderWidth: 1,
					borderColor: 'blue',
				},
			],
		},
		options: {
			responsive: true,
			locale: 'fi-FI',
			scales: {
				x: {
					title: {
						display: true,
						text: 'Day',
					},
				},
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: 'Readiness / Stress',
					},
				},
			},
		},
	});

	// Add necessary adapters
	// https://github.com/chartjs/awesome#adapters
};

const getUserData = async () => {
	console.log('Käyttäjän DATA Kubioksesta');
/*
	const url = 'http://localhost:3000/api/kubios-data/user-data';
	const token = localStorage.getItem('jwtToken');
	const headers = { Authorization: `Bearer ${token}` };
	const options = {
		headers: headers,
	};
	const userData = await fetchData(url, options);
//*/
const url = 'mockdata.json';
const userData = await fetchData(url);

	if (userData.error) {
		console.log('Käyttäjän tietojen haku Kubioksesta epäonnistui');
		return;
	}
	console.log(userData);

	// Draw chart with chart.js
	drawChart(userData);

};

const getUserDataBtn = document.querySelector('.get_user_data');
getUserDataBtn.addEventListener('click', getUserData);

// Let us try these together
