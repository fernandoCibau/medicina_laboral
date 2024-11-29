<?php
session_start();
    if( !isset($_SESSION['idUsuario']) ){
        header( "location: ../index.php");
        exit;
    }
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Códigos CIE-10</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <header>
        <a href="../panelPrincipal/index.php"
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
            <button type="button" class="btmCerrarSesion" id="btmCerrarSesion" alt="btmCerrarSesion">Cerrar Sesion</button>
        </div>
    </header>
    
<main>
<section name="menu" class="secMenu" id="secMenu" >
            
            <div class="contenedorMenu">
                <div class="icon-cont"><a href="../index.php"><img src="../icon/home.png" alt="" class="saturate"><p class="pe">Inicio</p></a></div>
                <div class="icon-cont"><a href="../sistema_de_turnos/index.php"><img src="../icon/turnos_blanco.png" alt=""><p class="pe">Turnos</p></a></div>
                <div class="icon-cont"> <a href="../panelPrincipal/doctores/index.php"><img src="../icon/personal_medico.png" alt=""><p class="pe">Pers. Medico</p></a></div>
                <div class="icon-cont"> <a href="../panelPrincipal/empresas/index.php"><img src="../icon/empresa_blanco.png" alt=""><p class="pe">Empresas</p></a></div>
                <div class="icon-cont"> <a href="../panelPrincipal/empleados/index.php"><img src="../icon/paciente_blanco.png" alt=""><p class="pe">Pacientes</p ></a></div>
                <div class="icon-cont"> <a href="../panelPrincipal/historiasClinicas/index.php"><img src="../icon/historiasClinicasBlanco.png" alt=""><p class="pe">Hist clinicas</p></a></div>
            </div>
            
        </section>
        <section class="seccion-tabla">
            <div class="contenedor-encabezado-tabla">
                <div class="encabezado-tabla-inputs" >
                    <label for="buscarPorDescripcion">Buscar por descripcion</label>
                    <input type="text" name="buscarPorDescripcion" id="buscarPorDescripcion" placeholder="Ingrese min 3 caracteres">
                </div>
                <div class="encabezado-tabla-inputs" >
                    <label for="buscarPorCodigo">Buscar por codigo</label>
                    <input type="text" name="buscarPorCodigo" id="buscarPorCodigo" placeholder="Ingrese min 1 caracter">
                </div>
            </div>
            <table id="cie10Table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nivel</th>
                        <th>Descripción</th>
                        <th>cod-0</th>
                        <th>cod-1</th>
                        <th>cod-2</th>
                        <th>cod-3</th>
                        <th>cod-4</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </section>
    </main>
            
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="index.js"></script>

    <footer>
        <p>© 2024 Tecnicatura Universitaria en Programacion UTN FRH.</p>
    </footer>
</body>
</html>
