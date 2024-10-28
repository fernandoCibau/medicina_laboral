

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Medicina Laboral |  Inicio Session</title>
</head>
<body>

    <main>
        <div class="container">
            <div class="logo">
                <h1>BIENVENIDO</h1>
            </div>
            <div class="login-box">
                <div class="left-panel">
                    <h2>CLINICA EL SALVADOR</h2>
                </div>
                <div class="right-panel">
                    <h3>Ingrese su correo electronico</h3>

                    <form   method="post" id="formContraseña">
                        <input required type="email" name="correo">
                        
                        <p id="mensaje" class="hidde" >-</p>
                        
                        <div class="loader hidde"></div>
                        <button id="enviarBTN">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </main>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./index.js"></script>
    <footer>

    </footer>
</body>
</html>