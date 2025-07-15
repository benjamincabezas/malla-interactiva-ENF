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
  { id: "cuidadosI", nombre: "Cuidados de Enfermería I", prereqs: ["anatomia"], semestre: 2 },
  { id: "saludPublica", nombre: "Salud Pública", prereqs: [], semestre: 2 },
  { id: "filosofia", nombre: "Filosofía: ¿Para Qué?", prereqs: [], semestre: 2 },

  // 3° semestre
  { id: "microbiologia", nombre: "Microbiología e Infectología", prereqs: ["bioquimica"], semestre: 3 },
  { id: "fisiologia", nombre: "Fisiología", prereqs: ["quimica"], semestre: 3 },
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
  { id: "efg5_1", nombre: "Electivo de Formación General", prereqs: [], se_
