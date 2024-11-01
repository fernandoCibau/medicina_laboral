<?php

include "../../conexion.php";

if (isset($_POST['buscar_categoria'])) {
    $nombre_categoria = $conexion->real_escape_string($_POST['buscar_categoria']);

    $query = "SELECT * FROM categorias WHERE nombre LIKE '%$nombre_categoria%' LIMIT 10";
    $resultado = mysqli_query($conexion, $query);

    if (mysqli_num_rows($resultado) > 0) {
        echo "<ul>";
        while ($categoria = $resultado->fetch_assoc()) {
            echo "<li>" . htmlspecialchars($categoria['nombre']) . "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>No se encontraron resultados</p>";
    }

    $resultado->free();
}
$conexion->close();
?>