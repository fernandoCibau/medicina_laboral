<?php
    session_start();
    if( isset( $_SESSION["idUsuario"] ) ){
        header("location: abm");
        exit;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Medicina Labora | Inicio Session</title>
</head>
<body>

    <main>
        <div class="container">
            <div class="logo">
                <h1>BIENVENIDO</h1>
            </div>
            <div class="login-box">
                <div class="left-panel">
                    <h2>CLINICA EL SALVADOR</h2>
                </div>
                <div class="right-panel">
                    <h3>Ingreso</h3>

                    <form method="post" class="formSesion" id="formSesion">
                        <div class="input-group">
                        <label for="email">Usuario</label>
                        <input type="email" name="email" id="email" placeholder="ejemplo@gmail.com" required>
                        </div>
                        <div class="input-group">
                        <label for="contrasenia">Contraseña</label>
                        <input type="password" name="contrasenia" id="contrasenia"placeholder="Ingrese contraseña"  required>
                        </div>
                        <button type="submit">Ingresar</button>
                    </form>
                    <a href="#" id="btnRecuperarContrasenia" class="forgot-password">¿Olvidaste tu contraseña?</a>
                </div>
            </div>
        </div>
    </main>




    <!-- <main>
        <section name="seccionForm" class="seccionForm">

            <form method="post" class="formSesion" id="formSesion">
                <label for="email">Usuario</label>
                <input type="email" name="email" id="email" placeholder="ejemplo@gmail.com" required>
                
                <label for="contrasenia">Contraseña</label>
                <input type="password" name="contrasenia" id="contrasenia"placeholder="Ingrese contraseña"  required>
                
                <button type="submit">Iniciar Sesión</button>
            </form>

        </section>
    </main> -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./index.js"></script>
    <footer>

    </footer>
</body>
</html>