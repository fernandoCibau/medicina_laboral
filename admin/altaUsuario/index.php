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
    <link rel="stylesheet" href="styles.css">
    <title>Formulario | Alta Clientes</title>
</head>
<body>
    <header>
        <h1>Formulario Altas</h1>
        <div class="contenedorBtnHeader">
            <img src="../../icon/boton-de-encendido.png" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido">
        </div>
    </header>

    <main>
            
        <div class="form-contenedor">

            <h2>Formulario de Registro</h2>

            <form  method="post" id="formAlta">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>

                <label for="apellido">Apellido:</label>
                <input type="text" id="apellido" name="apellido" required>

                <label for="dni">Dni:</label>
                <input type="number" id="dni" name="dni" required placeholder="Ingrese el DNI sin puntos">

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="contraseña">Contraseña:</label>
                <input type="password" id="contrasenia" name="contrasenia" required>

                <!-- <label for="asunto">Asunto:</label>
                <select name="asunto" id="asunto">
                    <option value=""></option>
                    <option value="Alta Cliente">Alta Cliente</option>
                    <option value="Cambio Contrasenia">Cambio Contraseña</option>
                </select> -->

                <!-- <label for="mensaje">Mensaje:</label>
                <textarea id="mensaje" name="mensaje"  placeholder="Escribe tu descripción aquí..."></textarea> -->

                <fieldset>
                    <legend>¿Es administrador?</legend>
                    <label for="admin-si">
                        <input type="radio" name="admin" id="adm-si" value="1">
                        Sí
                    </label>
                    <label for="adm-no">
                        <input type="radio" name="admin" id="adm-no" value="0" checked>
                        No
                    </label>
                </fieldset>

                <button type="submit" name="registrar">Registrar</button>
            </form>

        </div>

    </main>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./index.js"></script>
    <footer>

    </footer>
</body>
</html>