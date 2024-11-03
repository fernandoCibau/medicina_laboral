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
    <title>Clínica El Salvador | Alta de Usuarios</title>
</head>
<body>
    <header>
        <h1>ALTA DE USUARIO</h1>
        <div class="contenedorBtnHeader">
            <button type="button" class="btmCerrarSesion" id="btmCerrarSesion" alt="botonEncendido">Cerrar Sesion</button>
        </div>
    </header>

    <main>

    <section name="menu" class="secMenu" id="secMenu" >
            
    <div class="contenedorMenu">
                <div class="icon-cont"><a href="../index.php"><img src="../../icon/home.png" alt="" class="saturate"><p class="pe">Inicio</p></a></div>
                <div class="icon-cont"><a href="../../sistema_de_turnos"><img src="../../icon/turnos_blanco.png" alt=""><p class="pe">Turnos</p></a></div>
                <div class="icon-cont"> <a href="../../cie_10/index.php"><img src="../../icon/tabla.png" alt=""><p class="pe">CIE-10</p ></a></div>
                <div class="icon-cont"> <a href="../empleados/index.php"><img src="../../icon/paciente_blanco.png" alt=""><p class="pe">Pacientes</p ></a></div>
                <div class="icon-cont"> <a href="../empresas/index.php"><img src="../../icon/empresa_blanco.png" alt=""><p class="pe">Empresas</p></a></div>
                <div class="icon-cont"> <a href="../doctores/index.php"><img src="../../icon/personal_medico.png" alt=""><p class="pe">Pers. Medico</p></a></div>
                <div class="icon-cont"> <a href="../historiasClinicas/index.php"><img src="../../icon/historiasClinicasBlanco.png" alt=""><p class="pe">Hist clinicas</p></a></div>
                <div class="icon-cont"> <a href="../configuracion/index.php"><img src="../../icon/config.jpg" alt=""><p class="pe">Configuracion</p></a></div>
            </div>
            
        </section>
        
            
        <section name="formAltaUsuario" class="sec-form-altaUsuario">

            <div class="form-contenedor">

            <h2>Formulario de Registro</h2>
                
                <form  method="post" id="formAlta">
                    <label for="nombre">Nombre de usuario:</label>
                    <input type="text" id="nombre" name="nombre_usuario" required>
                    
                    <div class= "container-empresa">
                    <label for="empresa">Empresa</label>
                    <input type="text" id="empresa" name="empresa" required>
                    <div id="resultados"></div>
                    </div>
    
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    
                    <label for="contraseña">Contraseña:</label>
                    <input type="password" id="contrasenia" name="contrasenia" required>
                    
                    
                    <fieldset>
                        <legend>¿Es administrador?</legend>
                        <div id="opcion-si">
                        <label for="admin-si">SI</label>
                        <input type="radio" name="admin" id="adm-si" value="1">
                        </div>
                        <div id="opcion-no">
                        <label for="adm-no">NO</label>
                        <input type="radio" name="admin" id="adm-no" value="0" checked>
                        </div>
                    </fieldset>

                    <div id="cont-boton">
                    <button  id="asd" name="registrar">Registrar</button>
                    </div>
                    
                </form>


            </div>

        </section>      


    </main>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./index.js"></script>

</body>
</html>



