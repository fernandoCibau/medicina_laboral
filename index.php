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
    <header>
        <h1>Medicina Laboral</h1>
    </header>
    
    <main>
        <section name="seccionForm" class="seccionForm">

            <form method="post" class="formSesion" id="formSesion">
                <label for="email">Usuario</label>
                <input type="email" name="email" id="email" placeholder="ejemplo@gmail.com" required>
                
                <label for="contrasenia">Contraseña</label>
                <input type="password" name="contrasenia" id="contrasenia" placeholder="contraseña" required>
                
                <button type="submit">Iniciar Sesión</button>
            </form>

        </section>
    </main>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./index.js"></script>
    <footer>

    </footer>
</body>
</html>