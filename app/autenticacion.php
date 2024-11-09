<?php
session_start();
if( isset( $_SESSION["idUsuario"] ) ){
    header( "location: index");
    exit;
}
if(isset($_POST['email']) && isset($_POST['contrasenia']) ){

    try{

        include 'conexion.php';

        $email = trim( $_POST['email'] );

        //Valida que el formato del mail sea correcto
        if ( !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['mensaje' =>  'El correo electrónico ' . $email  . ' no es válido.']);
            exit;
        }

        $sql = "SELECT U.*, E.razon_social
                    FROM usuarios U
                    INNER JOIN empresas E ON U.empresa_id = E.id
                    WHERE U.email= '$email'
                    ";

        $resultado = mysqli_query( $conexion, $sql);

        if($resultado){
            
            $datos = mysqli_fetch_assoc($resultado);

            if( $datos['email'] !== $email){
                echo json_encode( [ 'mensaje' => 'Error, el mail es incorrecto.!. ' .$datos['email']. ' 1 '. $email  , 'operacion' => FALSE ]);
                exit();
            }

            if(  password_verify( trim($_POST['contrasenia']), $datos["contrasenia"]) ){

                $_SESSION['idUsuario']    = session_id(); 
                $_SESSION['idEmpresa']  = $datos['empresa_id'];
                $_SESSION['nombre']       = $datos['nombre_usuario'];
                $_SESSION['email']           = $datos['email'];
                $_SESSION['admin']          = $datos['tipo_usuario'];
                $_SESSION['razon_social']          = $datos['razon_social'];
                
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
        $error = "Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage();
        echo json_encode(['mensaje' => 'Ocurrió un error', 'error'=> $error ]);
    }
}else{
    echo json_encode( ['mensaje' => 'Error, ingreados :' . 'LINEA' . __LINE__, 'operacion'=> FALSE ] );
}
?>