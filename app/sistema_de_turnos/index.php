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
        <h1>Calendario De Turnos</h1>
        <div class="contenedorBtnHeader">
            <button type="button" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido">Cerrar Sesion</button>
        </div>
    </header>

    <main>

    <section name="menu" class="secMenu" id="secMenu" >
            
            <div class="contenedorMenu">
                <div class="icon-cont"><a href="../index.php"><img src="../icon/home.png" alt="" class="saturate"><p class="pe">Inicio</p></a></div>
                <div class="icon-cont"><a href="../../sistema_de_turnos"><img src="../icon/turnos_blanco.png" alt=""><p class="pe">Turnos</p></a></div>
                <div class="icon-cont"> <a href=""><img src="../icon/paciente_blanco.png" alt=""><p class="pe">Pacientes</p ></a></div>
                <div class="icon-cont"> <a href="../empresas/index.php"><img src="../icon/empresa_blanco.png" alt=""><p class="pe">Empresas</p></a></div>
            </div>
            
        </section>

        <section class="seccion-mes" id="seccion-mes">
            
            <div class="contenedor-encabezado">
                <h2>Mes</h2>
                <input type="month" id="mesInput" />
                <input type="button" value="Buscar" id="btn-buscar">
                <input type="button" value="Nuevo Turno" id="btn-nuevo-turno">
            </div>
            <div id="mes" class="mes"></div>
        </section>

        <section class="seccion-modal" id="seccion-modal">
            <div class="contenedor-encabezado-modal">
                <button type="button" class="btn-cerrar" id="btn-cerrar" >X</button>
            </div>
            
            <div class="contenedor-fom" id="contenedor-fom">
                <h2>Agenda de Turnos</h2>
                <form action="" method="post"   id="form-nuevo-turno">

                    <label for="selectEmpresas" require>Empresas</label>
                    <select name="selectEmpresas" id="selectEmpresas"></select>

                    <label for="selectEmpleados">Empleados</label>
                    <select name="selectEmpleados" id="selectEmpleados" ></select>

                    <label for="fecha">Fecha</label>
                    <input  type="date" name="fecha" id="fecha" />

                    <label for="horas-del-dia">Horario</label>
                    <select name="horas-del-dia" id="horas-del-dia" >
                        <option value="">-- : -- : --</option>
                    </select>


                    <input type="submit" name="agregarTurno" id="btnAgregarTurno" value="Agenda turno">
                </form>
            </div>

            <div class="contenedor-tabla" id="contenedor-tabla">
                <h2>Lista de Turnos</h2>
                <table id='modalTablaTurnos'>
                    <thead>
                        <tr>
                            <th>Empleado_id</th>
                            <th>Fecha</th>
                            <th>Doctor</th>
                            <th>Hora</th>
                            <th>Eliminar</th>
                            <!-- <th>Hora</th>
                            <th>Eliminar</th> -->
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

        </section>

    </main>
    
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./index.js"></script>  
    <footer>
        <p>© 2024 Tecnicatura Universitaria en Programacion UTN FRH.</p>
    </footer>

</body>
</html>
