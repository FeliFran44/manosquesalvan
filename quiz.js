const preguntas = [
    {
      pregunta: "¿Qué es lo primero que debés hacer al ver a alguien desplomado?",
      opciones: ["Llamar a emergencias", "Comenzar RCP", "Comprobar si responde", "Buscar ayuda médica"],
      correcta: 2
    },
    {
      pregunta: "¿Dónde se colocan las manos para hacer compresiones?",
      opciones: ["En el estómago", "Sobre la frente", "En el centro del pecho", "Debajo del cuello"],
      correcta: 2
    },
    {
      pregunta: "¿Cuántas compresiones se hacen por minuto en un RCP efectivo?",
      opciones: ["60-80", "100-120", "150-180", "80-90"],
      correcta: 1
    },
    {
      pregunta: "¿Qué porcentaje de paros cardíacos ocurre fuera del hospital?",
      opciones: ["10%", "90%", "25%", "50%"],
      correcta: 1
    },
    {
      pregunta: "¿Cuál es la profundidad ideal de las compresiones en adultos?",
      opciones: ["1 cm", "2 cm", "5-6 cm", "10 cm"],
      correcta: 2
    },
    {
      pregunta: "¿Qué significa la 'C' en RCP?",
      opciones: ["Circulación", "Control", "Cuidado", "Contención"],
      correcta: 0
    }
  ];
  
  let indice = 0;
  let timer;
  let tiempoRestante = 10;
  let correctas = 0;
  
  const preguntaDiv = document.getElementById("pregunta");
  const opcionesDiv = document.getElementById("opciones");
  const timerDiv = document.getElementById("timer");
  
  function iniciarQuiz() {
    document.getElementById("intro-quiz").style.display = "none";
    document.getElementById("bloque-preguntas").style.display = "block";
  
    // 🔽 Baja automáticamente hasta el quiz
    document.getElementById("bloque-preguntas").scrollIntoView({ behavior: "smooth" });
  
    indice = 0;
    correctas = 0;
    cargarPregunta();
  }
  

  function cargarPregunta() {
    if (indice >= preguntas.length) {
      mostrarResultado();
      return;
    }
  
    const actual = preguntas[indice];
    preguntaDiv.innerText = actual.pregunta;
    opcionesDiv.innerHTML = "";
  
    actual.opciones.forEach((opcion, i) => {
      const btn = document.createElement("button");
      btn.innerText = opcion;
      btn.classList.add("btn-opcion");
      btn.onclick = () => verificarRespuesta(i);
      opcionesDiv.appendChild(btn);
    });
  
    tiempoRestante = 10;
    timerDiv.innerText = `⏳ ${tiempoRestante}`;
    clearInterval(timer);
    timer = setInterval(() => {
      tiempoRestante--;
      timerDiv.innerText = `⏳ ${tiempoRestante}`;
      if (tiempoRestante <= 0) {
        clearInterval(timer);
        siguientePregunta();
      }
    }, 1000);
  }
  
  function verificarRespuesta(i) {
    if (i === preguntas[indice].correcta) {
      correctas++;
    }
    siguientePregunta();
  }
  
  function siguientePregunta() {
    indice++;
    cargarPregunta();
  }
  
  function mostrarResultado() {
    preguntaDiv.innerHTML = "Terminaste el quiz.";
    opcionesDiv.innerHTML = `
      <p>Respondiste correctamente <strong>${correctas} de ${preguntas.length}</strong> preguntas.</p>
      <h3>¿Viste lo difícil que es pensar bajo presión?</h3>
      <p>Imaginate si fuera una emergencia real. ¿Estás preparado?</p>
      <a href="manosquesalvan.html" class="btn-impacto">Conocé más sobre Manos que Salvan</a>
    `;
    timerDiv.innerHTML = "";
  }
  