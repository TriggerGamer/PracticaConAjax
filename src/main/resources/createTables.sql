CREATE DATABASE Examen;
use Examen;

CREATE TABLE Oferta(
id_Oferta int(5) PRIMARY KEY AUTO_INCREMENT NOT NULL,
nombreOferta VARCHAR(100),
fecha_pub date,
prioridad VARCHAR(20),
enlace VARCHAR(500),
descripcion VARCHAR(500),
precio double(6,2)
);