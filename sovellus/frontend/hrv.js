const token = localStorage.getItem("jwtToken");

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
      return { error: errorData.message || "An error occurred" };
    }
    return await response.json();
  } catch (error) {
    console.error("fetchData() error:", error.message);
    return { error: error.message };
  }
};

const getUserInfo = async () => {
  console.log("Käyttäjän INFO Kubioksesta");

  const url = "http://localhost:3000/api/kubios-data/user-info";
  const headers = { Authorization: `Bearer ${token}` };
  const options = { headers };
  const userData = await fetchData(url, options);

  if (userData.error) {
    console.log("Käyttäjän tietojen haku Kubioksesta epäonnistui");
    return;
  }
  console.log(userData);
};

let globalUserData = null;

const getUserData = async () => {
  console.log("Käyttäjän DATA Kubioksesta");

  const url = "http://localhost:3000/api/kubios-data/user-data";
  const headers = { Authorization: `Bearer ${token}` };
  const options = { headers };
  const userData = await fetchData(url, options);

  if (userData.error) {
    console.log("Käyttäjän tietojen haku Kubioksesta epäonnistui");
    return;
  }
  console.log(userData);

  globalUserData = userData;

  const latest = userData.results.at(-1);
  if (latest && latest.result) {
    const hrv = latest.result.rmssd_ms;
    const stress = latest.result.stress_index;

    document.getElementById("hrv-date").textContent =
      `Tallennettu: ${latest.daily_result}`;
    let hrvStatus = "–";
    if (hrv < 20) hrvStatus = "Matala";
    else if (hrv <= 50) hrvStatus = "Kohtalainen";
    else if (hrv <= 100) hrvStatus = "Hyvä";
    else hrvStatus = "Erittäin hyvä";

    document.getElementById("hrv-value").textContent = `${hrv.toFixed(1)} ms`;
    document.getElementById("hrv-status").textContent = hrvStatus;
    document.getElementById("hrv-status-date").textContent =
      `Tallennettu: ${latest.daily_result}`;
    document.getElementById("stress-level").textContent =
      `${stress.toFixed(1)} (indeksi)`;
    document.getElementById("stress-date").textContent =
      `Tallennettu: ${latest.daily_result}`;
    document.getElementById("readiness-value").textContent =
      `${latest.result.readiness.toFixed(1)} %`;
    document.getElementById("readiness-date").textContent =
      `Tallennettu: ${latest.daily_result}`;

    const shortStatus = hrvStatus.split(" ")[0].toLowerCase();
    localStorage.setItem("todayHRVStatus", shortStatus);
    localStorage.setItem("todayHRVDate", latest.daily_result);

    const allHRV = userData.results
      .map((r) => r?.result?.rmssd_ms)
      .filter((val) => typeof val === "number");
    if (allHRV.length > 0) {
      const avg = allHRV.reduce((a, b) => a + b, 0) / allHRV.length;
      document.getElementById("hrv-avg").textContent = `${avg.toFixed(1)} ms`;
    }
  }

  drawChart(userData);
  drawFullCalendar(userData);

  updateView("hrv", "all");
  updateView("avg", "all");
  updateView("stress", "all");
  updateView("status", "all");
  updateView("stressAvg", "all");
  updateView("statusAvg", "all");
  updateView("readiness", "all");
  updateView("readinessAvg", "all");
  updateView("bpmAvg", 1);
};

function filterByDays(data, days) {
  if (days === "all") return data;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return data.filter((item) => new Date(item.daily_result) >= cutoff);
}

