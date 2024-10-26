<?php
if (isset($_POST['id_empresa'], $_POST['legajo'], $_POST['dni'], $_POST['apellido'], $_POST['nombre'], $_POST['fecha_nacimiento'])) {
    try {
        include "../../conexion.php";

        // Asignación de variables
        $id_empresa = $_POST['id_empresa'];
        $legajo = $_POST['legajo'];
        $dni = $_POST['dni'];
        $apellido = $_POST['apellido'];
        $nombre = $_POST['nombre'];
        $domicilio = isset($_POST['domicilio']) ? $_POST['domicilio'] : null;
        $fecha_nacimiento = $_POST['fecha_nacimiento'];
        $fecha_ingreso = isset($_POST['fecha_ingreso']) ? $_POST['fecha_ingreso'] : null;
        $id_categoria = isset($_POST['id_categoria']) ? $_POST['id_categoria'] : null;
        $id_seccion = isset($_POST['id_seccion']) ? $_POST['id_seccion'] : null;
        $observaciones = isset($_POST['observaciones']) ? $_POST['observaciones'] : null;

        // Verificar si el empleado ya existe
        $stmt = $conexion->prepare("SELECT * FROM empleados WHERE dni = ?");
        $stmt->bind_param("i", $dni);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            echo json_encode(['mensaje' => 'ERROR. El empleado ya existe.', 'operacion' => FALSE]);
        } else {
            // Consulta de inserción
            $stmt = $conexion->prepare("INSERT INTO `empleados` (`legajo`, `dni`, `nombre`, `apellido`, `domicilio`, `fecha_nacimiento`, `fecha_ingreso`, `id_categoria`, `id_seccion`, `observaciones`, `id_empresa`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("iisssssiiis", $legajo, $dni, $nombre, $apellido, $domicilio, $fecha_nacimiento, $fecha_ingreso, $id_categoria, $id_seccion, $observaciones, $id_empresa);
            
            // Ejecutar y verificar la consulta
            $resultado = $stmt->execute();
            if ($resultado) {
                echo json_encode(['mensaje' => 'El empleado se registró con éxito', 'operacion' => TRUE]);
            } else {
                echo json_encode(['mensaje' => 'Error, no se pudo registrar. Línea: ' . __LINE__, 'operacion' => FALSE]);
            }
        }

        $stmt->close();
    } catch (Exception $e) {
        echo json_encode(['mensaje' => 'Error: ' . $e->getMessage(), 'linea' => __LINE__, 'operacion' => FALSE]);
    }
} else {
    echo json_encode(['mensaje' => 'No se recibieron datos suficientes desde el formulario']);
}

// Cerrar la conexión
$conexion->close();
?>