-- Crear la base de datos y usarla

CREATE DATABASE IF NOT EXISTS el_salvador;

USE el_salvador;


-- Estructura de tabla para la tabla `categorias`

CREATE TABLE categorias (

  id INT AUTO_INCREMENT PRIMARY KEY,

  nombre VARCHAR(30) NOT NULL

);


-- Volcado de datos para la tabla `categorias`

INSERT INTO categorias (id, nombre) VALUES

(1, 'Categoría 1'),

(2, 'Categoría 2'),

(3, 'Categoría 3'),

(4, 'Categoría 4'),

(5, 'Categoría 5'),

(6, 'Categoría 6'),

(7, 'Categoría 7'),

(8, 'Categoría 8'),

(9, 'Categoría 9'),

(10, 'Categoría 10');


-- Estructura de tabla para la tabla `seccion`

CREATE TABLE seccion (

  id INT AUTO_INCREMENT PRIMARY KEY,

  nombre VARCHAR(40) NOT NULL

);


-- Volcado de datos para la tabla `seccion`

INSERT INTO seccion (id, nombre) VALUES

(1, 'Sección 1'),

(2, 'Sección 2'),

(3, 'Sección 3'),

(4, 'Sección 4'),

(5, 'Sección 5'),

(6, 'Sección 6'),

(7, 'Sección 7'),

(8, 'Sección 8'),

(9, 'Sección 9'),

(10, 'Sección 10');


-- Estructura de tabla para la tabla `empresasclientes`

CREATE TABLE empresasclientes (

  id INT AUTO_INCREMENT PRIMARY KEY,

  razon_social VARCHAR(40) NOT NULL,

  cuit BIGINT NOT NULL,  -- Usar BIGINT para CUIT por su longitud

  domicilio VARCHAR(50) DEFAULT NULL,

  telefono BIGINT DEFAULT NULL,  -- Usar BIGINT para números de teléfono largos

  email VARCHAR(40) NOT NULL

);


-- Volcado de datos para la tabla `empresasclientes`

INSERT INTO empresasclientes (id, razon_social, cuit, domicilio, telefono, email) VALUES

(1, 'Empresa 1', 20123456789, 'Calle 1', 1234567890, 'contacto1@empresa.com'),

(2, 'Empresa 2', 20123456780, 'Calle 2', 1234567891, 'contacto2@empresa.com'),

(3, 'Empresa 3', 20123456781, 'Calle 3', 1234567892, 'contacto3@empresa.com'),

(4, 'Empresa 4', 20123456782, 'Calle 4', 1234567893, 'contacto4@empresa.com'),

(5, 'Empresa 5', 20123456783, 'Calle 5', 1234567894, 'contacto5@empresa.com'),

(6, 'Empresa 6', 20123456784, 'Calle 6', 1234567895, 'contacto6@empresa.com'),

(7, 'Empresa 7', 20123456785, 'Calle 7', 1234567896, 'contacto7@empresa.com'),

(8, 'Empresa 8', 20123456786, 'Calle 8', 1234567897, 'contacto8@empresa.com'),

(9, 'Empresa 9', 20123456787, 'Calle 9', 1234567898, 'contacto9@empresa.com'),

(10, 'Empresa 10', 20123456788, 'Calle 10', 1234567899, 'contacto10@empresa.com');



-- Estructura de tabla para la tabla `empleados`

CREATE TABLE empleados (

  id INT AUTO_INCREMENT PRIMARY KEY,

  legajo INT NOT NULL,

  dni INT NOT NULL,

  nombre VARCHAR(40) NOT NULL,

  apellido VARCHAR(40) NOT NULL,

  domicilio VARCHAR(50) DEFAULT NULL,

  fecha_nacimiento DATE NOT NULL,

  fecha_ingreso DATE DEFAULT NULL,

  id_categoria INT,

  id_seccion INT,

  observaciones VARCHAR(50) DEFAULT NULL,

  id_empresa INT,

  FOREIGN KEY (id_categoria) REFERENCES categorias(id),

  FOREIGN KEY (id_seccion) REFERENCES seccion(id),

  FOREIGN KEY (id_empresa) REFERENCES empresasclientes(id)

);


-- Volcado de datos para la tabla `empleados`

INSERT INTO empleados (id, legajo, dni, nombre, apellido, domicilio, fecha_nacimiento, fecha_ingreso, id_categoria, id_seccion, observaciones, id_empresa) VALUES

(1, 10001, 12345678, 'Empleado 1', 'Apellido 1', 'Domicilio 1', '1980-01-01', '2023-01-01', 1, 1, 'Observación 1', 1),

(2, 10002, 12345679, 'Empleado 2', 'Apellido 2', 'Domicilio 2', '1981-02-01', '2023-02-01', 2, 2, 'Observación 2', 2),

(3, 10003, 12345680, 'Empleado 3', 'Apellido 3', 'Domicilio 3', '1982-03-01', '2023-03-01', 3, 3, 'Observación 3', 3),

(4, 10004, 12345681, 'Empleado 4', 'Apellido 4', 'Domicilio 4', '1983-04-01', '2023-04-01', 4, 4, 'Observación 4', 4),

(5, 10005, 12345682, 'Empleado 5', 'Apellido 5', 'Domicilio 5', '1984-05-01', '2023-05-01', 5, 5, 'Observación 5', 5),

(6, 10006, 12345683, 'Empleado 6', 'Apellido 6', 'Domicilio 6', '1985-06-01', '2023-06-01', 6, 6, 'Observación 6', 6),

