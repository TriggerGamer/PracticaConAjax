package ErickJaquez.ofertasapp.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ErickJaquez.ofertasapp.entidades.Oferta;
import ErickJaquez.ofertasapp.servicios.OfertaServicio;

@Controller
public class FiltrarController {
	@Autowired
	private OfertaServicio ofertaservicio;
	
	@PostMapping("/filtrar")
	public String filtrar_PorPrioridad(@RequestParam String optionsRadios, Model modelo) {
		
		List<Oferta> ofertas = ofertaservicio.filtrarPorPrioridad(optionsRadios);
		
		modelo.addAttribute("ofertas", ofertas);
		
		return "index";
	}
	
	@ResponseBody
	@PostMapping("/buscar")
	public List<Oferta> obtenerOfertasPorNombre(@RequestParam String nombre) {
		
		return ofertaservicio.buscarPorNombre(nombre);
	}

}
