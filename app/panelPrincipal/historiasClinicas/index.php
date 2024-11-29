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
    <title>Clínica El Salvador - Historias Clinicas</title>
</head>
<body>
    
<header>
        <a href="../../panelPrincipal/index.php"
        ><img src="../../icon/ElSalvadorMarca.png" alt="El Salvador"
        /></a>
         <div class="contenedorNombreHeader">
        <?php if( isset($_SESSION['admin']) && $_SESSION['admin']   ) { ?>
                
                <h2>Bienvenido, <?php echo $_SESSION['nombre']   ?></h2>

            <?php  } else { ?>

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
                <div class="icon-cont"><a href="../../sistema_de_turnos"><img src="../../icon/turnos_blanco.png" alt=""><p class="pe">Turnos</p></a></div>
                <?php  if( isset($_SESSION['admin']) && $_SESSION['admin'] ){ ?>
                    <div class="icon-cont"> <a href="../doctores/index.php"><img src="../../icon/personal_medico.png" alt=""><p class="pe">Pers. Medico</p></a></div>
                    <div class="icon-cont"> <a href="../empresas/index.php"><img src="../../icon/empresa_blanco.png" alt=""><p class="pe">Empresas</p></a></div>
                <?php } ?>
                <div class="icon-cont"> <a href="../empleados/index.php"><img src="../../icon/paciente_blanco.png" alt=""><p class="pe">Pacientes</p ></a></div>
                <?php  if( isset($_SESSION['admin']) && $_SESSION['admin'] ){ ?>
                    <div class="icon-cont"> <a href="../../cie_10/index.php"><img src="../../icon/tabla.png" alt=""><p class="pe">CIE-10</p ></a></div>
                <?php } ?>
            </div>
                
        </section>
        
        <section class="seccion-tabla">
            <div class="buscador">
                <?php if (isset($_SESSION['admin']) && $_SESSION['admin']) { ?>
                    <input type="text" id="inputBuscar" placeholder="Buscar por empresa..." />
                <?php } ?>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Empleado</th>
                        <th>Empresa</th>
                        <th>Fecha</th>
                        <th>Diagnostico</th>
                        <th>Solicitud</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha Finalizacion</th>
                        <th>Ver</th>
                        <?php  if( isset($_SESSION['admin']) && $_SESSION['admin'] ){ ?>
                        <th>Eliminar</th>
                        <?php } ?>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </section>
        </main>
    </body>

        <div class="contenedor-modal off" id="contenedorModal">
            <div class="encabezado-modal">
                <h2 class="titulo-empleados" id="tituloModal"></h2>
                <div id="btn-modal-X">X</div>
            </div>
            <div id="contenedorDatos" class="contendor-datos">
                
                </div>
            </div>
        </div> 
        
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <?php if( isset($_SESSION['admin']) && $_SESSION['admin']   ) { ?>
            <script src="./index.js"></script>
        <?php  } else { ?>
            <script src="./indexUs.js"></script>
        <?php  } ?>

 
    </main>
</body>

<div class="contenedor-modal off" id="contenedorModal">
    <div class="encabezado-modal">
        <h2 class="titulo-empleados" id="tituloModal"></h2>
        <div id="btn-modal-X">X</div>
    </div>
    <div id="contenedorDatos" class="contendor-datos">
        
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="/MEDICINA_LABORAL/app/alertas.js"></script>
<script src="./index.js"></script>

    <footer>
        <input type="text" id="idEmpresa" data-id-empresa=<?php echo $_SESSION['idEmpresa']?> hidden readonly>
        <p>© 2024 Tecnicatura Universitaria en Programacion UTN FRH.</p>
    </footer>
            