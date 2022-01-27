package ErickJaquez.ofertasapp.modelo;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import ErickJaquez.ofertasapp.entidades.Oferta;

@Repository
@Component("OfertaDao")
public class OfertaDaoImpl extends DaoGenericoImpl<Oferta> implements OfertaDao {

	@Override
	public boolean deleteById(int id) {
		if(id == id) {
			borrar(id);
			return true;
		}
		return false;
	}

	@Override
	public List<Oferta> findAll() {
		Query query = this.em.createQuery("FROM Oferta");
		
		List<Oferta> oferta = query.getResultList();

		if (oferta != null) {
			return oferta;
		}
		return null;
	}

	@Override
	public List<Oferta> filtrarPorPrioridad(String prioridad) {
		
		Query query = this.em.createQuery("FROM Oferta where prioridad LIKE :prd");
		query.setParameter("prd", "%"+ prioridad + "%");
		List<Oferta> oferta = query.getResultList();

		if (oferta != null) {
			return oferta;
		}
		return null;
	}

	@Override
	public List<Oferta> buscarPorNombre(String nombre) {
		Query query = this.em.createQuery("FROM Oferta where nombreOferta LIKE :nombre");
		query.setParameter("nombre", "%"+ nombre + "%");
		List<Oferta> oferta = query.getResultList();

		if (oferta != null) {
			return oferta;
		}
		return null;
	}

	@Override
	public Oferta findOfertaById(int id) {
		Query query = this.em.createQuery("FROM Oferta where id_Oferta = :id");
		query.setParameter("id", id);
		Oferta oferta = (Oferta) query.getSingleResult();
		if (oferta != null) {
			return oferta;
		}
		return null;
	}
}
