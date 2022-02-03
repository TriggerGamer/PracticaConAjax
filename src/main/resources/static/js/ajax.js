//fichero Ajax.js
function obtenerOfertas() {
	fetch('/todos', { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json())
		.then(response => {
			informacionTabla(response);
		})
}

function buscarOfertas(event) {
	event.preventDefault();

	fetch('/buscar', {
		headers: { "Content-Type": "application/json; charset=utf-8" }, method: 'POST',
		body: JSON.stringify({ nombre: $('#Buscarnombre').val() })
	})
		.then(res => res.json())
		.then(response => {
			informacionTabla(response);
		})
}

function filtrarOfertas(event) {
	event.preventDefault();

	let baja = document.getElementById("PrioridadBaja");
	let media = document.getElementById("PrioridadMedia");
	let alta = document.getElementById("PrioridadAlta");

	let Prioridad = "";
	if (baja.checked) {
		Prioridad = baja;
	}
	else if (media.checked) {
		Prioridad = media;
	}
	else if (alta.checked) {
		Prioridad = alta;
	}

	fetch('/filtrar', {
		headers: { "Content-Type": "application/json; charset=utf-8" }, method: 'POST',
		body: JSON.stringify({ prioridad: Prioridad.value })
	})
		.then(res => res.json())
		.then(response => {
			informacionTabla(response);
		})
}

function informacionTabla(response){
	let resultados = document.getElementById("tablita");
	resultados.replaceChildren();

	for (let oferta of response) {
		let tr = document.createElement('tr');

		if (oferta.prioridad == "Baja") {
			oferta.prioridad = "table-active"
		}
		else if (oferta.prioridad == "Media") {
			oferta.prioridad = "table-warning"
		}
		else if (oferta.prioridad == "Alta") {
			oferta.prioridad = "table-danger"
		}

		tr.classList.add(oferta.prioridad);
		let th = document.createElement('th');
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		let td4 = document.createElement('td');
		let button1 = document.createElement('button');
		var linkText1 = document.createTextNode("Perfil");
		button1.setAttribute("type", "button");
		button1.classList.add("btn", "btn-outline-info");
		button1.setAttribute("name", "perfil");
		button1.appendChild(linkText1);
		let button2 = document.createElement('button');
		var linkText2 = document.createTextNode("Borrar");
		button2.setAttribute("type", "button");
		button2.classList.add("btn", "btn-outline-danger");
		button2.setAttribute("name", "borrar");
		button2.appendChild(linkText2);
		th.textContent = oferta.id_Oferta;
		td1.textContent = oferta.nombreOferta;
		td2.textContent = oferta.precio + "€";

		resultados.appendChild(tr);
		tr.appendChild(th);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		td3.appendChild(button1);
		tr.appendChild(td4);
		td4.appendChild(button2);
	}

	var borrar = document.getElementsByName("borrar");
	var id;
	for (let elementos of borrar) {
		elementos.addEventListener("click", function() {
			var tr = elementos.closest("tr");
			id = tr.childNodes[0].innerText;
			borrarOfertas(id);
		});
	}

	var perfil = document.getElementsByName("perfil");
	let tabla = document.getElementById("tablita-modal");
	var id_perfil;
	for (let elementos of perfil) {
		elementos.addEventListener("click", function() {
			var tr = elementos.closest("tr");
			id_perfil = tr.childNodes[0].innerText;
			tabla.replaceChildren();
			perfilOfertas(id_perfil);
		});
	}
}

function anadirOfertas(event) {
	event.preventDefault();

	fetch('/oferta', {
		headers: { "Content-Type": "application/json; charset=utf-8" }, method: 'POST',
		body: JSON.stringify({ nombre: $('#inputNombre').val(), prioridad: $('#selectPrioridad').val(), enlace: $('#inputEnlace').val(), descripcion: $('#inputDescripcion').val(), precio: $('#inputPrecio').val() })
	})
		.then(function(response) {
			if (response.ok) {
				return response.json();
			}
		})
		.then(response => {
			obtenerOfertas();
		})
}

function borrarOfertas(id) {
	let tablita = document.getElementById("tablita");
	for (let item of tablita.childNodes) {
		let cosa_borrar = item.childNodes;
		let id_borrar = cosa_borrar[0].innerText;

		if (id_borrar === id) {
			var tr_borrar = item;
		}
	}

	fetch('/borrar/' + id, { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json())
		.then(response => {
			if (response) {
				tablita.removeChild(tr_borrar);
			}
		})
}

function perfilOfertas(id) {
	
	var mymodal = document.getElementById("modal");
	
	$(mymodal).modal();

	let tabla = document.getElementById("tablita-modal");
	let bodymodal = document.getElementById("modal_body");
	
	var cerrarmodal = document.getElementById("cerrar-modal");
	cerrarmodal.addEventListener("click", function() {
		
		let boton = document.getElementById("actualizarOferta");
		if (boton != null){
			bodymodal.removeChild(boton);
		}
		
		tabla.replaceChildren();
		
		$(mymodal).modal('hide');
	})

	let boton = document.getElementById("actualizarOferta");
	if (boton != null){
		bodymodal.removeChild(boton);
	}

	fetch('/perfil/' + id, { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json())
		.then(response => {

			tabla.replaceChildren();
			
			let tr = document.createElement('tr');

			let th = document.createElement('th');
			let td1 = document.createElement('td');
			let td2 = document.createElement('td');
			let td3 = document.createElement('td');
			let td4 = document.createElement('td');
			let td5 = document.createElement('td');
			let td6 = document.createElement('td');
			th.setAttribute("scope", "row");
			th.textContent = response.id_Oferta;
			td1.textContent = response.nombreOferta;
			td2.textContent = response.fecha_pub;
			td3.textContent = response.prioridad;
			td4.textContent =  response.enlace;
			td5.textContent = response.descripcion;
			td6.textContent = response.precio + "€";

			tabla.appendChild(tr);
			tr.appendChild(th);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			tr.appendChild(td6);
		})
}

function editarOfertas() {
	
	let tabla = document.getElementById("tablita-modal");
	let bodymodal = document.getElementById("modal_body");
	let boton = document.getElementById("actualizarOferta");
	let tr = tabla.firstElementChild;
	
	if(boton != null){
		bodymodal.removeChild(boton);
	}
	
	var id;
	id = tr.childNodes[0].innerText;

	fetch('/perfil/' + id, { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json())
		.then(response => {
			
			// Borrar todod lo que haya en la tabla por si acaso
			tabla.replaceChildren();
			
			// Añadir a la tabla todos los inputs para volverla un form y poder editar la oferta
			let tr = document.createElement('tr');
			let th = document.createElement('th');
			let td1 = document.createElement('td');
			td1.setAttribute("class", "form-group");
			let td2 = document.createElement('td');
			td2.setAttribute("class", "form-group");
			let td3 = document.createElement('td');
			td3.setAttribute("class", "form-group");
			let td4 = document.createElement('td');
			td4.setAttribute("class", "form-group");
			let td5 = document.createElement('td');
			td5.setAttribute("class", "form-group");
			let td6 = document.createElement('td');
			td6.setAttribute("class", "form-group");
			
			th.setAttribute("id", "id_oferta");
			th.setAttribute("scope", "row");
			th.textContent = response.id_Oferta;
			
			let input1 = document.createElement('input');
			input1.setAttribute("type", "text");
			input1.setAttribute("id", "nombre");
			input1.setAttribute("class", "form-control col-xs-1");
			input1.setAttribute("value", response.nombreOferta);

			let input2 = document.createElement('input');
			input2.setAttribute("type", "text");
			input2.setAttribute("id", "fecha_pub");
			input2.setAttribute("class", "form-control col-xs-1");
			input2.setAttribute("value", response.fecha_pub);

			let input3 = document.createElement('select');
			input3.setAttribute("size", "3");
			input3.setAttribute("id", "prioridad");
			input3.setAttribute("class", "form-control col-xs-2");

			let option1 = document.createElement('option');
			option1.textContent = "Baja";
			let option2 = document.createElement('option');
			option2.textContent = "Media";
			let option3 = document.createElement('option');
			option3.textContent = "Alta";

			let input4 = document.createElement('input');
			input4.setAttribute("type", "text");
			input4.setAttribute("id", "enlace");
			input4.setAttribute("class", "form-control col-xs-1");
			input4.setAttribute("value", response.enlace);

			let input5 = document.createElement('textarea');
			input5.setAttribute("rows", "5");
			input5.setAttribute("id", "descripcion");
			input5.setAttribute("class", "form-control col-xs-1");
			input5.textContent = response.descripcion;

			let input6 = document.createElement('input');
			input6.setAttribute("type", "number");
			input6.setAttribute("id", "precio");
			input6.setAttribute("class", "form-control col-xs-1");
			input6.setAttribute("step", "any");
			input6.setAttribute("value", response.precio);
			
			tabla.appendChild(tr);
			tr.appendChild(th);
			tr.appendChild(td1);
			td1.appendChild(input1);
			tr.appendChild(td2);
			td2.appendChild(input2);
			tr.appendChild(td3);
			td3.appendChild(input3);
			input3.appendChild(option1);
			input3.appendChild(option2);
			input3.appendChild(option3);
			tr.appendChild(td4);
			td4.appendChild(input4);
			tr.appendChild(td5);
			td5.appendChild(input5);
			tr.appendChild(td6);
			td6.appendChild(input6);
		
			// Añadir boton actualiazar ofertas al modal
			let boton = document.createElement('button');
			boton.setAttribute("id", "actualizarOferta");
			boton.textContent = "Actualizar Oferta";
			boton.setAttribute("class", "btn btn-outline-info btn-lg")

			bodymodal.appendChild(boton);
			
			// Añadir evento al boton actualizar ofertas
			var botonActualizar = document.getElementById("actualizarOferta")
			botonActualizar.addEventListener("click", function(){
				actualizarOferta();
			});	
		})

}

function actualizarOferta(){
	var id_oferta = document.getElementById("id_oferta");

	fetch('/actualizarOferta', {
		headers: { "Content-Type": "application/json; charset=utf-8" }, method: 'POST',
		body: JSON.stringify({id_Oferta: id_oferta.textContent, nombre: $('#nombre').val(), prioridad: $('#prioridad').val(), enlace: $('#enlace').val(), descripcion: $('#descripcion').val(), precio: $('#precio').val(), fecha_pub: $('#fecha_pub').val() })
	})
		.then(function(response) {
			if (response.ok) {
				return response.json();
			}
		})
		.then(response => {
			perfilOfertas(id_oferta.textContent);

			obtenerOfertas();
		})
}

document.addEventListener("DOMContentLoaded", function() {
	obtenerOfertas();
	$("#anadir").click(anadirOfertas);
	$("#buscar").click(buscarOfertas);
	$("#filtrar").click(filtrarOfertas);
	$("#editarOferta").click(editarOfertas);
});