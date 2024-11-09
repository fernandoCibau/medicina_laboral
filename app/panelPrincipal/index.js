//Dirige la pagina a altas de usuarios
$("#accesoAltaUsuario").click(() => {
  window.location.href = "./altaUsuario";
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

//Cierra la sesion de usuario
$("#btmCerrarSesion").click(() => {
  // if (confirm("¿Desea cerrar la sesión?")) {
  //   window.location.href = "../cerrarSesion.php";
  // }

  Swal.fire({
    title: "¿Está seguro de salir del sistema?",
    text: "Está a punto de cerrar sesión.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!"
    }).then((result) => {
      if (  result.isConfirmed    ) {
        cerrarCuentaRegresiva()
      }
  });
});

const cerrarCuentaRegresiva = ()=>{
  let timerInterval;
  Swal.fire({
    title: "Saliendo del sistama",
    html: "El sistema se está cerrando... <b></b> milliseconds.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      window.location.href = "../cerrarSesion.php";
    }
  });
}
