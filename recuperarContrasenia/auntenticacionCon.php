<?php

    if(isset($_POST['correo']) ){

        try{

            include '../conexion.php';

            $email = $_POST['correo'];

            $resultado = mysqli_query( $conexion, "SELECT * FROM usuarios WHERE email= '$email' ");

            if($resultado){
                
                $datos = mysqli_fetch_assoc($resultado);

                    $_SESSION['idUsuario']  = session_id();    // CAMBIAR POR ID DE USUARIO O LEGAJO------------------------------
                    $_SESSION['nombre']  = $datos['nombre_usuario'];
                    $_SESSION['email']     = $datos['email'];
                    // $_SESSION['admin']    = $datos['admin'];
                    $_SESSION['admin']    = $datos['tipo_usuario'];
                    
                    /*echo json_encode( ['mensaje' => 'Bienvenido '. $datos['nombre_usuario'], 'operacion' => TRUE]);*/
                    echo "ID usuario: ".session_id();
                    mysqli_free_result($resultado);
                
            }
            
            mysqli_close($conexion);
        } catch (Exception $e) {
            echo json_encode( [ 'mensaje' => 'Error, ' .  $e->getMessage() . "autenticacion.php" . " : LINEA  : " . __LINE__  ] );
        }
        
    }else{
        echo json_encode( ['mensaje' => 'Error, ingreados :' . 'LINEA' . __LINE__, 'operacion'=> FALSE ] );
    }
?>