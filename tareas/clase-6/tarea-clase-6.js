/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

const $confirmarMiembros = document.querySelector("#button_family_members");
const $seccionIntegrantes = document.querySelector("#edad_integrantes");
const $botonCalcular = document.querySelector("#calcular_resultados");
const $botonResetear = document.querySelector("#resetear");
const $detalleResultados = document.querySelector("#detalle_calculos");
const $seccionIngresos = document.querySelector("#ingresos_miembros");
const $agregarMiembro = document.querySelector("#agregar_miembro");
const $eliminarMiembro = document.querySelector("#eliminar_miembro");
let indiceMiembro = 1;


$confirmarMiembros.onclick = function () {

    const miembrosFamilia = Number(document.querySelector(".family_members").value);
    resetearValores();
    crearListaIntegrantes(miembrosFamilia);
}

$botonCalcular.onclick = function () {
    const edadesParaCalcular = obtenerNumeros();
    const edadMasAlta = calcularMayorEdad(edadesParaCalcular);
    const edadMasBaja = calcularMenorEdad(edadesParaCalcular)
    const promedidoEdades = calcularPromedioEdades(edadesParaCalcular);
    console.log(mostrarEdad(`mayor`, edadMasAlta));
    mostrarEdad(`menor`, edadMasBaja);
    mostrarEdad(`promedio`, promedidoEdades);
}

$botonResetear.onclick = function () {
    resetearValores();
}


function obtenerNumeros() {
    const $totalEdades = document.querySelectorAll(".edades_ingresadas");
    let arrayEdades = [];
    for (i = 0; i < $totalEdades.length; i++) {
        let unaEdad = Number($totalEdades[i].value)
        arrayEdades.push(unaEdad);

    }
    return arrayEdades;
}

function crearListaIntegrantes(miembrosFamilia) {

    if (miembrosFamilia <= 0) {

        resetearValores();
    } else {

        for (i = 1; i <= miembrosFamilia; i++) {

            crearIntegrante(i);
        }

        $botonCalcular.className = "visible";
        $botonResetear.className = "visible";
        $seccionIngresos.className = "visible";
    }
}

function crearIntegrante(indice) {
    const $divMiembro = document.createElement("div");
    $divMiembro.className = "detalle_integrante";
    const $etiquetaMiembro = document.createElement("label");
    $etiquetaMiembro.textContent = `Edad del integrante # ${indice}`;
    const $edadMiembro = document.createElement("input");
    $edadMiembro.type = "number";
    $edadMiembro.className = "edades_ingresadas"
    $divMiembro.appendChild($etiquetaMiembro);
    $divMiembro.appendChild($edadMiembro)
    $seccionIntegrantes.appendChild($divMiembro);
}

function calcularMayorEdad(edadesParaCalcular) {
    let mayorEdad = 0;

    for (i = 0; i < edadesParaCalcular.length; i++) {
        if (edadesParaCalcular[i] > mayorEdad) {
            mayorEdad = edadesParaCalcular[i];
        }
    }
    return mayorEdad;
}

function calcularMenorEdad(edadesParaCalcular) {
    let menorEdad = edadesParaCalcular[0];
    for (i = 0; i < edadesParaCalcular.length; i++) {
        if (edadesParaCalcular[i] < menorEdad) {
            menorEdad = edadesParaCalcular[i];
        }
    }
    return menorEdad;
}

function calcularPromedioEdades(edadesParaCalcular) {
    let sumaEdades = 0;
    let divisorEdades = 0;
    let promedidoEdades;
    for (i = 0; i < edadesParaCalcular.length; i++) {
        sumaEdades = sumaEdades + edadesParaCalcular[i];
        divisorEdades++;
    }
    promedidoEdades = sumaEdades / divisorEdades

    return promedidoEdades;
}

function mostrarEdad(tipo, valor) {
    const $contenedorResultado = document.createElement("p");
    let resultadoPromedio;

    if (tipo === "promedio") {
        resultadoPromedio = document.createTextNode(`El ${tipo} de todas las edades es ${valor}`);

    } else {
        resultadoPromedio = document.createTextNode(`La ${tipo} de las edades es ${valor}`);
    }

    $contenedorResultado.appendChild(resultadoPromedio);
    $detalleResultados.appendChild($contenedorResultado);

}

function resetearValores() {
    $detalleResultados.textContent = "";
    $seccionIntegrantes.textContent = "";
    $botonCalcular.className = "oculto";
    $botonResetear.className = "oculto";
    $seccionIngresos.className = "oculto";
}

function agregarMiembro(indice) {
    const $divIngreso = document.createElement("div");
    $divIngreso.className = "detalle_integrante";
    $divIngreso.setAttribute(`id`, `integrante${indice}`);
    const $etiquetaIngreso = document.createElement("label");
    $etiquetaIngreso.textContent = `Ingreso anual del integrante # ${indice}`;
    const $ingresoMiembro = document.createElement("input");
    $ingresoMiembro.type = "number";
    $divIngreso.appendChild($etiquetaIngreso);
    $divIngreso.appendChild($ingresoMiembro)
    $seccionIngresos.appendChild($divIngreso)
}


$agregarMiembro.onclick = function () {

    if (indiceMiembro <= Number(document.querySelector(".family_members").value)) {
        agregarMiembro(indiceMiembro);
        return indiceMiembro++
    } else {
        return
    }
}

function eliminarMiembro(indice) {
    let idARemover = indice - 1;
    elementoARemover = document.querySelector(`#integrante${idARemover}`);
    $seccionIngresos.removeChild(elementoARemover);
}

$eliminarMiembro.onclick = function () {
    eliminarMiembro(indiceMiembro);
    return indiceMiembro--;
}





/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/
