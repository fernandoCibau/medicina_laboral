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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <title>Medicina Laboral | Calendario de Turnos</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
        
    <header>
    <a href="../../app/panelPrincipal/index.php"
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
        
        <section name="menu" class="secMenu" id="secMenu" >
            
        <div class="contenedorMenu">
                <div class="icon-cont"><a href="../index.php"><img src="../icon/home.png" alt="" class="saturate"><p class="pe">Inicio</p></a></div>
                <?php  if( isset($_SESSION['admin']) && $_SESSION['admin'] ){ ?>    
                    <div class="icon-cont"> <a href="../cie_10/index.php"><img src="../icon/tabla.png" alt=""><p class="pe">CIE-10</p ></a></div>
                <?php } ?>
                <div class="icon-cont"> <a href="../panelPrincipal/empleados/index.php"><img src="../icon/paciente_blanco.png" alt=""><p class="pe">Pacientes</p ></a></div>
                <?php  if( isset($_SESSION['admin']) && $_SESSION['admin'] ){ ?>    
                    <div class="icon-cont"> <a href="../panelPrincipal/empresas/index.php"><img src="../icon/empresa_blanco.png" alt=""><p class="pe">Empresas</p></a></div>
                    <div class="icon-cont"> <a href="../panelPrincipal/doctores/index.php"><img src="../icon/personal_medico.png" alt=""><p class="pe">Pers. Medico</p></a></div>
                <?php } ?>
                <div class="icon-cont"> <a href="../panelPrincipal/historiasClinicas/index.php"><img src="../icon/historiasClinicasBlanco.png" alt=""><p class="pe">Hist clinicas</p></a></div>

            </div>
        </section>
        
        
        <section class="seccion-mes" id="seccion-mes">
            
            <div class="contenedor-encabezado">

                <?php if( isset($_SESSION['admin']) && $_SESSION['admin']  ) { ?>

                    <input type="month" id="mesInput" />
                    <input type="button" value="Buscar" id="btn-buscar">
                    <input type="button" value="Nuevo Turno" id="btn-nuevo-turno">

                <?php  } else { ?>

                    <input type="button" value="Ver Turnos" id="btnVerTurnos" data-id-empresa=<?php echo $_SESSION['idEmpresa']?> >

                <?php } ?>

            </div>
            <?php if( isset($_SESSION['admin']) && $_SESSION['admin']  ) { ?>
                <div id="mes" class="mes"></div>
            <?php } ?>
        </section>
        
        <?php if( isset($_SESSION['admin']) && $_SESSION['admin']   ) { ?>
            <section class="seccion-modal" id="seccion-modal">
                    <div class="contenedor-encabezado-modal">
                        <button type="button" class="btn-cerrar" id="btn-cerrar" >X</button>
                    </div>
            <?php  } else { ?>
                <section class="seccion-modal on " id="seccion-modal">
            <?php } ?>
            
                <div class="contenedor-fom" id="contenedor-fom">
                <h2>Agenda de Turnos</h2>
                <form action="" method="post" class="form-nuevo-turno"  id="form-nuevo-turno">
                    
                        <div class="contenedor-input">
                            <label for="selectEmpresas" require>Empresas</label>
                            <select name="selectEmpresas" id="selectEmpresas" data-id-empresa=<?php echo $_SESSION['idEmpresa']?>></select>
                        </div>
                        
                        <div class="contenedor-input">
                            <label for="selectEmpleados">Empleados</label>
                            <select name="selectEmpleados" id="selectEmpleados" ></select>
                        </div>
<!--                         
                        <div class="contenedor-input">
                            <label for="selectMedicos">Medicos</label>
                            <select name="selectMedicos" id="selectMedicos" ></select>
                        </div> -->
                        
                        <div class="contenedor-input">
                            <label for="fecha">Fecha</label>
                            <input  type="date" name="fecha" id="fecha" />
                        </div>
                        
                        <div class="contenedor-input">
                            <label for="horas-del-dia">Horario</label>
                            <select name="horas-del-dia" id="horas-del-dia" >
                                <option value="">-- : -- : --</option>
                            </select>
                        </div>
                        
                        <div class="contenedor-btn">
                            <input type="submit" name="agregarTurno" class="btnAgregarTurno" id="btnAgregarTurno" value="Agenda turno">
                        </div>                
                    </form>
                </div>
                

                <?php if( isset($_SESSION['admin']) && $_SESSION['admin'] == 0  ) { ?>
                    <section class="seccion-modal-usuario" id="seccion-modal-usuario">
                    
                    <div class="contenedor-encabezado-modal">
                        <button type="button" class="btn-cerrar" id="btn-cerrar" >X</button>
                    </div>

                <?php } ?>
 
                    <div class="contenedor-tabla" id="contenedor-tabla">
                        <h2>Lista de Turnos</h2>
                        <div class="contenedor-tabla-2">
                            <table id='modalTablaTurnos'>
                                <thead>
                                    <tr>
                                        <th>Empleado</th>
                                        <th>Empresa</th>
                                        <th>Fecha</th>
                                        <!-- <th>Doctor</th> -->
                                        <th>Hora</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </section>


            </section>
    </main>

    <script src="../alertas.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <?php if( isset($_SESSION['admin']) && $_SESSION['admin']   ) { ?>
        <script src="./index.js"></script>
    <?php  } else { ?>
        <script src="./indexUs.js"></script>
    <?php } ?>
    <footer>
        <p>© 2024 Tecnicatura Universitaria en Programacion UTN FRH.</p>
    </footer>
</body>
</html>
