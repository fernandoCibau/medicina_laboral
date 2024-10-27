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
    <title>Clínica El Salvador - Panel</title>
</head>
<body>
    
    <header>
        <h1>Empresas</h1>
        <div class="contenedorBtnHeader">
            <!-- <img src="../icon/boton-de-encendido.png" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido"> -->
            <button type="button" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido">Cerrar Sesion</button>
        </div>
    </header>
    
    <main>
        
        <section name="menu" class="secMenu" id="secMenu" >
            
            <div class="contenedorMenu">
                <a href="../index.php"><img src="../../icon/home.png" alt=""><p>Inicio</p></a>
                
            </div>
            
        </section>
        
        
        <section class="seccion-tabla">
            <table>
                <thead>
                    <tr>
                        <th>Razon_Social</th>
                        <th>Cuit</th>
                        <th>Domicilio</th>
                    <th>Telefono</th>
                    <th>Email</th>
                    <th>Ver</th>
                    <th>Editar</th>
                    <th>Eliminar</th> 
                    
                </tr>
            </thead>
            <tbody>
                </tbody>
            </table>
        </section>
        
        <div class="contenedor-modal off" id="contenedorModal">
            <div class="encabezado-modal">
                <button id="btn-modal-X">X</button>
            </div>
            <div id="contenedorDatos" class="contendor-datos">
                
                </div>
            </div>
            
        </main>
    </body>
        
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="./index.js"></script>
        
    <footer>
        
    </footer>
            