function updateView(type, range) {
  if (!globalUserData) return;

  document
    .querySelectorAll(`.buttons button[data-type="${type}"]`)
    .forEach((btn) => {
      if (btn.getAttribute("data-range") == range) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

  const filtered = filterByDays(globalUserData.results, range);

  if (filtered.length === 0) {
    if (type === "hrv")
      document.getElementById("hrv-value").textContent = "– ei dataa –";
    if (type === "avg")
      document.getElementById("hrv-avg").textContent = "– ei dataa –";
    if (type === "stress")
      document.getElementById("stress-level").textContent = "– ei dataa –";
    if (type === "status")
      document.getElementById("hrv-status").textContent = "– ei dataa –";
    if (type === "stressAvg")
      document.getElementById("stress-avg").textContent = "– ei dataa –";
    if (type === "statusAvg")
      document.getElementById("hrv-status-avg").textContent = "– ei dataa –";
    if (type === "readiness")
      document.getElementById("readiness-value").textContent = "– ei dataa –";
    if (type === "readinessAvg")
      document.getElementById("readiness-avg").textContent = "– ei dataa –";
    if (type === "bpmAvg")
      document.getElementById("bpm-avg").textContent = "– ei dataa –";
    return;
  }

  if (type === "hrv") {
    const latest = filtered.at(-1);
    document.getElementById("hrv-value").textContent =
      `${latest.result.rmssd_ms.toFixed(1)} ms`;
  }

  if (type === "avg") {
    const values = filtered
      .map((r) => r.result.rmssd_ms)
      .filter((n) => typeof n === "number");
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    document.getElementById("hrv-avg").textContent = `${avg.toFixed(1)} ms`;
  }

  if (type === "stress") {
    const latest = filtered.at(-1);
    document.getElementById("stress-level").textContent =
      `${latest.result.stress_index.toFixed(1)} (indeksi)`;
  }

  if (type === "status") {
    const latest = filtered.at(-1);
    const hrv = latest.result.rmssd_ms;
    let status = "–";
    if (hrv < 20) status = "Matala";
    else if (hrv <= 50) status = "Kohtalainen";
    else if (hrv <= 100) status = "Hyvä";
    else status = "Erittäin hyvä";
    document.getElementById("hrv-status").textContent = status;
  }

  if (type === "stressAvg") {
    const values = filtered
      .map((r) => r.result.stress_index)
      .filter((n) => typeof n === "number");
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    document.getElementById("stress-avg").textContent =
      `${avg.toFixed(1)} (indeksi)`;
  }

  if (type === "statusAvg") {
    const values = filtered
      .map((r) => r.result.rmssd_ms)
      .filter((n) => typeof n === "number");
    const avg = values.reduce((a, b) => a + b, 0) / values.length;

    let avgStatus = "–";
    if (avg < 20) avgStatus = "Matala";
    else if (avg <= 50) avgStatus = "Kohtalainen";
    else if (avg <= 100) avgStatus = "Hyvä";
    else avgStatus = "Erittäin hyvä";

    document.getElementById("hrv-status-avg").textContent = avgStatus;
  }

  if (type === "readiness") {
    const latest = filtered.at(-1);
    document.getElementById("readiness-value").textContent =
      latest.result.readiness != null
        ? `${latest.result.readiness.toFixed(1)} %`
        : "– ei dataa –";
  }

  if (type === "readinessAvg") {
    const values = filtered
      .map((r) => r.result.readiness)
      .filter((n) => typeof n === "number");
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    document.getElementById("readiness-avg").textContent =
      `${avg.toFixed(1)} %`;
  }

  if (type === "bpmAvg") {
    const values = filtered
      .map((r) => r.result.mean_hr_bpm)
      .filter((n) => typeof n === "number");
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    document.getElementById("bpm-avg").textContent = `${avg.toFixed(1)} bpm`;
  }
}

window.updateView = updateView;

let chartInstance = null;

const drawChart = (userData, range = "all") => {
  const results = filterByDays(userData.results, range).filter((r) => {
    const validDate = r.daily_result && !isNaN(new Date(r.daily_result));
    const res = r.result || {};
    const hasData = [
      "rmssd_ms",
      "readiness",
      "stress_index",
      "mean_hr_bpm",
    ].some((key) => typeof res[key] === "number");
    return validDate && hasData;
  });

  document
    .querySelectorAll('.buttons button[data-type="chart"]')
    .forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-range") === String(range)) {
        btn.classList.add("active");
      }
    });

  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  if (!results.length) {
    showPopup("– ei dataa valitulla aikavälillä –");
    return;
  }

  const formatter = new Intl.DateTimeFormat("fi-FI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const labels = results.map((r) => formatter.format(new Date(r.daily_result)));
  const rmssd = results.map((r) => r.result?.rmssd_ms ?? null);
  const readiness = results.map((r) => r.result?.readiness ?? null);
  const stress = results.map((r) => r.result?.stress_index ?? null);
  const heartRate = results.map((r) => r.result?.mean_hr_bpm ?? null);

  const ctx = document.getElementById("jsChart");
  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "HRV (RMSSD)",
          data: rmssd,
          borderColor: "#0077b6",
          borderWidth: 1,
        },
        {
          label: "Valmiustaso",
          data: readiness,
          borderColor: "#52b788",
          borderWidth: 1,
        },
        {
          label: "Stressi-indeksi",
          data: stress,
          borderColor: "#ef476f",
          borderWidth: 1,
        },
        {
          label: "Syke (BPM)",
          data: heartRate,
          borderColor: "#ff9f1c",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      locale: "fi-FI",
      interaction: {
        mode: "index",
        intersect: false,
      },
    },
  });
};

function showPopup(message) {
  const popup = document.getElementById("popup-alert");
  popup.textContent = message;
  popup.style.display = "block";

  popup.classList.remove("popup-alert");
  void popup.offsetWidth;
  popup.classList.add("popup-alert");

  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

function drawFullCalendar(userData) {
  const calendarEl = document.getElementById("calendar2");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "fi",
    initialView: "dayGridMonth",
    aspectRatio: 1.5,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    titleFormat: { year: "numeric", month: "numeric" },
    dayHeaderFormat: { weekday: "long" },
    events: userData.results.map((item) => {
      const readiness = item.result.readiness ?? 0;
      const stress = item.result.stress_index ?? 0;
      const hrv = item.result.rmssd_ms ?? null;

      let color = "#ccc";
      if (hrv !== null) {
        if (hrv < 20) color = "#ef476f";
        else if (hrv <= 50) color = "#4e6d8d";
        else if (hrv <= 100) color = "#fabc65";
        else color = "#52b788";
      }

      return {
        title: `HRV: ${hrv?.toFixed(1)} ms\nStressi: ${stress.toFixed(1)}\nValmius: ${readiness?.toFixed(1)}%`,
        start: item.daily_result,
        color,
        extendedProps: { readiness, stress, hrv },
      };
    }),

    eventClick(info) {
      console.log("Event clicked:", info.event.extendedProps);
    },
    eventContent(info) {
      const { readiness, stress, hrv } = info.event.extendedProps;
      let emoji = readiness >= 80 ? "" : "";
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
						Valmius: ${readiness?.toFixed(1)}%<br>
						Taso: ${hrvStatus}<br>
					</div>
				`,
      };
    },
  });

  calendar.render();
}

window.addEventListener("DOMContentLoaded", () => {
  getUserData();
});

function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}
