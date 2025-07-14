const ramos = [
  { id: "anatomia", nombre: "Anatomía General y del Desarrollo", prereqs: [], semestre: 1 },
  { id: "quimica", nombre: "Química", prereqs: [], semestre: 1 },
  { id: "psicologia", nombre: "Psicología", prereqs: [], semestre: 1 },
  { id: "naturaleza", nombre: "Naturaleza de la Enfermería", prereqs: [], semestre: 1 },
  { id: "saludCultura", nombre: "Salud, Cultura y Sociedad Global", prereqs: [], semestre: 1 },
  { id: "investigacion", nombre: "Metodología de la Investigación", prereqs: [], semestre: 1 },

  { id: "bioquimica", nombre: "Bioquímica Celular", prereqs: ["quimica"], semestre: 2 },
  { id: "bioestadistica", nombre: "Bioestadística", prereqs: [], semestre: 2 },
  { id: "cuidadosI", nombre: "Cuidados de Enfermería I", prereqs: [], semestre: 2 },
  { id: "saludPublica", nombre: "Salud Pública", prereqs: [], semestre: 2 },

  { id: "microbiologia", nombre: "Microbiología e Infección Clínica", prereqs: ["bioquimica"], semestre: 3 },
  { id: "fisiologia", nombre: "Fisiología", prereqs: ["bioquimica"], semestre: 3 },
  { id: "cuidadosFam", nombre: "Cuidados de Enfermería de la Persona y Familia", prereqs: [], semestre: 3 },
  { id: "educacionSalud", nombre: "Educación para la Salud", prereqs: ["cuidadosI", "naturaleza"], semestre: 3 },
  { id: "efg3", nombre: "Electivo de Formación General", prereqs: [], semestre: 3 },

  { id: "farmacologia", nombre: "Farmacología Clínica", prereqs: ["fisiologia"], semestre: 4 },
  { id: "fisiopatologia", nombre: "Fisiopatología General y de Sistemas", prereqs: ["fisiologia"], semestre: 4 },
  { id: "cuidadosII", nombre: "Cuidados de Enfermería II", prereqs: ["naturaleza", "cuidadosI", "saludPublica", "saludCultura"], semestre: 4 },
  { id: "efg4", nombre: "Electivo de Formación General", prereqs: [], semestre: 4 },

  { id: "adultoMayor", nombre: "Cuidados Adulto y Persona Mayor", prereqs: ["cuidadosII"], semestre: 5 },
  { id: "efg5_1", nombre: "Electivo de Formación General", prereqs: [], semestre: 5 },
  { id: "efg5_2", nombre: "Electivo de Formación General", prereqs: [], semestre: 5 },

  { id: "infancia", nombre: "Cuidados en Infancia y Adolescencia", prereqs: ["cuidadosII"], semestre: 6 },
  { id: "efg6", nombre: "Electivo de Formación General", prereqs: [], semestre: 6 },

  { id: "familiar", nombre: "Enfermería Familiar y Comunitaria", prereqs: ["cuidadosII"], semestre: 7 },
  { id: "mental", nombre: "Cuidados en Salud Mental", prereqs: ["cuidadosII"], semestre: 7 },
  { id: "efg7", nombre: "Electivo de Formación General", prereqs: [], semestre: 7 },

  { id: "cronicos", nombre: "Cuidados Condiciones Crónicas", prereqs: ["adultoMayor", "infancia", "familiar", "mental"], semestre: 8 },
  { id: "efg8", nombre: "Electivo de Formación General", prereqs: [], semestre: 8 },

  { id: "internadoHosp", nombre: "Internado Hospitalario", prereqs: ["cronicos"], semestre: 9 },
  { id: "internadoUrg", nombre: "Internado Urgencias", prereqs: ["cronicos"], semestre: 9 },
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
