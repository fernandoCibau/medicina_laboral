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

                $sql = "SELECT id FROM empresas WHERE razon_social = '$empresa'";
                $resultado = mysqli_query($conexion, $sql);
                
                // Verifica si se obtuvo algún resultado
                if ($resultado && mysqli_num_rows($resultado) > 0) {
                    // Extrae el id de la empresa
                    $fila = mysqli_fetch_assoc($resultado);
                    $id_empresa = $fila['id'];
                } else {
                    // Manejo del caso cuando no se encuentra la empresa
                    echo json_encode(['mensaje' => 'Error: La empresa no existe en la base de datos', 'operacion' => FALSE]);
                    exit;
                }
                   
                    $hashContrasenia = password_hash( trim($_POST['contrasenia']), PASSWORD_DEFAULT);
                    
                    $sql = "INSERT INTO usuarios(empresa_id, nombre_usuario, contrasenia, email, tipo_usuario)
                            VALUES ('$id_empresa', '$nombre', '$hashContrasenia', '$email', '$admin' )";
                
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