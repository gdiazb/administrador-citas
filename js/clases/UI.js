import { eliminarCita, cargarEdicion } from "../funciones.js"
import { listaCitas, alert } from "../selectores.js"

class UI {
  imprimirAlerta(message, type) {
      alert.classList.add('visible')
      alert.textContent = message
      if(type === 'error') {
          alert.classList.add('alert-danger')
      } else {
          alert.classList.add('alert-success')    
      }

      setTimeout( () => {
          alert.classList.remove('visible', 'alert-danger', 'alert-success')
          alert.textContent = ''
      }, 3000);
  }

  imprimirCitas({citas}) {
      this.limpiarHTML()

      citas.forEach(cita => {
          const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
          const citaItem = document.createElement('li')
          citaItem.classList.add('cita', 'p-3')
          citaItem.dataset.id = id

          citaItem.innerHTML = `
              <h2 class="card-title font-weight-bolder">${mascota}</h2>
              <ul>
              <li><p>Propietario: <span class="ui-mascota font-weight-bolder">${propietario}</span></p></li>
              <li><p>Teléfono: <span class="ui-mascota font-weight-bolder">${telefono}</span></p></li>
              <li><p>Fecha: <span class="ui-mascota font-weight-bolder">${fecha}</span></p></li>
              <li><p>Hora: <span class="ui-mascota font-weight-bolder">${hora}</span></p></li>
              <li><p>Sintomas: <span class="ui-mascota font-weight-bolder">${sintomas}</span></p></li>
              </ul>
          `

          //delete btn
          const deleteBtn = document.createElement('button')
          deleteBtn.classList.add('btn', 'btn-danger', 'mr-2')
          deleteBtn.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
          deleteBtn.onclick = () => eliminarCita(id)

          //edit btn
          const btnEditar = document.createElement('button')
          btnEditar.classList.add('btn', 'btn-info')
          btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
          btnEditar.onclick = () => cargarEdicion(cita)
          
          //add delete btn
          citaItem.appendChild(deleteBtn)
          //add edit btn
          citaItem.appendChild(btnEditar)
          //add item
          listaCitas.appendChild(citaItem)
      });
  }

  limpiarHTML() {
      while(listaCitas.firstChild) {
          listaCitas.removeChild(listaCitas.firstChild);
      }
 }
}

export default UI
