package Examen.PracticaAjax.entidades;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="Oferta")
public class Oferta implements Serializable{
	
	private static final long serialVersionUID = -745381282917893720L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_Oferta")
	private int id_Oferta;
	
	@Column(name = "nombreOferta")
	private String nombreOferta;
	
	@Column(name = "fecha_pub")
	private String fecha_pub;
	
	@Column(name = "prioridad")
	private String prioridad;
	
	@Column(name = "enlace")
	private String enlace;
	
	@Column(name = "descripcion")
	private String descripcion;
	
	@Column(name = "precio")
	private float precio;
	
	public Oferta() {}
	
	public Oferta(int id_Oferta, String nombreOferta, String fecha_pub, String prioridad, String enlace, String descripcion, float precio) {
		this.id_Oferta = id_Oferta;
		this.nombreOferta = nombreOferta;
		this.fecha_pub = fecha_pub;
		this.prioridad = prioridad;
		this.enlace = enlace;
		this.descripcion = descripcion;
		this.precio = precio;
	}
	
	public int getId_Oferta() {
		return id_Oferta;
	}
	public void setId_Oferta(int id_Oferta) {
		this.id_Oferta = id_Oferta;
	}
	public String getNombreOferta() {
		return nombreOferta;
	}
	public void setNombreOferta(String nombreOferta) {
		this.nombreOferta = nombreOferta;
	}
	public String getFecha_pub() {
		return fecha_pub;
	}
	public void setFecha_pub(String fecha_pub) {
		this.fecha_pub = fecha_pub;
	}
	public String getPrioridad() {
		return prioridad;
	}
	public void setPrioridad(String prioridad) {
		this.prioridad = prioridad;
	}
	public String getEnlace() {
		return enlace;
	}
	public void setEnlace(String enlace) {
		this.enlace = enlace;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public float getPrecio() {
		return precio;
	}
	public void setPrecio(float precio) {
		this.precio = precio;
	}
}
