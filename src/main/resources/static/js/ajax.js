//fichero Ajax.js
function obtenerOfertas() {
	let resultados = document.getElementById("tablita");
	resultados.replaceChildren();
	fetch('/todos', { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json())
		.then(response => {
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
				let button1 = document.createElement('a');
				var linkText1 = document.createTextNode("Perfil");
				button1.setAttribute("type", "button");
				button1.classList.add("btn", "btn-outline-info");
				button1.setAttribute("name", "perfil");
				button1.appendChild(linkText1);
				let button2 = document.createElement('a');
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
			var id_perfil;
			for (let elementos of perfil) {
				elementos.addEventListener("click", function() {
					var tr = elementos.closest("tr");
					id_perfil = tr.childNodes[0].innerText;

					perfilOfertas(id_perfil);
				});
			}
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

	var cerrarmodal = document.getElementById("cerrar-modal");
	cerrarmodal.addEventListener("click", function() {
		tabla.replaceChildren();
		$(mymodal).modal('hide');
	})

	fetch('/perfil/' + id, { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json())
		.then(response => {
			
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
			let text = response.fecha_pub;
			const myArray = text.split("T");
			td2.textContent = myArray[0];
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

function anadirOfertas(event) {
	event.preventDefault();

	fetch('/oferta', {
		headers: { "Content-Type": "application/json; charset=utf-8" }, method: 'POST',
		body: JSON.stringify({ nombre: $('#inputNombre').val(), prioridad: $('#selectPrioridad').val(), enlace: $('#inputEnlace').val(), descripcion: $('#inputDescripcion').val(), precio: $('#inputPrecio').val() })
	})
		.then(function(response) {
			if (response.ok) {
				return response.json()
			}
		})
		.then(response => {
			obtenerOfertas();
		})

}

function buscarOfertas(event) {
	event.preventDefault();

	let resultados = document.getElementById("tablita");
	resultados.replaceChildren();
	fetch('/buscar', {
		headers: { "Content-Type": "application/json; charset=utf-8" }, method: 'POST',
		body: JSON.stringify({ nombre: $('#Buscarnombre').val() })
	})
		.then(function(response) {
			if (response.ok) {
				return response.json()
			} else {
				throw "Error";
			}
		})
		.then(response => {
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
				let button1 = document.createElement('a');
				var linkText1 = document.createTextNode("Perfil");
				button1.setAttribute("type", "button");
				button1.classList.add("btn", "btn-outline-info");
				button1.setAttribute("name", "perfil");
				button1.appendChild(linkText1);
				let button2 = document.createElement('a');
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

					borrarOfertas(id_perfil);
				});
			}

			var perfil = document.getElementsByName("perfil");
			var id_perfil;
			for (let elementos of perfil) {
				elementos.addEventListener("click", function() {
					var tr = elementos.closest("tr");
					id_perfil = tr.childNodes[0].innerText;

					perfilOfertas(id);
				});
			}
		})
}

function filtrarOfertas(event) {
	event.preventDefault();

	let resultados = document.getElementById("tablita");
	resultados.replaceChildren();

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
		.then(function(response) {
			if (response.ok) {
				return response.json()
			} else {
				throw "Error";
			}
		})
		.then(response => {
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
				let button1 = document.createElement('a');
				var linkText1 = document.createTextNode("Perfil");
				button1.setAttribute("type", "button");
				button1.classList.add("btn", "btn-outline-info");
				button1.setAttribute("name", "perfil");
				button1.appendChild(linkText1);
				let button2 = document.createElement('a');
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
			var id_perfil;
			for (let elementos of perfil) {
				elementos.addEventListener("click", function() {
					var tr = elementos.closest("tr");
					id_perfil = tr.childNodes[0].innerText;

					perfilOfertas(id_perfil);
				});
			}
		})
}


document.addEventListener("DOMContentLoaded", function() {
	obtenerOfertas();
	$("#anadir").click(anadirOfertas);
	$("#buscar").click(buscarOfertas);
	$("#filtrar").click(filtrarOfertas);
});