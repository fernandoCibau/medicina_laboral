<?php
if (isset($_POST['id_empleado'])) {
    try {
        include "../../conexion.php";

        $id_empleado = $_POST['id_empleado'];
        $fecha = $_POST['fecha'];
        $medico_certificado = $_POST['medico_certificado'];
        $diagnostico_cie10 = $_POST['diagnostico_cie10'];
        $solicitud_ausentismo = $_POST['solicitud_ausentismo'];
        $fecha_inicio_ausentismo = $_POST['fecha_inicio_ausentismo'];
        $fecha_fin_ausentismo = $_POST['fecha_fin_ausentismo'] ;
        $observaciones = $_POST['observaciones'] ;
       
        // Preparar la consulta de inserción
        $sql = "INSERT INTO consultamedica (id_empleado, fecha, medico_certificado, diagnostico_cie10, solicitud_ausentismo, fecha_inicio_ausentismo, fecha_fin_ausentismo, observaciones) 
                VALUES ('$id_empleado', '$fecha', '$medico_certificado', '$diagnostico_cie10', '$solicitud_ausentismo', '$fecha_inicio_ausentismo', '$fecha_fin_ausentismo', '$observaciones')";
        $resultado = mysqli_query($conexion, $sql);

        if ($resultado) {
            echo json_encode(['mensaje' => 'La consulta se registró con éxito', 'operacion' => TRUE]);
        } else {
            echo json_encode(['mensaje' => 'Error, no se pudo registrar. Línea: ' . __LINE__, 'operacion' => FALSE]);
        }
        
    } catch (Exception $e) {
        echo json_encode(['mensaje' => 'Error: ' . $e->getMessage(), 'linea' => __LINE__, 'operacion' => FALSE]);
    }
} else {
    echo json_encode(['mensaje' => 'No se recibieron datos desde el formulario']);
}

// Cerrar la conexión
$conexion->close();
?>