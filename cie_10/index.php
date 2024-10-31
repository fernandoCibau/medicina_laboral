<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Códigos CIE-10</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <header>
        <h1>Códigos CIE-10</h1>
        <label for="buscarPorDescripcion">Buscar por descripcion</label>
        <input type="text" name="buscarPorDescripcion" id="buscarPorDescripcion" placeholder="Ingrese min 3 caracteres">
        <label for="buscarPorCodigo">Buscar por codigo</label>
        <input type="text" name="buscarPorCodigo" id="buscarPorCodigo" placeholder="Ingrese min 1 caracter">
    </header>

        <table id="cie10Table">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nivel</th>
                    <th>Descripción</th>
                    <th>cod-0</th>
                    <th>cod-1</th>
                    <th>cod-2</th>
                    <th>cod-3</th>
                    <th>cod-4</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </main>
            
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="index.js"></script>

    <footer>

    </footer>
</body>
</html>
