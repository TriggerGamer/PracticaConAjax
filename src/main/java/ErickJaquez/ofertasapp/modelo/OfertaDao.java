package ErickJaquez.ofertasapp.modelo;

import java.util.List;

import ErickJaquez.ofertasapp.entidades.Oferta;

public interface OfertaDao extends DaoGenerico<Oferta>{
	
	public boolean deleteById(int id);

	public List<Oferta> findAll();
	
	public List<Oferta> filtrarPorPrioridad(String prioridad);

	public List<Oferta> buscarPorNombre(String nombre);
	
	public Oferta findOfertaById(int id);

}