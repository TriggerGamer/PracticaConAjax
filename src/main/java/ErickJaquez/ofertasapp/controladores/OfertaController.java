package ErickJaquez.ofertasapp.controladores;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import ErickJaquez.ofertasapp.entidades.Oferta;
import ErickJaquez.ofertasapp.servicios.OfertaServicio;

@Controller
public class OfertaController {
	
	@Autowired
	private OfertaServicio ofertaservicio;
	
	@ResponseBody
	@PostMapping(value ="oferta")
	public ResponseEntity<Object> crearOferta(@RequestBody Map<String, String> json) {
		
		Oferta oferta = new Oferta();	
		
		float precio = Float.parseFloat(json.get("precio"));
		oferta.setNombreOferta(json.get("nombre"));
		oferta.setPrioridad(json.get("prioridad"));
		oferta.setFecha_pub(LocalDateTime.now());
		oferta.setEnlace(json.get("enlace"));
		oferta.setDescripcion(json.get("descripcion"));
		oferta.setPrecio(precio);
		
		ofertaservicio.guardarOferta(oferta);
        
		return new ResponseEntity<Object>(oferta, HttpStatus.OK);
		
	}
	
	@ResponseBody
	@GetMapping("/borrar/{id_Oferta}")
	public String borrar_oferta(@PathVariable int id_Oferta) {
		
		if(ofertaservicio.borrarOfertaById(id_Oferta)) {
			return "true";
		}
		else {
			return "false";
		}
	}
	
	@GetMapping("/perfil/{id_Oferta}")
	public String ver_oferta(@PathVariable int id_Oferta, Model modelo) {
		
		//Obtener la oferta concreta de la base de datos y añadirla con el modelo
		Oferta oferta = ofertaservicio.findOfertaById(id_Oferta);
		
		modelo.addAttribute("oferta", oferta);
		
		return "perfil";
	}
}
