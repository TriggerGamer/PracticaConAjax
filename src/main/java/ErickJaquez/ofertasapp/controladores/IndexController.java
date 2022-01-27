package ErickJaquez.ofertasapp.controladores;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ErickJaquez.ofertasapp.entidades.Oferta;
import ErickJaquez.ofertasapp.servicios.OfertaServicio;

@Controller
public class IndexController {
	
	@Autowired
	private OfertaServicio ofertaServicio;
	
	@GetMapping(value={"/index","/"})
	public String getIndex(Model modelo, HttpSession session) {
		
		//obtener el usuario de session
		String nombre1 = (String) session.getAttribute("user");
		String nombre2 = (String) session.getAttribute("user2");
		
		if(nombre1 == null) {
			nombre1 = " ";
		}
		
		modelo.addAttribute("nombre1", nombre1);
		modelo.addAttribute("nombre2", nombre2);
		
		return "index";
	}
	
	@ResponseBody
	@GetMapping("/todos")
	public List<Oferta> obtenerOfertas() {
		return ofertaServicio.obtenerOfertas();
	}
	
}
