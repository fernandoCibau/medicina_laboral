<?php
session_start();
if( isset( $_SESSION["idUsuario"] ) ){
    header( "location: index");
    exit;
}
include './error_config.php';
if(isset($_POST['email']) && isset($_POST['contrasenia']) ){

    try{

        include 'conexion.php';

        $email = trim( $_POST['email'] );

        //Valida que el formato del mail sea correcto
        if ( !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['mensaje' =>  'El correo electrónico ' . $email  . ' no es válido.']);
            exit;
        }

        $resultado = mysqli_query( $conexion, "SELECT * FROM usuarios WHERE email= '$email' ");

        if($resultado){
            
            $datos = mysqli_fetch_assoc($resultado);

            if(  password_verify( trim($_POST['contrasenia']), $datos["contrasenia"]) ){

                $_SESSION['idUsuario']  = session_id();    // CAMBIAR POR ID DE USUARIO O LEGAJO------------------------------
                $_SESSION['nombre']  = $datos['nombre_usuario'];
                $_SESSION['email']     = $datos['email'];
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
        error_log("Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage());
        echo json_encode(['mensaje' => 'Ocurrió un error.']);
    }

}else{
    echo json_encode( ['mensaje' => 'Error, ingreados :' . 'LINEA' . __LINE__, 'operacion'=> FALSE ] );
}
?>