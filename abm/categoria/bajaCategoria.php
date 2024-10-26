<?php
if (isset($_POST['nombre'])) {
    try {
        include "../../conexion.php";

        $nombre = $_POST['nombre'];

        // Verificar si la categoria con el id existe
        $stmt = $conexion->prepare("SELECT * FROM categorias WHERE nombre = ?");
        $stmt->bind_param("s", $nombre);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            // Si existe, eliminar la categoria
            $stmt = $conexion->prepare("DELETE FROM categorias WHERE nombre = ?");
            $stmt->bind_param("s", $nombre); 
            $resultado = $stmt->execute();

            if ($resultado) {
                echo json_encode(['mensaje' => 'La categoria fue eliminada con éxito', 'operacion' => TRUE]);
            } else {
                echo json_encode(['mensaje' => 'Error al intentar eliminar la categoria. Línea: ' . __LINE__, 'operacion' => FALSE]);
            }
        } else {
            echo json_encode(['mensaje' => 'ERROR. No se encontró ninguna categoria con ese ID.', 'operacion' => FALSE]);
        }

        $stmt->close(); // Cerrar el statement correctamente

    } catch (Exception $e) {
        echo json_encode(['mensaje' => 'Error: ' . $e->getMessage(), 'linea' => __LINE__, 'operacion' => FALSE]);
    }
} else {
    echo json_encode(['mensaje' => 'No se recibieron datos desde el formulario']);
}

// Cerrar la conexión
$conexion->close();
?>