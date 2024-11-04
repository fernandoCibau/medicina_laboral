<?php
    session_start();
    if( isset( $_SESSION["idUsuario"] ) ){
        header("location: panelPrincipal");
        exit;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Clínica El Salvador | Inicio de Sesión </title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
</head>
<body>
    <header >

        <h1 ><a href="../index.html">Clinica el salvador</a></h1>

        <nav>
        <ul class="nav-links">
            <li><a href="../index.html">Nosotros</a></li>
            <li><a href="../index.html">Contacto</a></li>
            <li><a href="../index.html">Inicio</a></li>
        </ul>
        </nav>
    </header>

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
                    <a href="./recuperarContrasenia/recuContrasenia.php" id="btnRecuperarContrasenia" class="forgot-password">¿Olvidaste tu contraseña?</a>
                </div>
            </div>
        </div>
    </main>

    <!-- script para poder usar el modulo ES6 para poder importar funciones -->
    <script type="module" src="index.js"></script> 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./index.js"></script>
    <footer>
        <p>© 2024 Tecnicatura Universitaria en Programacion UTN FRH.</p>
    </footer>
</body>
</html>