<?php
    session_start();
    if( isset( $_SESSION["idUsuario"] ) ){
        header( "location: index");
        exit;
    }

    if(isset($_POST['email']) && isset($_POST['contrasenia']) ){

        try{

            include 'conexion.php';

            $email = $_POST['email'] ;

            $resultado = mysqli_query( $conexion, "SELECT * FROM usuarios WHERE email= '$email' ");
            

            if($resultado){
                
                $datos = mysqli_fetch_assoc($resultado);

                if(  password_verify( trim($_POST['contrasenia']), $datos["contrasenia"]) ){

                    $_SESSION['idUsuario']  = session_id();    // CAMBIAR POR ID DE USUARIO O LEGAJO------------------------------
                    $_SESSION['nombre']  = $datos['nombre_usuario'];
                    $_SESSION['email']     = $datos['email'];
                    // $_SESSION['admin']    = $datos['admin'];
                    $_SESSION['admin']    = $datos['tipo_usuario'];
                    
                    echo json_encode( ['mensaje' => 'Bienvenido '. $datos['nombre_usuario'], 'operacion' => TRUE]);
                    mysqli_free_result($resultado);
                
                }else{
                    echo json_encode( [ 'mensaje' => 'LA CONTASEÑA ES INCORRECTA', 'operacion' => FALSE ]);
                }
                
            }else{
                echo json_encode( [ 'mensaje' => 'EL  MAIL INGRESADO NO EXISTE' ]);
            }
            
            mysqli_close($conexion);
        } catch (Exception $e) {
            echo json_encode( [ 'mensaje' => 'Error, ' .  $e->getMessage() . "autenticacion.php" . " : LINEA  : " . __LINE__  ] );
        }
        
    }else{
        echo json_encode( ['mensaje' => 'Error, ingreados :' . 'LINEA' . __LINE__, 'operacion'=> FALSE ] );
    }
?>