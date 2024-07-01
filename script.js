document.addEventListener('DOMContentLoaded', () => {
    const formularioNota = document.getElementById('formulario-nota');
    const listaNotas = document.getElementById('lista-notas');
    const buscador = document.getElementById('buscador');
    const botonInfo = document.getElementById('boton-info');
    const info = document.getElementById('info');

    cargarNotas();

    formularioNota.addEventListener('submit', (e) => {
        e.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const contenido = document.getElementById('contenido').value;
        guardarNota(titulo, contenido);
        formularioNota.reset();
    });

    buscador.addEventListener('input', (e) => {
        const consulta = e.target.value.toLowerCase();
        filtrarNotas(consulta);
    });

    botonInfo.addEventListener('click', () => {
        info.classList.toggle('oculto');
    });

    function guardarNota(titulo, contenido) {
        const nota = { titulo, contenido };
        let notas = obtenerNotasDeLocalStorage();
        notas.push(nota);
        localStorage.setItem('notas', JSON.stringify(notas));
        mostrarNota(nota);
    }

    function obtenerNotasDeLocalStorage() {
        const notas = localStorage.getItem('notas');
        return notas ? JSON.parse(notas) : [];
    }

    function mostrarNota(nota) {
        const div = document.createElement('div');
        div.classList.add('nota');
        div.innerHTML = `
            <h3>${nota.titulo}</h3>
            <p>${nota.contenido}</p>
            <button class="eliminar"><i class="fas fa-trash-alt"></i> Eliminar</button>
        `;
        div.querySelector('.eliminar').addEventListener('click', () => {
            if (confirm(`¿Seguro que quieres eliminar la nota "${nota.titulo}"?`)) {
                eliminarNota(nota.titulo);
                div.remove();
            }
        });
        listaNotas.appendChild(div);
    }

    function cargarNotas() {
        const notas = obtenerNotasDeLocalStorage();
        notas.forEach(nota => mostrarNota(nota));
    }

    function filtrarNotas(consulta) {
        const notas = document.querySelectorAll('.nota');
        notas.forEach(nota => {
            const titulo = nota.querySelector('h3').innerText.toLowerCase();
            if (titulo.includes(consulta)) {
                nota.style.display = '';
            } else {
                nota.style.display = 'none';
            }
        });
    }

    function eliminarNota(titulo) {
        let notas = obtenerNotasDeLocalStorage();
        notas = notas.filter(nota => nota.titulo !== titulo);
        localStorage.setItem('notas', JSON.stringify(notas));
    }
});