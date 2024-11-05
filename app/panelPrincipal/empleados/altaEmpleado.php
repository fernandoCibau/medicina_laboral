<?php 
include "error_config.php";
include "../../conexion.php";
if (!$conexion) {
    echo json_encode(['mensaje' => 'Error de conexión a la base de datos', 'operacion' => false]);
    exit; // Detiene la ejecución si no hay conexión
}

if (isset($_POST['id_empresa']) && isset($_POST['dni']) && isset($_POST['apellido']) && isset($_POST['nombre']) && isset($_POST['fecha_nacimiento']) && isset($_POST['id_categoria']) && isset($_POST['id_seccion'])) {
    try {

        // Asignación de variables con valores por defecto
        $legajo = $_POST['legajo'] ?? null;
        $dni = $_POST['dni'];
        $apellido = $_POST['apellido'];
        $nombre = $_POST['nombre'];
        $domicilio = $_POST['domicilio'] ?? null;
        $fecha_nacimiento = $_POST['fecha_nac'];
        $fecha_ingreso = $_POST['fecha_ing'] ?? null;
        $id_categoria = $_POST['id_categoria'];
        $id_seccion = $_POST['id_seccion'];
        $observaciones = $_POST['observaciones'] ?? null;
        $id_empresa = $_POST['id_empresa'];

        // Verificar si el empleado ya existe por DNI
        $stmt = $conexion->prepare("SELECT * FROM empleados WHERE dni = ?");
        if (!$stmt) {
            echo json_encode(['mensaje' => 'Error preparando la consulta SELECT: ' . $conexion->error, 'operacion' => false]);
            exit;
        }

        $stmt->bind_param("i", $dni);
        if (!$stmt->execute()) {
            echo json_encode(['mensaje' => 'Error ejecutando SELECT: ' . $stmt->error, 'operacion' => false]);
            exit;
        }

        $resultado = $stmt->get_result();
        if ($resultado->num_rows > 0) {
            echo json_encode(['mensaje' => 'ERROR. El empleado ya existe.', 'operacion' => false]);
        } else {
            // Preparar la consulta de inserción
            $stmt = $conexion->prepare("INSERT INTO empleados (legajo, dni, nombre, apellido, domicilio, fecha_nacimiento, fecha_ingreso, id_categoria, id_seccion, observaciones, id_empresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            
            if (!$stmt) {
                echo json_encode(['mensaje' => 'Error preparando el INSERT: ' . $conexion->error, 'operacion' => false]);
                exit;
            }

            // Bind de parámetros con valores correctos para cada tipo
            $stmt->bind_param(
                "iisssssiisi", 
                $legajo, 
                $dni, 
                $nombre, 
                $apellido, 
                $domicilio, 
                $fecha_nacimiento, 
                $fecha_ingreso, 
                $id_categoria, 
                $id_seccion, 
                $observaciones, 
                $id_empresa
            );

            if (!$stmt->execute()) {
                echo json_encode(['mensaje' => 'Error ejecutando el INSERT: ' . $stmt->error, 'operacion' => false]);
                exit;
            } else {
                echo json_encode(['mensaje' => 'El empleado se registró con éxito', 'operacion' => true]);
            }
        }

        // Cerrar la declaración y conexión
        $stmt->close();
    } catch (Exception $e) {
        echo json_encode(['mensaje' => 'Error: ' . $e->getMessage(), 'linea' => __LINE__, 'operacion' => false]);
    }
} else {
    echo json_encode(['mensaje' => 'No se recibieron datos suficientes desde el formulario', 'operacion' => false]);
}

// Cerrar la conexión
$conexion->close();
exit;
?>