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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <title>Clínica El Salvador - Panel</title>
</head>
    
    <header>
        <h1>Medicina Laboral S.A.</h1>
        <div class="contenedorBtnHeader">
            <!-- <img src="../icon/boton-de-encendido.png" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido"> -->
            <button type="button" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido">Cerrar Sesion</button>
        </div>
    </header>

    <main>

    <section name="menu" class="secMenu" id="secMenu" >

        <div class="contenedorMenu">
            <a href="../index.php"><img src="../../icon/home.png" alt=""><p>Inicio</p></a>
            
        </div>

    </section>


    <section class="seccion-tabla">
        <table id="cie10Table">
            <thead>
                <tr>
                    <th>Razon_Social</th>
                    <th>Cuit</th>
                    <th>Domicilio</th>
                    <th>Telefono</th>
                    <th>Email</th>
                    <th>Ver</th>
                    <th>Editar</th>
                    <th>Eliminar</th> 

                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </section>




    <!-- <section name="accesosDirectos" class="seccionAccesosDirectos">
        <div class="contenedorAccesos">
            
            <div class="accesos" id="accesoAltaTurnos">
                <h3>Nueva Emprasa</h3>
                <img src="../icon/formulario.png" alt="tabla">
            </div>
            

    </section> -->
</main>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="./index.js"></script>
<footer>

</footer>
