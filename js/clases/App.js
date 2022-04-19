import { gestionarDatosCita, crearNuevaCita } from '../funciones.js'
import { 
  inputMascota,
  inputPropietario,
  inputFecha,
  inputHora,
  inputSintomas,
  inputTelefono,
  formulario
} from '../selectores.js'

class App {
  constructor() {
    this.initApp()
  }

  initApp() {
    inputMascota.addEventListener('change', gestionarDatosCita)
    inputPropietario.addEventListener('change', gestionarDatosCita)
    inputTelefono.addEventListener('change', gestionarDatosCita)
    inputFecha.addEventListener('change', gestionarDatosCita)
    inputHora.addEventListener('change', gestionarDatosCita)
    inputSintomas.addEventListener('change', gestionarDatosCita)

    formulario.addEventListener('submit', crearNuevaCita)
  }
}

export default App
