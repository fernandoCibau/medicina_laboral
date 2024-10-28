
<?php
 session_start();
    if( !isset($_SESSION['idUsuario']) ){
        header( "location: ../index.php");
        exit;
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
        <h1>El Salvador</h1>
        <div class="contenedorBtnHeader">
            <!-- <img src="../icon/boton-de-encendido.png" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido"> -->
            <button type="button" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido">Cerrar Sesion</button>
        </div>
    </header>

    <main>

        <section name="accesosDirectos" class="seccionAccesosDirectos">
            <div class="contenedorAccesos">

                <!-- Solo administador -->
                <?php   if (isset($_SESSION['admin'])) {  ?>
                        <div class="accesos" id="accesoAltaUsuario">
                            <h3>Nuevo usuario</h3>
                            <!-- <img src="../icon/formulario.png" alt="tabla"> -->
                        </div>
                <?php } ?>

                
                <div class="accesos" id="accesoAltaTurnos">
                    <img src="../icon/turnos.png" alt="cita-medica">
                    <h3>Turnos</h3>
                </div>
                
                <div class="accesos" id="accesoCIE-10">
                    <h3>CIE-10</h3>
                    <!-- <img src="../icon/formulario.png" alt="tabla"> -->
                </div>
                
                <div class="accesos" id="accesoPacientes">
                    <h3>Pacientes</h3>
                    <!-- <img src="../icon/tabla.png" alt="tabla"> -->
                </div>
                
                <div class="accesos" id="accesoEmpresas">
                    <h3>Empresas</h3>
                    <!-- <img src="../icon/formulario.png" alt="tabla"> -->
                </div>
                
                <div class="accesos" id="accesoPersMedico">
                    <h3>Pers. Medico</h3>
                    <!-- <img src="../icon/tabla.png" alt="tabla"> -->
                </div>

            </div>

            <!-- <div class="contenedorAccesosDos">
                
                <div class="perfil">
                    
                    <h3>Perfil</h3>

                    <div class="perfilDatos">
                        <p>Nombre De Empresa</p>
                        <p>admin@gmail.com</p>
                        <input type="button" class="btnEditarPerfil" id="btnEditarPerfil" value="Editar Perfil" >
                    </div>
                </div>

            </div> -->

        </section>

    </main>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./index.js"></script>
    <footer>
    
    </footer>

</body>
</html>
