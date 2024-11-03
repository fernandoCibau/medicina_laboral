$("#btmCerrarSesion").click( ()=>{
    if(confirm("¿Desea cerrar la sesión?")){
        window.location.href = "../cerrarSesion.php";
    }
});