CREATE DATABASE Examen;
use Examen;

CREATE TABLE Oferta(
id_Oferta int(5) PRIMARY KEY AUTO_INCREMENT NOT NULL,
nombreOferta VARCHAR(30),
fecha_pub date,
prioridad VARCHAR(20),
enlace VARCHAR(50),
descripcion VARCHAR(100),
precio int(6)
);