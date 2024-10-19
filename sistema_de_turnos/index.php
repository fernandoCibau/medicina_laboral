<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medicina Laboral | Calendario de Turnos</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>Medicina Laboral S.A.</h1>

        <div class="contenedorBtnHeader">
            <input type="button" value="Boton" id="cargarDatos">
            <input type="button" value="Boton" id="altaInmueble">
            <input type="button" value="Cerrar Sesion" id="cerrarSesion">
        </div>
        <p>
            * Eliminar los horarios de turnos que fueron ocupados<br>
            * Envio de mail al agendar un turno
        </p>
    </header>

    <main>
    <section name="menu" class="secMenu" id="secMenu" >

        <h2>Menu</h2>

        <div class="contenedor">
            <!-- <img src="../icon/casa.png" alt=""> -->
            <a href="../inicio">Inicio</a>
        </div>

        <div class="contenedor">
            <!-- <img src="../icon/personas.png" alt=""> -->
            <a href="/">otro</a>
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

                    <label for="nombre">Nombre</label>
                    <input type="text" placeholder="Nombre" name="nombre" id="nombre" required>

                    <label for="fecha">Fecha</label>
                    <input  type="date" name="fecha" id="fecha" />

                    <label for="horas-del-dia">Horario</label>
                    <select name="horas-del-dia" id="horas-del-dia" ></select>

                    <input type="submit" name="agregarTurno" value="Agregar turno">
                </form>
            </div>

            <div class="contenedor-tabla" id="contenedor-tabla">
                <h2>Lista de Turnos</h2>
                <table>
                    <thead>
                        <tr>
                            <!-- <th>Id/Legajo</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Dni</th> -->
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

        </section>

        


    </main>
    
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <!-- <script type="module" src="sweetAlert.js"></script> -->
    <script src="./index.js"></script>  
    <footer>
    <body>
        <h2>Pie</h2>
    </footer>
</body>
</html>
