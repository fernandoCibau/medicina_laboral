<?php
    session_start();
    if( isset( $_SESSION["usuario"]["idSesion"] ) ){
        header( "location: index");
        exit;
    }

    if(isset($_POST['email']) && isset($_POST['contrasenia']) ){

        try{

            include 'conexion.php';

            $email = $_POST['email'] ;

            $resultado = mysqli_query( $conexion, "SELECT * FROM empresa WHERE email =  '$email' ");
            
            mysqli_close($conexion);

            if($resultado){
                
                $flag = false;

                foreach( $resultado as $usuario ){
                    
                    if(  password_verify($_POST['contrasenia'], $usuario["contrasenia"]) || $_POST['contrasenia'] == $usuario['contrasenia'] ){
                        
                        $_SESSION['usuario']['idSesion'] = session_create_id();
                        $_SESSION['usuario']['nombre'] = $usuario['nombre'];

                        $datos = new stdClass();
                        $datos->admin = false;
                        $datos->nombre = $usuario['nombre'];
                        $datos->operacion = true;

                        $flag = true;
                        
                        if ($usuario['admin']) {
                            $datos->admin = true;       
                            $datos->idSesion = $_SESSION['usuario']['idSesion'];  
                            $_SESSION['usuario']['admin'] = $usuario['admin'];
                        }else{
                            $_SESSION['usuario']['adm'] = false;
                        }

                        echo json_encode($datos);
                    }
                }

                if( !$flag ){
                    $datos = new stdClass();
                    $datos->operacion = false;
                    $datos-> mensaje = "LA CONTASEÑA ES INCORRECTA";
                    echo json_encode($datos);
                }

            }else{
                $datos = new stdClass();
                $datos->mensaje ="EL  MAIL INGRESADO NO EXISTE";
                mysqli_free_result($resultado);
                echo json_encode($datos);
            }

        } catch (Exception $e) {
            // include "funcionError.php";
            $datos = new stdClass();
            $mensaje = $e->getMessage();
            $linea = "autenticacion.php" . " : LINEA  : " . __LINE__  ;
            // error($mensaje, $linea );
            $datos->mensaje =   $mensaje . " || " . $linea;
            echo json_encode( $datos );
        }
            
    }else{
        $datos = new stdClass();
        $datos->operacion = false;
        $datos->mensaje = "ERROR EN LOS DATOS ENVIADOS " . "LINEA : " . __LINE__;
        echo json_encode( $datos );
    }
                            
    mysqli_free_result($resultado);
?>