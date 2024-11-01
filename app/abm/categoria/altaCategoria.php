<?php
if (isset($_POST['nombre'])) {
    try {
        include "../../conexion.php";

        $nombre = $_POST['nombre'];

        // Preparar la consulta para verificar si la categoría ya existe
        $stmt = $conexion->prepare("SELECT * FROM categorias WHERE nombre = ?");
        $stmt->bind_param("s", $nombre);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            echo json_encode(['mensaje' => 'ERROR. La categoría ya existe.', 'operacion' => FALSE]);
        } else {
            // Preparar la consulta de inserción
            $stmt = $conexion->prepare("INSERT INTO categorias (nombre) VALUES (?)");
            $stmt->bind_param("s", $nombre);
            $resultado = $stmt->execute();

            if ($resultado) {
                echo json_encode(['mensaje' => 'La categoría se registró con éxito', 'operacion' => TRUE]);
            } else {
                echo json_encode(['mensaje' => 'Error, no se pudo cargar la categoría. Línea: ' . __LINE__, 'operacion' => FALSE]);
            }
        }

        $stmt->close();

    } catch (Exception $e) {
        echo json_encode(['mensaje' => 'Error: ' . $e->getMessage(), 'linea' => __LINE__, 'operacion' => FALSE]);
    }
} else {
    echo json_encode(['mensaje' => 'No se recibieron datos desde el formulario']);
}

// Cerrar la conexión
$conexion->close();
?>