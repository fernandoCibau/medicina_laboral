<?php

    if(isset($_POST['email']) && isset($_POST['contrasenia'])){

       try{
            include "../../conexion.php";
            
            $nombre = $_POST['nombre_usuario'];
            $empresa = $_POST['empresa'];
            $email = $_POST['email'];
            $contrasenia = $_POST['contrasenia'];
            $admin = $_POST['admin'];

            
        
    
            
            $sql = "SELECT * FROM usuarios WHERE email= '$email' ";
            $resultado = mysqli_query($conexion, $sql );
            $num_filas = mysqli_num_rows($resultado);
            
            if($num_filas){
                echo json_encode( ['mensaje' => 'ERROR, EL USUARIO YA EXISTE', 'operacion'=> FALSE]);
                exit;
            }else{ 
                

                $sql = "SELECT * FROM usuarios WHERE email= '$email' ";
                $resultado = mysqli_query($conexion, $sql);
                $num_filas = mysqli_num_rows($resultado);
                   
                    $hashContrasenia = password_hash( trim($_POST['contrasenia']), PASSWORD_DEFAULT);
                    
                    $sql = "INSERT INTO usuarios(empresa_id, nombre_usuario, contrasenia, email, tipo_usuario)
                            VALUES (             '$empresa', '$nombre',     '$hashContrasenia', '$email', '$admin' )";
                
                    $resultado = mysqli_query( $conexion, $sql );
                        
                    if($resultado){
                        echo json_encode( ['mensaje' => 'SE REGISTO CON EXITO A ' . $nombre , 'operacion' => TRUE ] );
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

    // mysqli_close($conexion);*/
?>