<?php
if (isset($_POST['id'])) {
    try {
        include "../../conexion.php";

        $id = $_POST['id'];

        // Verificar si la empresa con el id existe
        $stmt = $conexion->prepare("SELECT * FROM empresas WHERE id = ?");
        $stmt->bind_param("i", $id); // Cambiado a "i" para integer
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            // Si existe, eliminar la empresa
            $stmt = $conexion->prepare("DELETE FROM empresas WHERE id = ?");
            $stmt->bind_param("i", $id); // Cambiado a "i" para integer
            $resultado = $stmt->execute();

            if ($resultado) {
                echo json_encode(['mensaje' => 'La empresa fue eliminada con éxito', 'operacion' => TRUE]);
            } else {
                echo json_encode(['mensaje' => 'Error al intentar eliminar la empresa. Línea: ' . __LINE__, 'operacion' => FALSE]);
            }
        } else {
            echo json_encode(['mensaje' => 'ERROR. No se encontró ninguna empresa con ese ID.', 'operacion' => FALSE]); // Cambiado mensaje
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