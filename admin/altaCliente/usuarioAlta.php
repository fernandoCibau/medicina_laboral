<?php

    if(isset($_POST['email']) && isset($_POST['contrasenia'])){

        try{

            include "../conexionPDO.php";

            $sql = "SELECT * FROM usuarios WHERE email = :email";
            $stmt = $conexion->prepare($sql);
            $stmt-> bindParam(":email", $_POST['email']);
            $stmt->execute();
            $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $conexion = null;

            if($resultado){

                $datos = new stdClass();
                $datos->busquedad = true; 
                $datos->mensaje =" ERROR, EL USUARIO YA EXISTE";
                echo json_encode($datos);

            }else{
                include "../conexionPDO.php";

                $hashContrasenia = password_hash( $_POST['contrasenia'], PASSWORD_DEFAULT);

                $sql = "INSERT INTO usuarios(nombre, apellido, email, contrasenia, dni, adm)
                            VALUES (:nombre, :apellido, :email, :contrasenia, :dni, :adm)";
                $stmt = $conexion->prepare($sql);

                $stmt->bindParam(":nombre", $_POST['nombre']);
                $stmt->bindParam(":apellido", $_POST['apellido']);
                $stmt->bindParam(":email", $_POST['email']);
                $stmt->bindParam(":contrasenia", $hashContrasenia );
                $stmt->bindParam(":dni", $_POST['dni']);
                $stmt->bindParam(":adm", $_POST['adm']);

                $resultado = $stmt->execute();
                
                $conexion = null;

                if($resultado){
                    $datos = new stdClass();
                    $datos->busquedad = false;
                    $datos->mensaje = "SE REGISTO CON EXITO A " . $_POST['nombre'];
                    echo json_encode($datos);
                }

            }
        } catch (Exception $e) {
            include "../funcionError.php";
            $datos = new stdClass();
            $mensaje = $e->getMessage();
            $linea = "usuarioAlta.php" . " : " . "LINEA : " . __LINE__  ;
            error($mensaje, $linea );
            $datos->mensaje = $mensaje . $linea;
            echo json_encode( $datos );
        }

    }else{
        $datos = new stdClass();
            $datos->mensaje = "NO SE RECIBIO DATOS DESDE EL FORMULARIO"; 
            echo json_encode($datos);
    }
?>