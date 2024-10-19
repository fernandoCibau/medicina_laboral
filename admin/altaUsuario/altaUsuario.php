<?php

    if(isset($_POST['email']) && isset($_POST['contrasenia'])){

        try {
            include "../../conexion.php";
            
            $apellido = $_POST['apellido'];
            $dni = $_POST['dni'];
            
            $sql = "SELECT * FROM usuarios WHERE apellido= '$apellido' AND dni= '$dni' ";
            $resultado = mysqli_query($conexion, $sql );
            
            $num_filas = mysqli_num_rows($resultado);
            
            if($num_filas){
                echo json_encode( ['mensaje' => 'ERROR, EL USUARIO YA EXISTE', 'operacion'=> FALSE]);
            }else{ 

                $nombre  = $_POST['nombre'];
                $email = $_POST['email'];
                $contrasenia = password_hash($contrasenia, PASSWORD_DEFAULT);
                $admin = $_POST['admin'];
                
                $sql = "INSERT INTO usuarios(nombre, apellido, dni, email, contrasenia, admin)
                            VALUES ('$nombre', '$apellido', '$dni', '$email', '$contrasenia', '$admin' )";
                
                $resultado = mysqli_query( $conexion, $sql );
                
                // echo json_encode("asd");                
                if($resultado){
                    echo json_encode( ['mensaje' => 'SE REGISTO CON EXITO A ' , 'operacion' => TRUE ] );
                }else{
                    echo json_encode( ['mensaje' => 'Error, no se pudo registrar, LINEA : ' .  __LINE__, 'operacion' => TRUE ] );
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