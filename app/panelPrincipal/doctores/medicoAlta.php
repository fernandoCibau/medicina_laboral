<?php
if ( isset($_POST['matricula']) || isset($_POST['dni']) || isset($_POST['apellido']) || isset($_POST['nombre'])  || isset($_POST['especialidad'])|| isset($_POST['email']) || isset($_POST['password'])) {
    try{

        include "../../conexion.php";
        
        $nombre         = $_POST['nombre'];
        $especialidad = $_POST['especialidad'];
        $matricula       = $_POST['matricula'] ?? null;
        $dni                 = $_POST['dni'] ?? null;
        $apellido         = $_POST['apellido'] ?? null;
        $email             = $_POST['email'];
        $password          = $_POST['password'] ;
        $password = password_hash( trim($password), PASSWORD_DEFAULT);

        $sql= "SELECT * FROM medicos WHERE dni = '$dni'";
        $resultado = mysqli_query($conexion, $sql);
        if(mysqli_num_rows($resultado)){
            mysqli_free_result($resultado);
            echo json_encode( ['mensaje' => 'El medico ya existe', 'operacion' => FALSE]);
        } else {
            $sql = "INSERT INTO medicos 
                        ( nombre, especialidad, matricula, dni, apellido, email )
                    VALUES
                        ('$nombre', '$especialidad', '$matricula', '$dni', '$apellido', '$email' ) ";
            
            $resultado = mysqli_query($conexion, $sql);
            
            if($resultado){
                echo json_encode(['mensaje' => 'El médico fue agregado con éxito', 'operacion' => TRUE]);
            }else{
                echo json_encode(['mensaje' => 'ERROR, No se pudo agregar el medico' , 'operacion' => FALSE] )  ;
            }
            $medico_id = $conexion->insert_id;
            $tipo_usuario = 2;

            $sql = "INSERT INTO usuarios 
                        (nombre_usuario, contrasenia, email, tipo_usuario, medico)
                    VALUES
                        ('$apellido', '$password', '$email', '$tipo_usuario', '$medico_id')";
            $resultado = mysqli_query($conexion, $sql);

            if($resultado){
                echo json_encode(['mensaje' => 'El usuario del medico fue agregado con éxito', 'operacion' => TRUE]);
            }else{
                echo json_encode(['mensaje' => 'ERROR, No se pudo crear el usuario' , 'operacion' => FALSE] )  ;
            }
        }
 
        mysqli_close($conexion);
        
    } catch (Exception $e) {
        $error = "Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage();
        echo json_encode(['mensaje' => 'Ocurrió un error', 'error'=> $error ]);
    }

}else{
    echo json_encode(['mensaje' => 'No se recibieron datos suficientes desde el formulario',  'operacion' => FALSE ]);
}
?>