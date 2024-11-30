<?php 
    session_start();
    if( !isset($_SESSION['idUsuario']) ){
        header('Location: ../../abm');
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
    <link rel="stylesheet" href="../../styles.css">
    <title>El Salvador Salud - Pacientes</title>
</head>
<body>
    
    <header>
        <a href="../../panelPrincipal/index.php"
            ><img src="../../icon/ElSalvadorMarca.png" alt="El Salvador"
        /></a>
        <div class="contenedorNombreHeader">
        <?php if( $_SESSION['admin'] == 1  || $_SESSION['admin'] == 2 ) { ?>
                <h2>Bienvenido, <?php echo $_SESSION['nombre']   ?></h2>
            <?php  } ?>

            <?php if( $_SESSION['admin'] == 0   ) { ?>
                <h2>Bienvenido, <?php echo $_SESSION['razon_social']   ?></h2>
            <?php } ?>

        
        </div>
        <div class="contenedorBtnHeader">
            <button type="button" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido">Cerrar Sesion</button>
        </div>
    </header>
    
    <main>
        
    <section name="menu" class="secMenu" id="secMenu" >
            
        <div class="contenedorMenu">

            <div class="icon-cont"><a href="../index.php"><img src="../../icon/home.png" alt="" class="saturate"><p class="pe">Inicio</p></a></div>
            <?php if( $_SESSION['admin'] == 1 || $_SESSION['admin'] == 0   ) { ?>
                <div class="icon-cont"><a href="../../sistema_de_turnos"><img src="../../icon/turnos_blanco.png" alt=""><p class="pe">Turnos</p></a></div>
            <?php } ?>
            
            <?php  if( $_SESSION['admin'] == 1){ ?>
                <div class="icon-cont"> <a href="../doctores/index.php"><img src="../../icon/personal_medico.png" alt=""><p class="pe">Pers. Medico</p></a></div>
                <div class="icon-cont"> <a href="../empresas/index.php"><img src="../../icon/empresa_blanco.png" alt=""><p class="pe">Empresas</p></a></div>
            <?php } ?>


            <div class="icon-cont"> <a href="../historiasClinicas/index.php"><img src="../../icon/historiasClinicasBlanco.png" alt=""><p class="pe">Hist clinicas</p></a></div>
            
            <?php  if( $_SESSION['admin'] ==1 || $_SESSION['admin'] == 2 ){ ?>
                <div class="icon-cont"> <a href="../../cie_10/index.php"><img src="../../icon/tabla.png" alt=""><p class="pe">CIE-10</p ></a></div>
            <?php } ?>
        </div>
            
    </section>
        
        <section class="seccion-tabla">
            <!-- Input de búsqueda -->
            <div class="buscador">

                <input type="text" id="inputBuscar" placeholder="Buscar DNI..." />

                <?php  if( $_SESSION['admin']  == 1){ ?>
                    <button id="agregarEmpleado" data-id-empresa=<?php echo $_SESSION['idEmpresa']?> >Agregar Paciente</button>
                <?php }?>
            
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Empresa</th>
                        <th>Legajo</th>
                        <th>DNI</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <?php  if(  $_SESSION['admin'] == 2){ ?>
                            <th>Historia Clinica</th>
                            <th>Editar</th>
                            <?php  if(  $_SESSION['admin'] == 1){ ?>
                                <th>Eliminar</th>
                            <?php }?> 
                        <?php }?>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </section>
        
        
        
    </main>
    
    <div class="contenedor-modal off" id="contenedorModal">
        <div class="encabezado-modal">
            <h2 class="titulo-empleados" id="tituloModal"></h2>
            <div id="btn-modal-X">X</div>
        </div>
        <div id="contenedorDatos" class="contendor-datos">
    
        </div>
    </div>

    <script src="../../alertas.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <?php  if( $_SESSION['admin'] == 1 ){ ?>
        <script src="index.js"></script>
    <?php } ?>
    <?php  if( $_SESSION['admin'] == 0 ){ ?>
        <script src="indexUser.js"></script>
    <?php } ?>
    <?php  if( $_SESSION['admin'] == 2){ ?>
        <script src="indexMed.js"></script>
    <?php } ?>
    <footer>
        <input type="text" id="idEmpresa" data-id-empresa=<?php echo $_SESSION['idEmpresa']?> hidden readonly>
        <p>© 2024 Tecnicatura Universitaria en Programacion UTN FRH.</p>
    </footer>
</body>
</html>

            