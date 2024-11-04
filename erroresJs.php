<?php
date_default_timezone_set('America/Argentina/Buenos_Aires');
if (isset($_POST['error'])) {
    $error = $_POST['error'];
    $fechaHoraActual = date('Y-m-d H:i:s');
    
    // Escribir el error en un archivo de log
    file_put_contents('error.log', "[$    $fechaHoraActual ;] $error\n", FILE_APPEND);  //RUTA Y ERROR
}
?>
