//fichero Ajax.js
function obtenerOfertas() {
	let resultados = document.getElementById("tablita");
	resultados.replaceChildren();
	fetch('/todos', { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json())
		.then(response => {
			for (let oferta of response) {
				let tr = document.createElement('tr');
				tr.classList.add(oferta.prioridad);
				let th = document.createElement('th');
				let td1 = document.createElement('td');
				let td2 = document.createElement('td');
				let td3 = document.createElement('td');
				let td4 = document.createElement('td');
				let button1 = document.createElement('a');
				var linkText1 = document.createTextNode("Perfil");
				button1.setAttribute("type", "button");
				button1.classList.add("btn", "btn-info");
				button1.setAttribute("href", "/perfil/" + oferta.id_Oferta);
				button1.appendChild(linkText1);
				let button2 = document.createElement('a');
				var linkText2 = document.createTextNode("Borrar");
				button2.setAttribute("type", "button");
				button2.classList.add("btn", "btn-danger");
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

function anadirOfertas(event) {
	event.preventDefault();

	fetch('/oferta', {
		headers: { "Content-Type": "application/json; charset=utf-8" }, method: 'POST',
		body: JSON.stringify({ nombre: $('#inputNombre').val(), prioridad: $('#selectPrioridad').val(), enlace: $('#inputEnlace').val(), descripcion: $('#inputDescripcion').val(), precio: $('#inputPrecio').val() })
	})
		.then(function(response) {
			if (response.ok) {
				return response.json()
			} else {
				throw "El email ya existe";
			}
		})
		.then(response => {
			obtenerOfertas();
		})

}

document.addEventListener("DOMContentLoaded", function() {
	obtenerOfertas();
	$("#anadir").click(anadirOfertas);
});