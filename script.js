const ramos = [
  { id: "anatomia", nombre: "Anatomía General y del Desarrollo", prereqs: [] },
  { id: "quimica", nombre: "Química", prereqs: [] },
  { id: "psicologia", nombre: "Psicología", prereqs: [] },
  { id: "naturaleza", nombre: "Naturaleza de la Enfermería", prereqs: [] },
  { id: "saludCultura", nombre: "Salud, Cultura y Sociedad Global", prereqs: [] },
  { id: "investigacion", nombre: "Metodología de la Investigación", prereqs: [] },
  { id: "bioquimica", nombre: "Bioquímica Celular", prereqs: ["quimica"] },
  { id: "bioestadistica", nombre: "Bioestadística", prereqs: [] },
  { id: "cuidadosI", nombre: "Cuidados de Enfermería I", prereqs: [] },
  { id: "saludPublica", nombre: "Salud Pública", prereqs: [] },
  { id: "microbiologia", nombre: "Microbiología e Infección Clínica", prereqs: ["bioquimica"] },
  { id: "fisiologia", nombre: "Fisiología", prereqs: ["bioquimica"] },
  { id: "cuidadosFam", nombre: "Cuidados de Enfermería de la Persona y Familia", prereqs: [] },
  { id: "educacionSalud", nombre: "Educación para la Salud", prereqs: ["cuidadosI", "naturaleza"] },
  { id: "farmacologia", nombre: "Farmacología Clínica", prereqs: ["fisiologia"] },
  { id: "fisiopatologia", nombre: "Fisiopatología General y de Sistemas", prereqs: ["fisiologia"] },
  { id: "cuidadosII", nombre: "Cuidados de Enfermería II", prereqs: ["naturaleza", "cuidadosI", "saludPublica", "saludCultura"] },
  { id: "adultoMayor", nombre: "Cuidados de Enfermería del Adulto y Persona Mayor", prereqs: ["cuidadosII"] },
  { id: "infancia", nombre: "Cuidados de Enfermería en la Infancia y Adolescencia", prereqs: ["cuidadosII"] },
  { id: "familiar", nombre: "Enfermería en Salud Familiar y Comunitaria", prereqs: ["cuidadosII"] },
  { id: "mental", nombre: "Cuidados de Enfermería en Salud Mental", prereqs: ["cuidadosII"] },
  { id: "cronicos", nombre: "Cuidados en Condiciones Crónicas", prereqs: ["adultoMayor", "infancia", "familiar", "mental"] },
  { id: "internadoHosp", nombre: "Internado Hospitalario", prereqs: ["cronicos"] },
  { id: "internadoUrg", nombre: "Internado Urgencias", prereqs: ["cronicos"] },
  { id: "internadoAmb", nombre: "Internado Atención Ambulatoria", prereqs: ["internadoHosp", "internadoUrg"] }
];

const estadoRamos = {};

function renderMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  ramos.forEach(ramo => {
    const div = document.createElement("div");
    div.className = "ramo";

    const cumplidos = ramo.prereqs.every(id => estadoRamos[id]);
    if (ramo.prereqs.length === 0 || cumplidos) {
      div.classList.add("disponible");
    } else {
      div.classList.add("bloqueado");
    }

    if (estadoRamos[ramo.id]) {
      div.classList.add("aprobado");
    }

    div.textContent = ramo.nombre;

    if (div.classList.contains("disponible")) {
      div.addEventListener("click", () => toggleAprobado(ramo.id));
    }

    malla.appendChild(div);
  });
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
