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
        <h1>Formulario Alta Usuario</h1>
        <div class="contenedorBtnHeader">
            <img src="../../icon/boton-de-encendido.png" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido">
        </div>
    </header>

    <main>
        <section name="menu" class="secMenu">

            <p>menu</p>

            <div class="contenedor-menu">
                <a href="../abm">Panel Principal</a>
            </div>

        </section>
            
        <section name="formAltaUsuario" class="sec-form-altaUsuario">

            <div class="form-contenedor">
                


    </main>



<h2>Formulario de Registro</h2>
                
                <form  method="post" id="formAlta">
                    <label for="nombre">Nombre de usuario:</label>
                    <input type="text" id="nombre" name="nombre_usuario" required>
                    
                    <label for="empresa">empresa</label>
                    <input type="text" id="empresa" name="empresa" required>
                    
                        
                    </div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    
                    <label for="contraseña">Contraseña:</label>
                    <input type="password" id="contrasenia" name="contrasenia" required>
                    
                    
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
                    <button  id="asd" name="registrar">Registrar</button>
                    
                </form>
               
            </div>
         
        </section>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./index.js"></script>
    <footer>

    </footer>
</body>
</html>



