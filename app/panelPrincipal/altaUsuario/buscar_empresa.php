<?php

include "../../conexion.php";


if (isset($_POST['buscar_empresa'])) {
    $nombre_empresa = $conexion->real_escape_string($_POST['buscar_empresa']);

    // Consulta SQL para buscar coincidencias
    $query = "SELECT * FROM empresas WHERE razon_social LIKE '%$nombre_empresa%' LIMIT 10";
    $resultado = mysqli_query($conexion, $query);

    if ($resultado->num_rows > 0) {
        echo "<ul>";
        while ($empresa = $resultado->fetch_assoc()) {
            echo "<li>" . htmlspecialchars($empresa['razon_social']) . "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>No se encontraron resultados</p>";
    }

    $resultado->free();
}

$conexion->close();
?>