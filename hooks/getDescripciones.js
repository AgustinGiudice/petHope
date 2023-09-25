function getEstadoDescripcion(estado) {
  switch (estado) {
    case 1:
      return "En espera de aceptación";
    case 2:
      return "En curso";
    case 3:
      return "Adoptado";
    default:
      return "Desconocido";
  }
}

function getTamanioDescripcion(tamanio) {
  switch (tamanio) {
    case 1:
      return "Pequeño";
    case 2:
      return "Mediano";
    case 3:
      return "Grande";
    default:
      return "Desconocido";
  }
}

function getEdadDescripcion(edad) {
  switch (edad) {
    case 1:
      return "Cachorro";
    case 2:
      return "Juvenil";
    case 3:
      return "Adulto";
    default:
      return "Desconocido";
  }
}

function getSexoDescripcion(sexo) {
  switch (sexo) {
    case 1:
      return "Macho";
    case 2:
      return "Hembra";
    default:
      return "Desconocido";
  }
}

function getAnimalDescripcion(animal) {
  switch (animal) {
    case 1:
      return "Perro";
    case 2:
      return "Gato";
    default:
      return "Desconocido";
  }
}
module.exports = {
  getAnimalDescripcion,
  getEdadDescripcion,
  getEstadoDescripcion,
  getTamanioDescripcion,
  getSexoDescripcion,
};
