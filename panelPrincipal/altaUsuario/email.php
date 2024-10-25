<?php
    session_start();

    if( isset( $_POST['email']) ){

        if( !empty( $_POST['email'])){
            $de = $_SESSION['email'];
            $para = $_POST['email'];
            $asunto = $_POST['asunto'];
            $mensaje = $_POST['mensaje'];

            $header = "From: $de\r\n";
            $header .= "responder a: <$de> \r\n";
            $header .= "Fecha: " . date('Y-m-d H:i:s') ."\r\n";
            // $header .= "X-Mailer: PHP/" . phpversion();
        
            
            $rta = mail( $para, $asunto, $mensaje, $header );

            if($rta){
                $datos = new stdClass();
                $datos->mensaje=     "Email enviado exitosamente.!";
                $datos->email = $para;
                $datos->rta = $rta;
                echo json_encode($datos);
            }else{
                $datos = new stdClass();
                $datos->error=     "Ocurrio un error en el envio, LINEA ". __LINE__;
                echo json_encode($datos);
            }
        }
        else{
            $datos = new stdClass();
            $datos->mensaje=     "No";
            $datos->email=    $para;
            echo json_encode($datos);
        }

    }
?>