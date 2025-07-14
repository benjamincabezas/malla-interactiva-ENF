const ramos = [
  // 1° semestre
  { id: "anatomia", nombre: "Anatomía General y del Desarrollo", prereqs: [], semestre: 1 },
  { id: "quimica", nombre: "Química", prereqs: [], semestre: 1 },
  { id: "psicologia", nombre: "Psicología", prereqs: [], semestre: 1 },
  { id: "naturaleza", nombre: "Naturaleza de la Enfermería", prereqs: [], semestre: 1 },
  { id: "saludCultura", nombre: "Salud, Cultura y Sociedad Global", prereqs: [], semestre: 1 },
  { id: "investigacion", nombre: "Metodología de la Investigación", prereqs: [], semestre: 1 },

  // 2° semestre
  { id: "bioquimica", nombre: "Bioquímica Celular", prereqs: ["quimica"], semestre: 2 },
  { id: "bioestadistica", nombre: "Bioestadística", prereqs: [], semestre: 2 },
  { id: "cuidadosI", nombre: "Cuidados de Enfermería I", prereqs: [], semestre: 2 },
  { id: "saludPublica", nombre: "Salud Pública", prereqs: [], semestre: 2 },
  { id: "filosofia", nombre: "Filosofía: ¿Para Qué?", prereqs: [], semestre: 2 },

  // 3° semestre
  { id: "microbiologia", nombre: "Microbiología e Infección Clínica", prereqs: ["bioquimica"], semestre: 3 },
  { id: "fisiologia", nombre: "Fisiología", prereqs: ["bioquimica"], semestre: 3 },
  { id: "cuidadosFam", nombre: "Cuidados de Enfermería de la Persona y Familia", prereqs: [], semestre: 3 },
  { id: "educacionSalud", nombre: "Educación para la Salud", prereqs: ["cuidadosI", "naturaleza"], semestre: 3 },
  { id: "efg3", nombre: "Electivo de Formación General", prereqs: [], semestre: 3 },

  // 4° semestre
  { id: "farmacologia", nombre: "Farmacología Clínica", prereqs: ["fisiologia"], semestre: 4 },
  { id: "fisiopatologia", nombre: "Fisiopatología General y de Sistemas", prereqs: ["fisiologia"], semestre: 4 },
  { id: "cuidadosII", nombre: "Cuidados de Enfermería II", prereqs: ["naturaleza", "cuidadosI", "saludPublica", "saludCultura"], semestre: 4 },
  { id: "informaticaI", nombre: "Informática en Salud I", prereqs: [], semestre: 4 },
  { id: "gestionI", nombre: "Gestión y Liderazgo I", prereqs: [], semestre: 4 },
  { id: "efg4", nombre: "Electivo de Formación General", prereqs: [], semestre: 4 },

  // 5° semestre
  { id: "adultoMayor", nombre: "Cuidados Adulto y Persona Mayor", prereqs: ["cuidadosII"], semestre: 5 },
  { id: "dimension", nombre: "Dimensión Interpersonal del Cuidado de Enfermería", prereqs: [], semestre: 5 },
  { id: "efg5_1", nombre: "Electivo de Formación General", prereqs: [], semestre: 5 },
  { id: "efg5_2", nombre: "Electivo de Formación General", prereqs: [], semestre: 5 },

  // 6° semestre
  { id: "infancia", nombre: "Cuidados en Infancia y Adolescencia", prereqs: ["cuidadosII"], semestre: 6 },
  { id: "etica", nombre: "Fundamentos Éticos del Ejercicio Profesional", prereqs: [], semestre: 6 },
  { id: "optativo6", nombre: "Optativo de Profundización", prereqs: [], semestre: 6 },
  { id: "efg6", nombre: "Electivo de Formación General", prereqs: [], semestre: 6 },

  // 7° semestre
  { id: "familiar", nombre: "Enfermería en Salud Familiar y Comunitaria", prereqs: ["cuidadosII"], semestre: 7 },
  { id: "mental", nombre: "Cuidados en Salud Mental", prereqs: ["cuidadosII"], semestre: 7 },
  { id: "investigacion7", nombre: "Investigación", prereqs: [], semestre: 7 },
  { id: "efg7", nombre: "Electivo de Formación General", prereqs: [], semestre: 7 },

  // 8° semestre
  { id: "cronicos", nombre: "Cuidados en Personas con Condiciones Crónicas", prereqs: ["adultoMayor", "infancia", "familiar", "mental"], semestre: 8 },
  { id: "informaticaII", nombre: "Informática en Salud II", prereqs: [], semestre: 8 },
  { id: "gestionII", nombre: "Gestión y Liderazgo II", prereqs: [], semestre: 8 },
  { id: "optativo8", nombre: "Optativo de Profundización", prereqs: [], semestre: 8 },
  { id: "efg8", nombre: "Electivo de Formación General", prereqs: [], semestre: 8 },

  // 9° semestre
  { id: "internadoHosp", nombre: "Internado Hospitalario", prereqs: ["cronicos"], semestre: 9 },
  { id: "internadoUrg", nombre: "Internado en Urgencias", prereqs: ["cronicos"], semestre: 9 },

  // 10° semestre
  { id: "internadoAmb", nombre: "Internado Ambulatorio", prereqs: ["internadoHosp", "internadoUrg"], semestre: 10 }
];

const estadoRamos = {};

function renderMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  const totalSemestres = Math.max(...ramos.map(r => r.semestre));

  for (let s = 1; s <= totalSemestres; s++) {
    const contenedorSemestre = document.createElement("div");
    contenedorSemestre.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${s}`;
    contenedorSemestre.appendChild(titulo);

    const contenedorRamos = document.createElement("div");
    contenedorRamos.className = "contenedor-ramos";

    ramos.filter(r => r.semestre === s).forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo";

      const cumplidos = ramo.prereqs.every(id => estadoRamos[id]);
      if (ramo.prereqs.length === 0 || cumplidos) {
        div.classList.add("disponible");
        if (estadoRamos[ramo.id]) {
          div.classList.add("aprobado");
        } else {
          div.classList.add("pendiente");
        }
      } else {
        div.classList.add("bloqueado");
      }

      div.textContent = ramo.nombre;

      if (div.classList.contains("disponible")) {
        div.addEventListener("click", () => toggleAprobado(ramo.id));
      }

      contenedorRamos.appendChild(div);
    });

    contenedorSemestre.appendChild(contenedorRamos);
    malla.appendChild(contenedorSemestre);
  }
}

function toggleAprobado(id) {
  if (estadoRamos[id]) {
    desmarcarConDependientes(id);
  } else {
    estadoRamos[id] = true;
  }
  renderMalla();
}

function desmarcarConDependientes(id) {
  estadoRamos[id] = false;
  ramos.forEach(r => {
    if (r.prereqs.includes(id) && estadoRamos[r.id]) {
      desmarcarConDependientes(r.id);
    }
  });
}

renderMalla();
