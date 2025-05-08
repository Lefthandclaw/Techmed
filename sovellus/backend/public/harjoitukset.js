function logout() {
  localStorage.removeItem('jwtToken');
  window.location.replace("index.html");
}

const exerciseData = {
  matala: [
    {
      title: "Kevyt venyttely",
      duration: "10min",
      steps: ["1. Etsi hiljainen tila", "2. Seuraa ohjattua venytystä"],
      audio: "audio/matala-he.mp3"
    },
    {
      title: "Rauhoittava hengitys",
      duration: "7min",
      steps: ["1. Istu tai makaa mukavasti", "2. Hengitä syvään ja kuuntele"],
      audio: "audio/matala-me.mp3"
    }
  ],
  kohtalainen: [
    {
      title: "Hengitys harjoitus",
      duration: "8min",
      steps: ["1. Istaudu mukavasti alas", "2. Kuuntele äänite"],
      audio: "audio/kohtalainen-he.mp3"
    },
    {
      title: "Meditaatio harjoitus",
      duration: "5min",
      steps: ["1. Istaudu lattialle maton päälle", "2. Kuuntele äänite"],
      audio: "audio/kohtalainen-me.mp3"
    }
  ],
  hyvä: [
    {
      title: "Keskivahva meditaatio",
      duration: "6min",
      steps: ["1. Asetu mukavasti", "2. Kuuntele ohjattua meditaatiota"],
      audio: "audio/hyva-he.mp3"
    },
    {
      title: "Mindfulness harjoitus",
      duration: "6min",
      steps: ["1. Keskity ääniin ympärilläsi", "2. Seuraa ääntä"],
      audio: "audio/hyva-me.mp3"
    }
  ],
  erittäin: [
    {
      title: "Syvämeditaatio",
      duration: "12min",
      steps: ["1. Sulje silmät", "2. Syvenny hengitykseen"],
      audio: "audio/erittain-he.mp3"
    },
    {
      title: "Joogaharjoitus",
      duration: "10min",
      steps: ["1. Avaa tila joogalle", "2. Seuraa ohjeita ja hengitä"],
      audio: "audio/erittain-me.mp3"
    }
  ]
};

function updateExercises() {
  const level = document.getElementById("hrv-level").value;
  const container = document.getElementById("exercise-container");
  container.innerHTML = "";

  const exercises = exerciseData[level];
  if (!exercises) {
    container.innerHTML = "<p>Ei harjoituksia tälle tasolle.</p>";
    return;
  }

  exercises.forEach(ex => {
    const column = document.createElement("div");
    column.className = "exercise-column";
    column.innerHTML = `
      <div class="exercise-title">
        <span><em>${ex.title}</em></span>
        <span><em>Kesto: ${ex.duration}</em></span>
      </div>
      <div class="exercise-content">
        <p><em>${ex.steps[0]}</em></p>
        <p><em>${ex.steps[1]}</em></p>
        <audio controls>
          <source src="${ex.audio}" type="audio/mpeg" />
          Selaimesi ei tue äänitoistinta.
        </audio>
      </div>
    `;
    container.appendChild(column);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("hrv-level");
  const autoButton = document.getElementById("auto-select-btn");

autoButton.addEventListener("click", () => {
  const savedStatus = localStorage.getItem("todayHRVStatus");
  const savedDate = localStorage.getItem("todayHRVDate");

  const today = new Date().toISOString().split("T")[0]; // e.g., "2024-05-07"

  const isToday = savedDate === today;

  if (savedStatus && isToday && exerciseData[savedStatus]) {
    select.value = savedStatus;
    updateExercises();
  } else {
    showPopup("Päivän HRV-tasoa ei löytynyt. Käy ensin HRV sivulla.");
  }
});

  select.addEventListener("change", updateExercises);
  updateExercises();
});

function showPopup(message) {
  const popup = document.getElementById("popup");
  const msg = document.getElementById("popup-message");

  msg.textContent = message;
  popup.classList.add("show");
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("show");
}

function updateTodayDate() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const dateEl = document.getElementById("today-date");
  if (dateEl) {
    dateEl.innerHTML = `<em>Päivän ${day}.${month}.</em>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateTodayDate();
});
