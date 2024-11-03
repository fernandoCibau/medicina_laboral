//Dirige la pagina a altas de usuarios
$("#accesoAltaUsuario").click(() => {
  window.location.href = "./altaUsuario";
});

//Cierra la sesion de usuario
$("#btmCerrarSesion").click(() => {
  if (confirm("¿Desea cerrar la sesión?")) {
    window.location.href = "../cerrarSesion.php";
  }
});

//Envia al sistema de turnos
$("#accesoAltaTurnos").click(() => {
  window.location.href = "../sistema_de_turnos";
});

//Envia al sistema de cie-10
$("#accesoCIE-10").click(() => {
  window.location.href = "../cie_10";
});

//Envia a empresas
$("#accesoEmpresas").click(() => {
  window.location.href = "./empresas";
});

//Envio al dashboard EMPLEADOS
$("#accesoPacientes").click(() => {
  window.location.href = "./empleados";
});

//Envio a configuracion
$("#accesoConfiguracion").click(() => {
  window.location.href = "./configuracion";
});

//Envia a dashboard de Historias Clinicas
$("#accesoHistClinic").click(() => {
  window.location.href = "./historiasClinicas";
});

//Envia a doctores
$("#accesoPersMedico").click(() => {
  window.location.href = "./doctores";
});
