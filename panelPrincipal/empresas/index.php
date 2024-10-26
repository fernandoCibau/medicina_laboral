<?php 
    session_start();
    if( !isset($_SESSION['idUsuario']) ){
        if( !$_SESSION['admin'] ){
            header('Location: ../../abm');
            exit; 
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Formulario | Alta Clientes</title>
</head>
<body>
    <header>
        <h1>Formulario Altas Empresa</h1>
        <div class="contenedorBtnHeader">
            <img src="../../icon/boton-de-encendido.png" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido">
        </div>
    </header>
    <main>

    <section name="menu" class="secMenu" id="secMenu" >

        <p>Menu</p>
        
        <div class="contenedorMenu">
            <a href="../abm">empresa</a>
        </div>

    </section>

    <section name="accesosDirectos" class="seccionAccesosDirectos">
        <div class="contenedorAccesos">
            
            <div class="accesos" id="accesoAltaTurnos">
                <h3>Nueva Emprasa</h3>
                <!-- <img src="../icon/formulario.png" alt="tabla"> -->
            </div>
            

    </section>
</main>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="./index.js"></script>
<footer>

</footer>
