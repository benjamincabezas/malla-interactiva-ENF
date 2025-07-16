const ramos = [
  // 1° semestre
  { id: "anatomia", nombre: "Anatomía General y del Desarrollo", prereqs: [], semestre: 1 },
  { id: "quimica", nombre: "Química", prereqs: [], semestre: 1 },
  { id: "psicologia", nombre: "Psicología", prereqs: [], semestre: 1 },
  { id: "naturaleza", nombre: "Naturaleza de la Enfermería", prereqs: [], semestre: 1 },
  { id: "saludCultura", nombre: "Salud, Cultura y Sociedad Global", prereqs: [], semestre: 1 },
  { id: "investigacionBase", nombre: "Metodología de la Investigación", prereqs: [], semestre: 1 },

  // 2° semestre
  { id: "bioquimica", nombre: "Bioquímica Celular", prereqs: ["quimica"], semestre: 2 },
  { id: "bioestadistica", nombre: "Bioestadística", prereqs: [], semestre: 2 },
  { id: "cuidadosI", nombre: "Cuidados de Enfermería I", prereqs: ["anatomia"], semestre: 2 },
  { id: "saludPublica", nombre: "Salud Pública", prereqs: [], semestre: 2 },
  { id: "filosofia", nombre: "Filosofía: ¿Para Qué?", prereqs: [], semestre: 2 },

  // 3° semestre
  { id: "microbiologia", nombre: "Microbiología e Infectología", prereqs: ["bioquimica"], semestre: 3 },
  { id: "fisiologia", nombre: "Fisiología", prereqs: ["quimica", "anatomia"], semestre: 3 },
  { id: "cuidadosFam", nombre: "Cuidados de la Persona y Familia", prereqs: ["saludCultura", "naturaleza", "cuidadosI", "saludPublica"], semestre: 3 },
  { id: "efg3", nombre: "Electivo de Formación General", prereqs: [], semestre: 3 },

  // 4° semestre
  { id: "farmacologia", nombre: "Farmacología Clínica", prereqs: ["fisiologia", "microbiologia"], semestre: 4 },
  { id: "fisiopatologia", nombre: "Fisiopatología", prereqs: ["fisiologia", "microbiologia"], semestre: 4 },
  { id: "educacionSalud", nombre: "Educación para la Salud", prereqs: ["cuidadosI", "naturaleza"], semestre: 4 },
  { id: "cuidadosII", nombre: "Cuidados de Enfermería II", prereqs: ["saludPublica", "saludCultura", "naturaleza", "cuidadosI"], semestre: 4 },
  { id: "informaticaI", nombre: "Informática en Salud I", prereqs: [], semestre: 4 },
  { id: "gestionI", nombre: "Gestión y Liderazgo I", prereqs: [], semestre: 4 },
  { id: "efg4", nombre: "Electivo de Formación General", prereqs: [], semestre: 4 },

  // 5° semestre
  { id: "adulto", nombre: "CE del Adulto y Persona Mayor", prereqs: ["cuidadosII"], semestre: 5 },
  { id: "infancia", nombre: "CE de la Infancia y Adolescencia", prereqs: ["fisiopatologia", "cuidadosFam", "farmacologia"], semestre: 5 },
  { id: "dimension", nombre: "Dimensión Interpersonal", prereqs: ["cuidadosII", "cuidadosFam"], semestre: 5 },
  { id: "efg5_1", nombre: "Electivo de Formación General", prereqs: [], semestre: 5 },
  { id: "efg5_2", nombre: "Electivo de Formación General", prereqs: [], semestre: 5 },

  // 6° semestre
  { id: "cronicos", nombre: "CE en Personas con Condiciones Crónicas", prereqs: ["cuidadosII"], semestre: 6 },
  { id: "etica", nombre: "Fundamentos Éticos", prereqs: ["cuidadosII", "cuidadosFam"], semestre: 6 },
  { id: "optativo6", nombre: "Optativo de Profundización", prereqs: [], semestre: 6 },
  { id: "efg6", nombre: "Electivo de Formación General", prereqs: [], semestre: 6 },

  // 7° semestre
  { id: "familiar", nombre: "Salud Familiar y Comunitaria", prereqs: ["dimension", "etica"], semestre: 7 },
  { id: "mental", nombre: "CE en Salud Mental", prereqs: ["etica", "infancia", "dimension"], semestre: 7 },
  { id: "investigacion7", nombre: "Investigación", prereqs: ["investigacionBase", "etica"], semestre: 7 },
  { id: "efg7", nombre: "Electivo de Formación General", prereqs: [], semestre: 7 },

  // 8° semestre
  { id: "informaticaII", nombre: "Informática en Salud II", prereqs: ["familiar", "informaticaI"], semestre: 8 },
  { id: "gestionII", nombre: "Gestión y Liderazgo II", prereqs: ["gestionI", "etica"], semestre: 8 },
  { id: "optativo8", nombre: "Optativo de Profundización", prereqs: [], semestre: 8 },
  { id: "efg8", nombre: "Electivo de Formación General", prereqs: [], semestre: 8 },

  // 9° semestre
  { id: "internadoHosp", nombre: "Internado Hospitalario", prereqs: ["adulto", "infancia", "mental", "cronicos", "familiar"], semestre: 9 },
  { id: "internadoUrg", nombre: "Internado en Urgencias", prereqs: ["adulto", "infancia", "mental", "cronicos", "familiar"], semestre: 9 },

  // 10° semestre
  { id: "internadoAmb", nombre: "Internado Ambulatorio", prereqs: ["internadoHosp", "internadoUrg"], semestre: 10 },
  { id: "internadoElectivo", nombre: "Internado Electivo", prereqs: ["internadoHosp", "internadoUrg"], semestre: 10 }
];

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos") || '{}');

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
        div.addEventListener("click", () => toggleAprobado(ramo.id));
      } else {
        div.classList.add("bloqueado");
        div.title = "Requiere: " + ramo.prereqs.map(id => {
          const r = ramos.find(r => r.id === id);
          return r ? r.nombre : id;
        }).join(", ");
      }

      div.textContent = ramo.nombre;
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
  localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
  renderMalla();
}

function desmarcarConDependientes(id) {
  estadoRamos[id] = false;
  ramos.forEach(r => {
    if (r.prereqs.includes(id) && estadoRamos[r.id]) {
      desmarcarConDependientes(r.id);
    }
  });
  localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
}

renderMalla();

// Autor: Benjamin Cabezas Marín
