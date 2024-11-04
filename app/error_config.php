<?php
date_default_timezone_set('America/Argentina/Buenos_Aires');

// Configuración para registrar errores
error_reporting(E_ALL); // Registrar todos los errores
ini_set('display_errors', 'Off'); // No mostrar errores en el navegador
ini_set('log_errors', 'On'); // Habilitar registro de errores
ini_set('error_log', './error.log'); // Nombre del archivo y ruta donde se crea
?>