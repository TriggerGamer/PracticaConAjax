package ErickJaquez.ofertasapp.controladores;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SessionUsuarioController {

	@PostMapping("/usuario")
	public String session_Usurio(@RequestParam String inputUsuario, HttpSession session) {
		
		// Poner el nombre del usuario en session
		session.setAttribute("user", inputUsuario);
		// configuracion por que no me va de otra manera
		session.setAttribute("user2", inputUsuario);	
		
		return "redirect:/";
	}
	
	@GetMapping("/cerrarSesion")
	public String cerrar_session(HttpSession session) {
		
		// Borrar la session
		session.setAttribute("user", null);	
		
		
		return "redirect:/";
	}
}
