function logout() {
    localStorage.removeItem('jwtToken');
    window.location.replace("index.html");
  }
  
  const exerciseData = {
    normaali: [
      {
        title: "Hengitys harjoitus",
        duration: "8min",
        steps: ["1. Istaudu mukavasti alas", "2. Kuuntele äänite"],
        audio: "breathing.mp3"
      },
      {
        title: "Meditaatio harjoitus",
        duration: "5min",
        steps: ["1. Istaudu lattialle maton päälle", "2. Kuuntele äänite"],
        audio: "meditation.mp3"
      }
    ],
    matala: [
      {
        title: "Kevyt venyttely",
        duration: "10min",
        steps: ["1. Etsi hiljainen tila", "2. Seuraa ohjattua venytystä"],
        audio: "stretch.mp3"
      },
      {
        title: "Rauhoittava hengitys",
        duration: "7min",
        steps: ["1. Istu tai makaa mukavasti", "2. Hengitä syvään ja kuuntele"],
        audio: "calm-breathing.mp3"
      }
    ],
    hyvä: [
      {
        title: "Keskivahva meditaatio",
        duration: "6min",
        steps: ["1. Asetu mukavasti", "2. Kuuntele ohjattua meditaatiota"],
        audio: "mid-meditation.mp3"
      },
      {
        title: "Mindfulness harjoitus",
        duration: "6min",
        steps: ["1. Keskity ääniin ympärilläsi", "2. Seuraa ääntä"],
        audio: "mindfulness.mp3"
      }
    ],
    erittäin: [
      {
        title: "Syvämeditaatio",
        duration: "12min",
        steps: ["1. Sulje silmät", "2. Syvenny hengitykseen"],
        audio: "deep-meditation.mp3"
      },
      {
        title: "Joogaharjoitus",
        duration: "10min",
        steps: ["1. Avaa tila joogalle", "2. Seuraa ohjeita ja hengitä"],
        audio: "yoga.mp3"
      }
    ]
  };
  
  function updateExercises() {
    const level = document.getElementById("hrv-level").value;
    const container = document.getElementById("exercise-container");
    container.innerHTML = "";
  
    const exercises = exerciseData[level];
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
    document.getElementById("hrv-level").addEventListener("change", updateExercises);
    updateExercises();
  });
  