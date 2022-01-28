package ErickJaquez.ofertasapp.servicios;

import java.util.List;

import ErickJaquez.ofertasapp.entidades.Oferta;

public interface OfertaServicio {
	
	public Oferta guardarOferta(Oferta oferta);
	
	public boolean borrarOfertaById(int id);
	
	public List<Oferta> obtenerOfertas();
	
	public List<Oferta> filtrarPorPrioridad(String prioridad);
	
	public List<Oferta> buscarPorNombre(String nombre);
	
	public Oferta findOfertaById(int id);

}
