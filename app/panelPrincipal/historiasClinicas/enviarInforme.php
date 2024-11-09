<?php 
   include "../../conexion.php";


   // Supongamos que tienes la conexión en la variable $conexion
$idCon = $_POST['id'];
$sql = "SELECT 
            cm.id AS consulta_id,
            cm.fecha,
            cm.medico_certificado,
            cm.diagnostico_cie10,
            cm.solicitud_ausentismo,
            cm.fecha_inicio_ausentismo,
            cm.fecha_fin_ausentismo,
            cm.observaciones,
            e.nombre AS empleado_nombre,
            e.apellido AS empleado_apellido,
            e.id_empresa AS empleado_empresa,
            emp.razon_social AS empresa_razon_social,
            emp.email AS email
        FROM 
            consultamedica cm
        JOIN 
            empleados e ON cm.id_empleado = e.id
        JOIN 
            empresas emp ON e.id_empresa = emp.id
        WHERE 
            e.id = $idCon";

            

// Ejecutar la consulta
$resultado = mysqli_query($conexion, $sql);

// Crear un array para almacenar el resultado
$response = array();

if (mysqli_num_rows($resultado) > 0) {
    // Obtener el único registro
    $fila = mysqli_fetch_assoc($resultado);

    // Llenar el array de respuesta con los datos
    $response = array(
        "consulta_id" => $fila['consulta_id'],
        "fecha" => $fila['fecha'],
        "medico_certificado" => $fila['medico_certificado'],
        "diagnostico_cie10" => $fila['diagnostico_cie10'],
        "solicitud_ausentismo" => $fila['solicitud_ausentismo'],
        "fecha_inicio_ausentismo" => $fila['fecha_inicio_ausentismo'],
        "fecha_fin_ausentismo" => $fila['fecha_fin_ausentismo'],
        "observaciones" => $fila['observaciones'],
        "empleado_nombre" => $fila['empleado_nombre'],
        "empleado_apellido" => $fila['empleado_apellido'],
        "empleado_empresa" => $fila['empleado_empresa'],
        "empresa_razon_social" => $fila['empresa_razon_social'],
        "email" => $fila['email']
    );
} else {
    // Si no se encuentra ningún registro, devolver un mensaje de error
    $response = array("error" => "No se encontró ningún registro para el ID especificado.");
}

$para = $response["email"];
$de = "From: nachomelga123@gmail.com";
$asunto = "Prueba de informe";
$mensaje = "fdasdsadsa";


// Configurar el encabezado para indicar que la respuesta es JSON
header('Content-Type: application/json');

// Enviar la respuesta como JSON
echo json_encode($response);

// Liberar resultados
mysqli_free_result($resultado);

// Cerrar conexión
mysqli_close($conexion);



/*
   $id = $_POST["id"];
    $sql = "SELECT 
        cm.id AS consulta_id,
        cm.fecha,
        cm.medico_certificado,
        cm.diagnostico_cie10,
        cm.solicitud_ausentismo,
        cm.fecha_inicio_ausentismo,
        cm.fecha_fin_ausentismo,
        cm.observaciones,
        e.nombre AS empleado_nombre,
        e.apellido AS empleado_apellido,
        e.id_empresa AS empleado_empresa,
        emp.razon_social AS empresa_razon_social,
        emp.email AS email
        FROM 
        consultamedica cm
        JOIN 
         empleados e ON cm.id_empleado = e.id
        JOIN 
          empresas emp ON e.id_empresa = emp.id
        WHERE 
         e.id = 1";

                 
                    $resultado = mysqli_query($conexion, $sql);
                    $filas = mysqli_num_rows($resultado);


                 /*  if (mysqli_num_rows($resultado) > 0) {
                    // Recorrer cada fila de resultados
                    while ($fila = mysqli_fetch_assoc($resultado)) {
                        echo "Consulta ID: " . $fila['consulta_id'] . "<br>";
                        echo "Fecha: " . $fila['fecha'] . "<br>";
                        echo "Médico Certificado: " . $fila['medico_certificado'] . "<br>";
                        echo "Diagnóstico CIE10: " . $fila['diagnostico_cie10'] . "<br>";
                        echo "Solicitud Ausentismo: " . $fila['solicitud_ausentismo'] . "<br>";
                        echo "Fecha Inicio Ausentismo: " . $fila['fecha_inicio_ausentismo'] . "<br>";
                        echo "Fecha Fin Ausentismo: " . $fila['fecha_fin_ausentismo'] . "<br>";
                        echo "Observaciones: " . $fila['observaciones'] . "<br>";
                        echo "Empleado Nombre: " . $fila['empleado_nombre'] . "<br>";
                        echo "Empleado Apellido: " . $fila['empleado_apellido'] . "<br>";
                        echo "Empresa Razón Social: " . $fila['empresa_razon_social'] . "<br>";
                        echo "Email Empresa: " . $fila['email'] . "<br><br>";
                    }
                } else {
                    echo "No se encontraron resultados para el ID especificado.";
                }*/

                    //$filas = $datos

                  // echo json_encode(['mensaje' => 'correo enviado extitosamente', 'filas' => $filas, 'datos' =>$resultado, 'operacion' => TRUE]);
                   


?>