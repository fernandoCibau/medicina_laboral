<?php
if (isset($_POST['id']) && (isset($_POST['matricula']) || isset($_POST['dni']) || isset($_POST['apellido']) || isset($_POST['nombre'])  || isset($_POST['especialidad'])) ) {

    try {
        include "../../conexion.php";

        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $especialidad = $_POST['especialidad'];
        $matricula = $_POST['matricula'] ?? null;
        $dni = $_POST['dni'] ?? null;
        $apellido = $_POST['apellido'] ?? null;
        $email = $_POST['email'];

        $sql = "SELECT * FROM medicos WHERE id='$id' ";
        $resultado = mysqli_query($conexion, $sql);

        if ( mysqli_num_rows($resultado) ) {

            $sql = "UPDATE medicos 
            SET 
                nombre          = '$nombre', 
                especialidad  = '$especialidad', 
                matricula        = '$matricula', 
                dni                  = '$dni', 
                apellido          = '$apellido', 
                email              = '$email' 
            WHERE id = '$id'";

            $resultado = mysqli_query($conexion, $sql); 

            if ($resultado) {
                echo json_encode(['mensaje' => 'El doctor fue modificado con éxito', 'operacion' => TRUE]);
            } else {
                echo json_encode(['mensaje' => 'Error al intentar modificar al doctor. Línea: ' . __LINE__, 'operacion' => FALSE]);
            }
            
            mysqli_close($conexion);
        } else {
            echo json_encode(['mensaje' => 'ERROR. No se encontró ningun doctor con ese ID.', 'operacion' => FALSE]);
        }

    } catch (Exception $e) {
        $error = "Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage();
        echo json_encode(['mensaje' => 'Ocurrió un error', 'error'=> $error ]);
    }
} else {
    echo json_encode(['mensaje' => 'No se recibieron datos suficientes desde el formulario', 'operacion' => FALSE ]);
}
?>