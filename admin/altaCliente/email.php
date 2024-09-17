<?php
    if( isset( $_POST['email']) ){

        if( !empty( $_POST['email'])){
            $email = $_POST['email'];
            $mensaje = $_POST['mensaje'];
            $asunto = "PROBANDO";

            $header = "From: admin_medicina@medicinalaboral.codemaster.com.ar\r\n";
            $header .= "Ha recibido: admin_medicina@medicinalaboral.codemaster.com\r\n";
            $header .= "Fecha: " . date('Y-m-d H:i:s') ."\r\n";
            $header .= "X-Mailer: PHP/" . phpversion();
        
            
            $rta = mail( $email, $asunto, $mensaje, $header );

            if($rta){
                $datos = new stdClass();
                $datos->mensaje=     "Email enviado exitosamente.!";
                $datos->email = $email;
                $datos->rta = $rta;
                echo json_encode($datos);
            }else{
                $datos = new stdClass();
                $datos->error=     "Ocurrio un error en el envio, LINEA ". __LINE__;
            }
        }
        else{
            $datos = new stdClass();
            $datos->mensaje=     "No";
            $datos->email=     $_POST['email'];
            echo json_encode($datos);
        }

    }



?>