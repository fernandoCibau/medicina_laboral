<?php

include "../../conexion.php";

// Obtener el nombre de la empresa desde la solicitud POST
$categoriaNombre = $_POST['categoria'] ?? '';

// Verificar si se ha recibido un nombre de empresa
if (empty($categoriaNombre)) {
    echo json_encode(['operacion' => false, 'mensaje' => 'No se recibió el nombre de la categoria.']);
    exit();
}

// Preparar la consulta SQL para obtener el ID de la empresa
$query = "SELECT id FROM categorias WHERE nombre = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("s", $categoriaNombre);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró la empresa
if ($result->num_rows > 0) {
    $empresa = $result->fetch_assoc();
    echo json_encode(['operacion' => true, 'id_categoria' => $categoriaNombre['id']]);
} else {
    echo json_encode(['operacion' => false, 'mensaje' => 'Categoria no encontrada.']);
}

// Cerrar la conexión
$stmt->close();
$conexion->close();
?>
