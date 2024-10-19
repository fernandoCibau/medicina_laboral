<?php
    session_start();
    if( !isset($_SESSION['idUsuario']) ){
        header('Location: ../abm');
        exit;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Medicina Laboral | Administrador</title>
</head>
<body>
    
    <header>
        <h1>Medicina Laboral S.A.</h1>
        <div class="contenedorBtnHeader">
            <img src="../icon/boton-de-encendido.png" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido">
        </div>
    </header>

    <main>

        <section name="menu" class="secMenu" id="secMenu" >

            <p>menu</p>
            
            <div class="contenedorMenu">
                <a href="../abm">empresa</a>
            </div>

        </section>

        <section name="accesosDirectos" class="seccionAccesosDirectos">

            
            <div class="contenedorAccesos">

                <h2>Panel Administrador</h2>
                
                <div class="accesos" id="accesoAltaUsuario">
                    <h3>Nuevo usuario</h3>
                    <!-- <img src="../icon/formulario.png" alt="tabla"> -->
                </div>

                <div class="accesos" id="accesoAltaEmpresa">
                    <h3>Nueva empresa</h3>
                    <!-- <img src="../icon/formulario.png" alt="tabla"> -->
                </div>

                <div class="accesos" id="accesoAltaTurnos">
                    <h3>Turnos</h3>
                    <!-- <img src="../icon/formulario.png" alt="tabla"> -->
                </div>

                <div class="accesos" id="accesoCIE-10">
                    <h3>CIE-10</h3>
                    <!-- <img src="../icon/formulario.png" alt="tabla"> -->
                </div>

                <div class="accesos">
                    <h3>Otro</h3>
                    <!-- <img src="../icon/tabla.png" alt="tabla"> -->
                </div>
            </div>

            <div class="contenedorAccesosDos">
                
                <div class="perfil">
                    
                    <h3>Perfil</h3>

                    <!-- <div class="contenedorFoto">
                        <img src="../icon/perfil.png" alt="perfil">
                    </div> -->

                    <div class="perfilDatos">
                        <p>Nombre De Empresa</p>
                        <p>admin@gmail.com</p>
                        <input type="button" class="btnEditarPerfil" id="btnEditarPerfil" value="Editar Perfil" >
                    </div>
                </div>

            </div>

        </section>

    </main>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./index.js"></script>
    <footer>
    
    </footer>

</body>
</html>
