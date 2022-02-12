package Examen.PracticaAjax.modelo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Examen.PracticaAjax.entidades.Oferta;

public interface OfertaRepository extends JpaRepository<Oferta, Integer>{
	List<Oferta> findByPrioridad(String prioridad);
	List<Oferta> findByName(String name);
}
