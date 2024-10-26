<?php

    if(isset($_POST['email']) && isset($_POST['contrasenia'])){

        try {
            include "../../conexion.php";
            
            $apellido = $_POST['apellido'];
            $dni = $_POST['dni'];

            
            $sql = "SELECT * FROM usuarios WHERE dni= '$dni' ";
            $resultado = mysqli_query($conexion, $sql );
            $num_filas = mysqli_num_rows($resultado);
            
            if($num_filas){
                echo json_encode( ['mensaje' => 'ERROR, EL USUARIO YA EXISTE', 'operacion'=> FALSE]);
                exit;
            }else{ 
                $email = $_POST['email'];

                $sql = "SELECT * FROM usuarios WHERE email= '$email' ";
                $resultado = mysqli_query($conexion, $sql);
                $num_filas = mysqli_num_rows($resultado);
                
                if($num_filas){
                    echo json_encode( ['mensaje' => 'ERROR, EL EMAIL YA EXISTE', 'operacion'=> FALSE]);
                    exit;
                }else{

                    $nombre  = $_POST['nombre'];
                    $hashContrasenia = password_hash( trim($_POST['contrasenia']), PASSWORD_DEFAULT);
                    $admin = $_POST['admin'];
                    
                    $sql = "INSERT INTO usuarios(nombre, apellido, dni, email, contrasenia, admin)
                            VALUES ('$nombre', '$apellido', '$dni', '$email', '$hashContrasenia', '$admin' )";
                
                    $resultado = mysqli_query( $conexion, $sql );
                        
                    if($resultado){
                        echo json_encode( ['mensaje' => 'SE REGISTO CON EXITO A ' . $nombre , 'operacion' => TRUE ] );
                    }else{
                        echo json_encode( ['mensaje' => 'Error, no se pudo registrar, LINEA : ' .  __LINE__, 'operacion' => TRUE ] );
                    }
                }
            }
            
        } catch (Exception $e) {
            echo json_encode(['mensaje' => 'Error: ' . $e->getMessage(), 'LINEA : ' . __LINE__ , 'operacion' => FALSE ]);
        }
            
    }else{
        echo json_encode( [ 'mensaje' =>  'NO SE RECIBIO DATOS DESDE EL FORMULARIO' ]);
    }

    // mysqli_close($conexion);
?>