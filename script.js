const ramos = [
    // 1° Semestre
    { id: 'ANAT', nombre: 'Anatomía General y del Desarrollo', requisitos: [] },
    { id: 'QUI', nombre: 'Química', requisitos: [] },
    { id: 'PSI', nombre: 'Psicología', requisitos: [] },
    { id: 'NAT', nombre: 'Naturaleza de la Enfermería', requisitos: [] },
    { id: 'SCG', nombre: 'Salud, Cultura y Sociedad Global', requisitos: [] },
    { id: 'MET', nombre: 'Metodología de la Investigación', requisitos: [] },

    // 2° Semestre
    { id: 'BIOC', nombre: 'Bioquímica Celular', requisitos: ['QUI'] },
    { id: 'BIOE', nombre: 'Bioestadística', requisitos: [] },
    { id: 'CE1', nombre: 'Cuidados de Enfermería I', requisitos: ['NAT'] },
    { id: 'SPU', nombre: 'Salud Pública', requisitos: [] },
    { id: 'FIL', nombre: 'Filosofía', requisitos: [] },
    { id: 'TEO', nombre: 'Teológico', requisitos: [] },

    // 3° Semestre
    { id: 'MIC', nombre: 'Microbiología e Infectología Clínica', requisitos: ['BIOC'] },
    { id: 'FISIO', nombre: 'Fisiología', requisitos: ['BIOC'] },
    { id: 'CEP', nombre: 'C.E. de la Persona y Familia', requisitos: ['CE1'] },
    { id: 'EPS', nombre: 'Educación para la Salud', requisitos: [] },

    // 4° Semestre
    { id: 'FARMA', nombre: 'Farmacología Clínica', requisitos: ['MIC', 'FISIO'] },
    { id: 'FISIOP', nombre: 'Fisiopatología', requisitos: ['FISIO'] },
    { id: 'CE2', nombre: 'Cuidados de Enfermería II', requisitos: ['CEP'] },
    { id: 'INF1', nombre: 'Informática en Salud', requisitos: [] },
    { id: 'GL1', nombre: 'Gestión y Liderazgo I', requisitos: [] },

    // 5° Semestre
    { id: 'CEA', nombre: 'C.E. del Adulto y Persona Mayor', requisitos: ['CE2', 'FISIOP'] },

    // 6° Semestre
    { id: 'CEI', nombre: 'C.E. de la Infancia y Adolescencia', requisitos: ['CEA'] },

    // 7° Semestre
    { id: 'SFAM', nombre: 'Salud Familiar y Comunitaria', requisitos: ['CEI'] },
    { id: 'CEM', nombre: 'C.E. en Salud Mental', requisitos: ['CEI'] },
    { id: 'INV', nombre: 'Investigación', requisitos: ['MET'] },

    // 8° Semestre
    { id: 'CEC', nombre: 'C.E. en Personas con Condiciones Crónicas', requisitos: ['SFAM', 'CEM'] },
    { id: 'INF2', nombre: 'Informática en Salud II', requisitos: ['INF1'] },
    { id: 'GL2', nombre: 'Gestión y Liderazgo II', requisitos: ['GL1'] },

    // 9° Semestre
    { id: 'INT_HOSP', nombre: 'Internado de Enfermería Hospitalario', requisitos: ['CEC'] },
    { id: 'INT_URG', nombre: 'Internado de Enfermería en Urgencias', requisitos: ['CEC'] },

    // 10° Semestre
    { id: 'INT_AMB', nombre: 'Internado de Enfermería Ambulatorio', requisitos: ['CEC'] },
    { id: 'INT_ELEC', nombre: 'Internado de Enfermería Electivo', requisitos: ['CEC'] },
];

let aprobados = [];

const container = document.getElementById('malla');

function renderMalla() {
    container.innerHTML = '';
    ramos.forEach(ramo => {
        const div = document.createElement('div');
        div.classList.add('ramo');

        if (!ramo.requisitos.every(req => aprobados.includes(req))) {
            div.classList.add('bloqueado');
        }
        if (aprobados.includes(ramo.id)) {
            div.classList.add('aprobado');
        }

        div.textContent = ramo.nombre;
        div.addEventListener('click', () => toggleAprobado(ramo.id));
        container.appendChild(div);
    });
}

function toggleAprobado(id) {
    const ramo = ramos.find(r => r.id === id);
    if (!ramo.requisitos.every(req => aprobados.includes(req))) return;

    if (aprobados.includes(id)) {
        aprobados = aprobados.filter(r => r !== id);
        bloqueaDependientes(id);
    } else {
        aprobados.push(id);
    }
    renderMalla();
}

function bloqueaDependientes(id) {
    ramos.forEach(r => {
        if (r.requisitos.includes(id) && aprobados.includes(r.id)) {
            aprobados = aprobados.filter(a => a !== r.id);
            bloqueaDependientes(r.id);
        }
    });
}

renderMalla();

