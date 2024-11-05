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
    <title>Clínica El Salvador - Empresas</title>
</head>
<body>
    
    <header>
        <h1>EMPRESAS</h1>
        <div class="contenedorBtnHeader">
            <!-- <img src="../icon/boton-de-encendido.png" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido"> -->
            <button type="button" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido">Cerrar Sesion</button>
        </div>
    </header>
    
    <main>
        
    <section name="menu" class="secMenu" id="secMenu" >
            
            <div class="contenedorMenu">
                <div class="icon-cont"><a href="../index.php"><img src="../../icon/home.png" alt="" class="saturate"><p class="pe">Inicio</p></a></div>
                <div class="icon-cont"><a href="../../sistema_de_turnos"><img src="../../icon/turnos_blanco.png" alt=""><p class="pe">Turnos</p></a></div>
                <div class="icon-cont"> <a href="../../cie_10/index.php"><img src="../../icon/tabla.png" alt=""><p class="pe">CIE-10</p ></a></div>
                <div class="icon-cont"> <a href="../empleados/index.php"><img src="../../icon/paciente_blanco.png" alt=""><p class="pe">Pacientes</p ></a></div>
                <div class="icon-cont"> <a href="../empresas/index.php"><img src="../../icon/empresa_blanco.png" alt=""><p class="pe">Empresas</p></a></div>
                <div class="icon-cont"> <a href="../doctores/index.php"><img src="../../icon/personal_medico.png" alt=""><p class="pe">Pers. Medico</p></a></div>
                <div class="icon-cont"> <a href="../historiasClinicas/index.php"><img src="../../icon/historiasClinicasBlanco.png" alt=""><p class="pe">Hist clinicas</p></a></div>
                <div class="icon-cont"> <a href="../configuracion/index.php"><img src="../../icon/config.jpg" alt=""><p class="pe">Configuracion</p></a></div>
            </div>
            
        </section>
        
        <section class="seccion-tabla">
            <div class="buscador">
                    <input type="text" id="inputBuscar" placeholder="Buscar empresa..." />
                    <button id="agregarEmpresas">Agregar empresa</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cuit</th>
                        <th>Domicilio</th>
                        <th>Email</th>
                        <th>Ver empleados</th>
                        <th>Editar</th>
                        <th>Eliminar</th> 
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </section>
        
        <div class="contenedor-modal off" id="contenedorModal">
            <div class="encabezado-modal">
                <h2 class="titulo-empleados" id="tituloModal"></h2>
                <button id="btn-modal-X">X</button>
            </div>
            <div id="contenedorDatos" class="contendor-datos">
                
                </div>
            </div>
            
        </main>
        <footer>
            <p>© 2024 Tecnicatura Universitaria en Programacion UTN FRH.</p>
        </footer>
    </body>
        
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="./index.js"></script>
        
            