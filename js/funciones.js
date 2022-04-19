import Citas from './clases/Citas.js'
import UI from './clases/UI.js';

import { 
  inputMascota,
  inputPropietario,
  inputFecha,
  inputHora,
  inputSintomas,
  inputTelefono,
  formulario
} from './selectores.js'

const ui = new UI();
const administrarCitas = new Citas();
//modo edicion
let moodEdit = false

const citaObj = {
  id: '',
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora:'',
  sintomas: ''
}

export function gestionarDatosCita(e) {
  citaObj[e.target.name] = e.target.value
}

export function crearNuevaCita(e) {
  e.preventDefault()
  validarForm()
}

function validarForm() {
  const {mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
      ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
      return
  }

  if(moodEdit) {
      administrarCitas.editarCita({...citaObj})
      //Cambiar texto del botón
      formulario.querySelector('button[type="submit"]').textContent = 'Crear cita'
      //Mostrar Alerta
      ui.imprimirAlerta('Se editó correctamente')
      //quitar modo edición
      moodEdit = false
  } else {
      citaObj.id = Date.now()
  
      administrarCitas.agregarCita({...citaObj})

      ui.imprimirAlerta('Se agregó correctamente')
      
  }
  console.log(administrarCitas.citas)
  ui.imprimirCitas(administrarCitas)
  
  reiniciarObj()
  
  formulario.reset()

}

export function reiniciarObj() {
  citaObj.mascota = ''
  citaObj.propietario = ''
  citaObj.telefono = ''
  citaObj.fecha = ''
  citaObj.hora = ''
  citaObj.sintomas = ''
  citaObj.id = ''
}

export function eliminarCita(id) {
  //Eliminar la cita
  administrarCitas.eliminarCita(id)
  //Mostrar mensaje de eliminado correctamente
  ui.imprimirAlerta('Eliminado correctamente')
  //Refrescar las citas
  ui.imprimirCitas(administrarCitas)
}

export function cargarEdicion(cita) {

  const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
  inputMascota.value = mascota
  inputPropietario.value = propietario
  inputTelefono.value = telefono
  inputFecha.value = fecha
  inputHora.value = hora
  inputSintomas.value = sintomas

  //llenar obj 
  citaObj.mascota = mascota
  citaObj.propietario = propietario
  citaObj.telefono = telefono
  citaObj.fecha = fecha
  citaObj.hora = hora
  citaObj.sintomas = sintomas
  citaObj.id = id;
  //Cambiar texto del botón
  formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios'

  //setear el modo edición
  moodEdit = true
}
