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
            $contrasenia = $_POST['contrasenia'];
            $contraseniaa = password_hash( $_POST['contrasenia'],  PASSWORD_DEFAULT);

            $resultado = mysqli_query( $conexion, "SELECT * FROM usuarios WHERE email= '$email' ");

            mysqli_close($conexion);
            
            if($resultado){
                
                $datos = mysqli_fetch_assoc($resultado);

                if(  password_verify( $contrasenia, $datos["contrasenia"]) ){

                    $_SESSION['idUsuario']  = session_id();    // CAMBIAR POR ID DE USUARIO O LEGAJO
                    $_SESSION['nombre']  = $datos['nombre'];
                    $_SESSION['email']     = $datos['email'];
                    $_SESSION['admin']    = $datos['admin'];
                    echo json_encode( ['mensaje' => 'Bienvenido '. $datos['nombre'], 'operacion' => TRUE]);
                    
                    mysqli_free_result($resultado);
                }else{
                    echo json_encode( [ 'mensaje' => 'LA CONTASEÑA ES INCORRECTA', 'operacion' => FALSE ]);
                }
                
            }else{
                echo json_encode( [ 'mensaje' => 'EL  MAIL INGRESADO NO EXISTE' ]);
            }
            
        } catch (Exception $e) {
            echo json_encode( [ 'mensaje' => 'Error, ' .  $e->getMessage() . "autenticacion.php" . " : LINEA  : " . __LINE__  ] );
        }
        
    }else{
        echo json_encode( ['mensaje' => 'Error, ingreados :' . 'LINEA' . __LINE__, 'operacion'=> FALSE ] );
    }
?>