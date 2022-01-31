package Examen.PracticaAjax.controladores;

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

import Examen.PracticaAjax.entidades.Oferta;
import Examen.PracticaAjax.servicios.OfertaServicio;

@Controller
public class OfertaController {
	
	@Autowired
	private OfertaServicio ofertaservicio;
	
	@ResponseBody
	@PostMapping(value ="oferta")
	public ResponseEntity<Object> crearOferta(@RequestBody Map<String, String> json) {
		
		Oferta oferta = new Oferta();
		
		String precio = json.get("precio");
		
		if(precio == null || precio == "") {
			precio = "0";
		}
		
		
		float pr = Float.parseFloat(precio);
		oferta.setNombreOferta(json.get("nombre"));
		oferta.setPrioridad(json.get("prioridad"));
		oferta.setFecha_pub(LocalDateTime.now());
		oferta.setEnlace(json.get("enlace"));
		oferta.setDescripcion(json.get("descripcion"));
		oferta.setPrecio(pr);
		
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
	
	@ResponseBody
	@GetMapping("/perfil/{id_Oferta}")
	public Oferta ver_oferta(@PathVariable int id_Oferta) {
		
		return ofertaservicio.findOfertaById(id_Oferta);
	}
}
