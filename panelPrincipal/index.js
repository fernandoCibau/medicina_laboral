

//Dirige la pagina a altas de usuarios
$("#accesoAltaUsuario").click( ()=>{
    window.location.href = "./altaUsuario";
});

//Cierra la sesion de usuario
$("#btmCerrarSesion").click( ()=>{
    if(confirm("¿Confirmar?")){
        window.location.href = "../cerrarSesion.php";
    }
});

//Envia al sistema de turnos
$("#accesoAltaTurnos").click( ()=>{
    window.location.href = "../sistema_de_turnos";
});

//Envia al sistema de cie-10
$("#accesoCIE-10").click( ()=>{
    window.location.href = "../cie_10";
});

//Envia a empresas
$("#accesoEmpresas").click( () =>{
    window.location.href = "./empresas";
});