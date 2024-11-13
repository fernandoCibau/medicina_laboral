<?php
if (isset($_POST['id']) && (isset($_POST['legajo']) || isset($_POST['dni']) || isset($_POST['apellido']) || isset($_POST['nombre']) || isset($_POST['domicilio']) || isset($_POST['fecha_nacimiento']) || isset($_POST['fecha_ingreso']) || isset($_POST['observaciones']) || isset($_POST['id_empresa']))) {
    try {
        include "../../conexion.php";
        include "error_config.php";

        $id = $_POST['id'];
        $legajo = isset($_POST['legajo']) ? $_POST['legajo'] : null;
        $dni = isset($_POST['dni']) ? $_POST['dni'] : null;
        $apellido = isset($_POST['apellido']) ? $_POST['apellido'] : null;
        $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
        $domicilio = isset($_POST['domicilio']) ? $_POST['domicilio'] : null;
        $fecha_nacimiento = isset($_POST['fecha_nacimiento']) ? $_POST['fecha_nacimiento'] : null;
        $fecha_ingreso = isset($_POST['fecha_ingreso']) ? $_POST['fecha_ingreso'] : null;
        $observaciones = isset($_POST['observaciones']) ? $_POST['observaciones'] : null;


        // Verificar si el empleado con el id existe
        $stmt = $conexion->prepare("SELECT * FROM empleados WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            // Construir la consulta de actualización dinámicamente según los campos proporcionados
            $campos = [];
            $valores = [];
            $tipos = "";

            if ($legajo) {
                $campos[] = "legajo = ?";
                $valores[] = $legajo;
                $tipos .= "i";
            }

            if ($dni) {
                $campos[] = "dni = ?";
                $valores[] = $dni;
                $tipos .= "i";
            }

            if ($apellido) {
                $campos[] = "apellido = ?";
                $valores[] = $apellido;
                $tipos .= "s";
            }

            if ($nombre) {
                $campos[] = "nombre = ?";
                $valores[] = $nombre;
                $tipos .= "s";
            }

            if ($domicilio) {
                $campos[] = "domicilio = ?";
                $valores[] = $domicilio;
                $tipos .= "s";
            }

            if ($fecha_nacimiento) {
                $campos[] = "fecha_nacimiento = ?";
                $valores[] = $fecha_nacimiento;
                $tipos .= "s";
            }

            if ($fecha_ingreso) {
                $campos[] = "fecha_ingreso = ?";
                $valores[] = $fecha_ingreso;
                $tipos .= "s";
            }

            if ($observaciones) {
                $campos[] = "observaciones = ?";
                $valores[] = $observaciones;
                $tipos .= "s";
            }

            if ($id_empresa) {
                $campos[] = "id_empresa = ?";
                $valores[] = $id_empresa;
                $tipos .= "i";
            }

            // Unir los campos actualizables con comas
            $sql = "UPDATE empleados SET " . implode(", ", $campos) . " WHERE id = ?";
            $stmt = $conexion->prepare($sql);

            // Añadir el id al final de los valores y el tipo 'i'
            $valores[] = $id;
            $tipos .= "i";

            // Usar array para pasar los parámetros a bind_param
            $stmt->bind_param($tipos, ...$valores);

            // Ejecutar la consulta
            $resultado = $stmt->execute();

            if ($resultado) {
                echo json_encode(['mensaje' => 'El empleado fue modificado con éxito', 'operacion' => TRUE]);
            } else {
                echo json_encode(['mensaje' => 'Error al intentar modificar el empleado. Línea: ' . __LINE__, 'operacion' => FALSE]);
            }
        } else {
            echo json_encode(['mensaje' => 'ERROR. No se encontró ningún empleado con ese ID.', 'operacion' => FALSE]);
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