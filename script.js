const ramos = [
  { id: "anatomia", nombre: "Anatomía General y del Desarrollo", prereqs: [], semestre: 1 },
  { id: "quimica", nombre: "Química", prereqs: [], semestre: 1 },
  { id: "psicologia", nombre: "Psicología", prereqs: [], semestre: 1 },
  { id: "naturaleza", nombre: "Naturaleza de la Enfermería", prereqs: [], semestre: 1 },
  { id: "saludCultura", nombre: "Salud, Cultura y Sociedad Global", prereqs: [], semestre: 1 },
  { id: "investigacionBase", nombre: "Metodología de la Investigación", prereqs: [], semestre: 1 },

  { id: "bioquimica", nombre: "Bioquímica Celular", prereqs: ["quimica"], semestre: 2 },
  { id: "bioestadistica", nombre: "Bioestadística", prereqs: [], semestre: 2 },
  { id: "cuidadosI", nombre: "Cuidados de Enfermería I", prereqs: ["anatomia"], semestre: 2 },
  { id: "saludPublica", nombre: "Salud Pública", prereqs: [], semestre: 2 },
  { id: "filosofia", nombre: "Filosofía: ¿Para Qué?", prereqs: [], semestre: 2 },

  { id: "microbiologia", nombre: "Microbiología e Infectología", prereqs: ["bioquimica"], semestre: 3 },
  { id: "fisiologia", nombre: "Fisiología", prereqs: ["quimica", "anatomia"], semestre: 3 },
  { id: "cuidadosFam", nombre: "Cuidados de la Persona y Familia", prereqs: ["saludCultura", "naturaleza", "cuidadosI", "saludPublica"], semestre: 3 },
  { id: "efg3", nombre: "Electivo de Formación General", prereqs: [], semestre: 3 },

  { id: "farmacologia", nombre: "Farmacología Clínica", prereqs: ["fisiologia", "microbiologia"], semestre: 4 },
  { id: "fisiopatologia", nombre: "Fisiopatología", prereqs: ["fisiologia", "microbiologia"], semestre: 4 },
  { id: "educacionSalud", nombre: "Educación para la Salud", prereqs: ["cuidadosI", "naturaleza"], semestre: 4 },
  { id: "cuidadosII", nombre: "Cuidados de Enfermería II", prereqs: ["saludPublica", "saludCultura", "naturaleza", "cuidadosI"], semestre: 4 },
  { id: "informaticaI", nombre: "Informática en Salud I", prereqs: [], semestre: 4 },
  { id: "gestionI", nombre: "Gestión y Liderazgo I", prereqs: [], semestre: 4 },
  { id: "efg4", nombre: "Electivo de Formación General", prereqs: [], semestre: 4 },
];

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};

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
      const faltantes = ramo.prereqs.filter(id => !estadoRamos[id]);

      if (ramo.prereqs.length === 0 || cumplidos) {
        div.classList.add("disponible");
        if (estadoRamos[ramo.id]) {
          div.classList.add("aprobado");
        } else {
          div.classList.add("pendiente");
        }
      } else {
        div.classList.add("bloqueado");
        div.setAttribute("data-tooltip", `Falta: ${faltantes.map(id => getNombreRamo(id)).join(", ")}`);
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

  localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
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

function getNombreRamo(id) {
  const ramo = ramos.find(r => r.id === id);
  return ramo ? ramo.nombre : id;
}

renderMalla();
