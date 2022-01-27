package ErickJaquez.ofertasapp.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ErickJaquez.ofertasapp.entidades.Oferta;
import ErickJaquez.ofertasapp.modelo.OfertaDao;

@Service
@Transactional
public class OfertaServiceImpl implements OfertaServicio {
	
	@Autowired
	private OfertaDao ofertadao;

	@Override
	public Oferta guardar_oferta(Oferta oferta) {
		
		if(oferta.getPrioridad().equals("Baja")){
			oferta.setPrioridad("table-active");
		}
		else if(oferta.getPrioridad().equals("Media")){
			oferta.setPrioridad("table-warning");
		}
		else if(oferta.getPrioridad().equals("Alta")){
			oferta.setPrioridad("table-danger");
		}
		
		return ofertadao.crear(oferta);
	}

	@Override
	public List<Oferta> obtenerOfertas() {
		return ofertadao.findAll();
	}

	@Override
	public boolean borrarOfertaById(int id) {
		return ofertadao.deleteById(id);
	}

	@Override
	public List<Oferta> filtrarPorPrioridad(String prioridad) {
		
		if(prioridad.equals("Baja")){
			prioridad = "table-active";
		}
		else if(prioridad.equals("Media")){
			prioridad = "table-warning";
		}
		else if(prioridad.equals("Alta")){
			prioridad = "table-danger";
		}
		
		return ofertadao.filtrarPorPrioridad(prioridad);
	}

	@Override
	public List<Oferta> buscarPorNombre(String nombre) {
		return ofertadao.buscarPorNombre(nombre);
	}

	@Override
	public Oferta findOfertaById(int id) {
		
		Oferta oferta = ofertadao.findOfertaById(id);
		
		if(oferta.getPrioridad().equals("table-active")){
			oferta.setPrioridad("Baja");
		}
		else if(oferta.getPrioridad().equals("table-warning")){
			oferta.setPrioridad("Media");
		}
		else if(oferta.getPrioridad().equals("table-danger")){
			oferta.setPrioridad("Alta");
		}
		
		return oferta;
	}

}
