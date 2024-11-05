<?php
include '../../error_config.php';
if (isset($_POST[ 'idDoctor' ])) {
    
    try {
        include "../../conexion.php";
        
        $id = $_POST['idDoctor'];

        // Verificar si la empresa con el id existe
        $sql = "SELECT * FROM medicos WHERE id = '$id' ";
        $resultado = mysqli_query($conexion, $sql );
        
        if ( mysqli_num_rows($resultado)  ) {

            mysqli_free_result($resultado);

            $sql = "DELETE FROM turnos WHERE medico = '$id' ";
            mysqli_query($conexion, $sql );
            
            $sql = "DELETE FROM medicos WHERE id = '$id' ";
            mysqli_query($conexion, $sql );
            
            echo json_encode(['mensaje' => 'El doctor fue eliminado con éxito', 'operacion' => TRUE]);

        } else {
            echo json_encode(['mensaje' => 'ERROR. No se encontró ningun doctor con ese ID.', 'operacion' => FALSE]); // Cambiado mensaje
        }

        mysqli_close($conexion);
    } catch (Exception $e) {
        error_log("Error en " . $e->getFile() . " en la línea " . $e->getLine() . ": " . $e->getMessage());
        echo json_encode(['mensaje' => 'Ocurrió un error.']);
    }

} else {
    echo json_encode(['mensaje' => 'No se recibieron datos desde el formulario', __LINE__, 'operacion' => FALSE ]);
}
?>