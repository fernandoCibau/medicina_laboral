

$("#accesoAltaCliente").click( ()=>{
    window.location.href = "./altaCliente";
});

$("#btmCerrarSesion").click( ()=>{
    if(confirm("¿Confirmar?")){
        window.location.href = "../cerrarSesion.php";
    }
});


