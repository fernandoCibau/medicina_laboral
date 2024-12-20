
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
    <link rel="stylesheet" href="../styles.css"> 
    <title>El salvador Salud - Panel Principal</title>
</head>
    
    <header>
        
    <a href="index.php"
        ><img src="../icon/ElSalvadorMarca.png" alt="El Salvador"
    /></a>

        <div class="contenedorNombreHeader">
            <?php if( isset($_SESSION['admin']) && $_SESSION['admin']   ) { ?>
                
                <h2>Bienvenido, <?php echo $_SESSION['nombre']   ?></h2>

            <?php  } else { ?>

                <h2>Bienvenido, <?php echo $_SESSION['razon_social']   ?></h2>

            <?php } ?>
        </div>
        <div class="contenedorBtnHeader">
            <button type="button" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonCerrarSesion">Cerrar Sesion</button>
        </div>
    </header>
        <main>

            <section name="accesosDirectos" class="seccionAccesosDirectos">
                <div class="contenedorAccesos">

                    <?php   if ( $_SESSION['admin']  == 1 ) {  ?>
                            <div class="accesos" id="accesoAltaUsuario">
                                <div><img src="../icon/nuevo_user_grande.png" alt="nuevo usuario"></div>
                                <h3>Nuevo usuario</h3>
                            </div>
                    <?php } ?>

                    <?php   if ( $_SESSION['admin']  == 1  || $_SESSION['admin'] == 0) {  ?>
                        <div class="accesos" id="accesoAltaTurnos"> 
                            <div><img src="../icon/turnos_blanco_grande.png" alt="cita-medica"></div>
                            <h3>Turnos</h3>
                        </div>
                    <?php } ?>

                    <?php   if ( $_SESSION['admin']  == 1 ) {  ?>
                        <div class="accesos" id="accesoPersMedico">
                            <div><img src="../icon/personal_medico.png" alt="personal medico"></div>
                            <h3>Pers. Medico</h3>
                        </div>
                    <?php } ?>

                                    
                    <?php   if ( $_SESSION['admin'] == 1 ) {  ?>
                        <div class="accesos" id="accesoEmpresas">
                            <div><img src="../icon/empresa_blanco_grande.png" alt="empresas"></div>
                            <h3>Empresas</h3>
                        </div>
                    <?php } ?>
                    
                    <?php   if ( $_SESSION['admin']  == 1  || $_SESSION['admin'] == 0 || $_SESSION['admin'] == 2 ) {  ?>
                        <div class="accesos" id="accesoPacientes">
                            <div><img src="../icon/paciente_grande.png" alt="pacientes"></div>
                            <h3>Pacientes</h3>
                        </div>
                    <?php } ?>


                        <div class="accesos" id="accesoHistClinic">
                            <div><img src="../icon/historiasClinicasBlanco.png" alt="historia clinica"></div>
                            <h3>Historias Clinicas</h3>
                        </div>

                        
                    <?php   if ( $_SESSION['admin'] == 1 || $_SESSION['admin'] == 2) {  ?>
                        <div class="accesos" id="accesoCIE-10">
                            <div><img src="../icon/tabla.png" alt="CIE-10"></div>
                            <h3>CIE-10</h3>
                        </div>
                    <?php } ?>

                </div>
            </section>

        </main>

        
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="../alertas.js"></script>
    <script src="./index.js"></script>
    <footer>
        <p>© 2024 Tecnicatura Universitaria en Programacion UTN FRH.</p>
    </footer>

</body>
</html>
