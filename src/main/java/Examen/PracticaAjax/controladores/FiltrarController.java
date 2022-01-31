package Examen.PracticaAjax.controladores;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import Examen.PracticaAjax.entidades.Oferta;
import Examen.PracticaAjax.servicios.OfertaServicio;

@Controller
public class FiltrarController {
	@Autowired
	private OfertaServicio ofertaservicio;
	
	@ResponseBody
	@PostMapping(value="filtrar")
	public  List<Oferta> filtrarPorPrioridad(@RequestBody Map<String, String> json) {
		
		String prioridad = json.get("prioridad");
		
		return ofertaservicio.filtrarPorPrioridad(prioridad);
	}
	
	@ResponseBody
	@PostMapping(value="buscar")
	public List<Oferta> buscarPorNombre(@RequestBody Map<String, String> json) {
		
		String nombre = json.get("nombre");

		return ofertaservicio.buscarPorNombre(nombre);
	}

}
