package Examen.PracticaAjax.servicios;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import Examen.PracticaAjax.entidades.Oferta;
import Examen.PracticaAjax.modelo.OfertaDao;

@Service
@Transactional
public class OfertaServiceImpl implements OfertaServicio {
	
	@Autowired
	private OfertaDao ofertadao;

	@Override
	public Oferta guardarOferta(Oferta oferta) {
		
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
		
		return ofertadao.filtrarPorPrioridad(prioridad);
	}

	@Override
	public List<Oferta> buscarPorNombre(String nombre) {
		return ofertadao.buscarPorNombre(nombre);
	}

	@Override
	public Oferta findOfertaById(int id) {
		
		Oferta oferta = ofertadao.findOfertaById(id);
		
		return oferta;
	}

	@Override
	public Oferta actualizarOferta(Oferta oferta) {
		Oferta ofertaActualizada = ofertadao.findOfertaById(oferta.getId_Oferta());
		
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