(7, 10007, 12345684, 'Empleado 7', 'Apellido 7', 'Domicilio 7', '1986-07-01', '2023-07-01', 7, 7, 'Observación 7', 7),

(8, 10008, 12345685, 'Empleado 8', 'Apellido 8', 'Domicilio 8', '1987-08-01', '2023-08-01', 8, 8, 'Observación 8', 8),

(9, 10009, 12345686, 'Empleado 9', 'Apellido 9', 'Domicilio 9', '1988-09-01', '2023-09-01', 9, 9, 'Observación 9', 9),

(10, 10010, 12345687, 'Empleado 10', 'Apellido 10', 'Domicilio 10', '1989-10-01', '2023-10-01', 10, 10, 'Observación 10', 10);


-- Estructura de tabla para la tabla `citas`

CREATE TABLE citas (

  id INT AUTO_INCREMENT PRIMARY KEY,

  empleado_id INT,

  fecha_de_cita DATETIME NOT NULL,

  doctor VARCHAR(40) NOT NULL,

  horario TIME DEFAULT NULL,

  FOREIGN KEY (empleado_id) REFERENCES empleados(id)

);


-- Volcado de datos para la tabla `citas`

INSERT INTO citas (id, empleado_id, fecha_de_cita, doctor, horario) VALUES

(1, 1, '2023-11-01 09:00:00', 'Dr. Martínez', '09:00:00'),

(2, 2, '2023-11-02 10:00:00', 'Dr. Pérez', '10:00:00'),

(3, 3, '2023-11-03 11:00:00', 'Dr. Gómez', '11:00:00'),

(4, 4, '2023-11-04 12:00:00', 'Dr. López', '12:00:00'),

(5, 5, '2023-11-05 13:00:00', 'Dr. Sánchez', '13:00:00'),

(6, 6, '2023-11-06 14:00:00', 'Dr. Ramírez', '14:00:00'),

(7, 7, '2023-11-07 15:00:00', 'Dr. Fernández', '15:00:00'),

(8, 8, '2023-11-08 16:00:00', 'Dr. Díaz', '16:00:00'),

(9, 9, '2023-11-09 17:00:00', 'Dr. Herrera', '17:00:00'),

(10, 10, '2023-11-10 18:00:00', 'Dr. Castro', '18:00:00');


-- Estructura de tabla para la tabla `consultamedica`

CREATE TABLE consultamedica (

  id INT AUTO_INCREMENT PRIMARY KEY,

  fecha DATE NOT NULL,

  medico_certificado VARCHAR(40) DEFAULT NULL,

  solicitud_diagnostico VARCHAR(40) DEFAULT NULL,

  solicitud_ausentismo VARCHAR(40) DEFAULT NULL,

  fecha_inicio_ausentismo DATE DEFAULT NULL,

  fecha_fin_ausentismo DATE DEFAULT NULL,

  observaciones VARCHAR(40) DEFAULT NULL

);


-- Volcado de datos para la tabla `consultamedica`

INSERT INTO consultamedica (id, fecha, medico_certificado, solicitud_diagnostico, solicitud_ausentismo, fecha_inicio_ausentismo, fecha_fin_ausentismo, observaciones) VALUES

(1, '2023-11-01', 'Certificado Médico 1', 'Diagnóstico 1', 'Ausentismo 1', '2023-11-01', '2023-11-10', 'Observación 1'),

(2, '2023-11-02', 'Certificado Médico 2', 'Diagnóstico 2', 'Ausentismo 2', '2023-11-02', '2023-11-11', 'Observación 1');


-- Estructura de tabla para la tabla `historiaclinica`

CREATE TABLE historiaclinica (

  id INT AUTO_INCREMENT PRIMARY KEY,

  empleado_id INT NOT NULL,

  consulta_medica_id INT NOT NULL,

  FOREIGN KEY (empleado_id) REFERENCES empleados(id),

  FOREIGN KEY (consulta_medica_id) REFERENCES consultamedica(id)

);


-- Estructura de tabla para la tabla `usuarios`

CREATE TABLE usuarios (

  id INT AUTO_INCREMENT PRIMARY KEY,

  empresa_id INT,

  nombre_usuario VARCHAR(40) NOT NULL UNIQUE,

  contrasena VARCHAR(40) NOT NULL,

  informacion_contacto VARCHAR(40) DEFAULT NULL,

  tipo_usuario INT NOT NULL DEFAULT 0,

  FOREIGN KEY (empresa_id) REFERENCES empresasclientes(id)

);


-- Volcado de datos para la tabla `usuarios`

INSERT INTO usuarios (id, empresa_id, nombre_usuario, contrasena, informacion_contacto, tipo_usuario) VALUES

(1, 1, 'usuario1', 'contrasena1', 'usuario1@correo.com', 0),

(2, 2, 'usuario2', 'contrasena2', 'usuario2@correo.com', 0),

(3, 3, 'usuario3', 'contrasena3', 'usuario3@correo.com', 0),

(4, 4, 'usuario4', 'contrasena4', 'usuario4@correo.com', 0),

(5, 5, 'usuario5', 'contrasena5', 'usuario5@correo.com', 0),

(6, 6, 'usuario6', 'contrasena6', 'usuario6@correo.com', 0),

(7, 7, 'usuario7', 'contrasena7', 'usuario7@correo.com', 0),

(8, 8, 'usuario8', 'contrasena8', 'usuario8@correo.com', 0),

(9, 9, 'usuario9', 'contrasena9', 'usuario9@correo.com', 0),

(10, 10, 'usuario10', 'contrasena10', 'usuario10@correo.com', 0);