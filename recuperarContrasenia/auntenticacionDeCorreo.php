<?php
include '../conexion.php';



if(isset($_POST["correo"]) ){
    
   $email =$_POST["correo"];

     $emailCheck = "SELECT * FROM usuarios WHERE email = '$email'"; 
     $resultado = mysqli_query($conexion, $emailCheck);

     if($resultado = mysqli_fetch_assoc($resultado) != null){
        echo json_encode( [ 'mensaje' => 'true', 'operacion' => true ]);
        
     }else{
        echo json_encode( [ 'mensaje' => 'false', 'operacion' => false ]);
     }
       
     
}

?>