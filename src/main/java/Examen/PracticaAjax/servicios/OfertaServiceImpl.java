package Examen.PracticaAjax.servicios;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import Examen.PracticaAjax.entidades.Oferta;
import Examen.PracticaAjax.modelo.OfertaRepository;

@Service
@Transactional
public class OfertaServiceImpl implements OfertaServicio {
	
	@Autowired
	private OfertaRepository ofertadRepository;

	@Override
	public Oferta guardarOferta(Oferta oferta) {
		
		return ofertadRepository.save(oferta);
	}

	@Override
	public List<Oferta> obtenerOfertas() {
		return ofertadRepository.findAll();
	}

	@Override
	public boolean borrarOfertaById(int id) {
		
		try {
			ofertadRepository.deleteById(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public List<Oferta> filtrarPorPrioridad(String prioridad) {
		return ofertadRepository.findByPrioridad(prioridad);
	}

	@Override
	public List<Oferta> buscarPorNombre(String nombre) {
		return ofertadRepository.findByName(nombre);
	}

	@Override
	public Oferta findOfertaById(int id) {
		
		Oferta oferta = ofertadRepository.getById(id);
		
		return oferta;
	}

	@Override
	public Oferta actualizarOferta(Oferta oferta) {
		Oferta ofertaActualizada = ofertadRepository.getById(oferta.getId_Oferta());
		
		ofertaActualizada.setNombreOferta(oferta.getNombreOferta());
		
		if(oferta.getFecha_pub() == null || oferta.getFecha_pub() == "") {
			String f = LocalDateTime.now().toString();
			String nuevo[] = f.split("T");
			oferta.setFecha_pub(nuevo[0]);
		}
		ofertaActualizada.setFecha_pub(oferta.getFecha_pub());
		
		if(oferta.getPrioridad() == null || oferta.getPrioridad() == "") {
			String p = "Baja";
			oferta.setPrioridad(p);
		}
		ofertaActualizada.setPrioridad(oferta.getPrioridad());
		ofertaActualizada.setEnlace(oferta.getEnlace());
		ofertaActualizada.setDescripcion(oferta.getDescripcion());
		ofertaActualizada.setPrecio(oferta.getPrecio());
		
		return ofertaActualizada;
	}

}
