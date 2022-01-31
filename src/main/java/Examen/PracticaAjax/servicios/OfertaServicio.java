package Examen.PracticaAjax.servicios;

import java.util.List;

import Examen.PracticaAjax.entidades.Oferta;

public interface OfertaServicio {
	
	public Oferta guardarOferta(Oferta oferta);
	
	public boolean borrarOfertaById(int id);
	
	public List<Oferta> obtenerOfertas();
	
	public List<Oferta> filtrarPorPrioridad(String prioridad);
	
	public List<Oferta> buscarPorNombre(String nombre);
	
	public Oferta findOfertaById(int id);

}
