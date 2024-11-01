<?php
if (isset($_POST['id'])) {
    try {
        include "../../conexion.php";

        $id = $_POST['id'];

        // Verificar si el empleado con el id existe
        $stmt = $conexion->prepare("SELECT * FROM empleados WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            $resultado->free();
            $stmt = $conexion->prepare("DELETE FROM empleados WHERE id = ?");
            $stmt->bind_param("i", $id);
            $resultado = $stmt->execute();

            if ($resultado) {
                echo json_encode(['mensaje' => 'El empleado fue eliminado con éxito', 'operacion' => TRUE]);
            } else {
                echo json_encode(['mensaje' => 'Error al intentar eliminar el empleado. Línea: ' . __LINE__, 'operacion' => FALSE]);
            }
        } else {
            echo json_encode(['mensaje' => 'ERROR. No se encontró ningún empleado con ese ID.', 'operacion' => FALSE]);
        }
        $stmt->close();

    } catch (Exception $e) {
        echo json_encode(['mensaje' => 'Error: ' . $e->getMessage(), 'linea' => __LINE__, 'operacion' => FALSE]);
    }
} else {
    echo json_encode(['mensaje' => 'No se recibió el ID del empleado desde el formulario']);
}

// Cerrar la conexión
$conexion->close();
?>