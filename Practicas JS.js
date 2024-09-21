// Sección 1: Cálculo de Interés Mensual
function calcularInteres() {
    const capital = parseFloat(document.getElementById('capital').value);
    const interesMensual = 0.02;

    // Validar que el capital sea un número válido
    if (isNaN(capital) || capital < 0) {
        alert('Por favor, ingrese un capital válido.');
        return;
    }

    const total = capital * (1 + interesMensual);
    document.getElementById('resultadoInteres').innerText = `Total después de un mes: $${total.toFixed(2)}`;
}

// Sección 2: Cálculo de Comisiones
function calcularComisiones() {
    const sueldoBase = parseFloat(document.getElementById('sueldoBase').value);
    const ventasInput = document.getElementById('ventas').value.trim();

    // Validación de sueldo base
    if (isNaN(sueldoBase) || sueldoBase < 0) {
        alert('Por favor, ingrese un sueldo base válido.');
        return;
    }

    // Validación y procesamiento de ventas
    const ventas = ventasInput.split(',').map(v => v.trim()).filter(v => v !== '');

    // Verificar que haya exactamente tres ventas
    if (ventas.length !== 3) {
        alert('Por favor, ingrese exactamente tres ventas separadas por comas.');
        return;
    }
    
    // Verificar que todas las ventas sean números válidos
    const soloNumeros = ventas.every(v => /^\d+(\.\d+)?$/.test(v)); // Comprobación de solo números

    if (!soloNumeros) {
        alert('Por favor, ingrese valores válidos para las ventas (solo números positivos sin operadores).');
        return;
    }

    const ventasNumeros = ventas.map(v => parseFloat(v));
    const comisionPorVenta = 0.10; // 10% de comisión
    const comisiones = ventasNumeros.reduce((acc, venta) => acc + (venta * comisionPorVenta), 0);
    const totalMensual = sueldoBase + comisiones;

    document.getElementById('resultadoComisiones').innerText = `Comisiones: $${comisiones.toFixed(2)}, Total mensual: $${totalMensual.toFixed(2)}`;
}

// Sección 3: Descuento en Compra
function calcularDescuento() {
    const precio = parseFloat(document.getElementById('precio').value);
    const descuento = 15; // Descuento predeterminado del 15%

    if (isNaN(precio) || precio < 0) {
        alert('Por favor, ingrese un valor válido para el precio.');
        return;
    }

    const precioFinal = precio - (precio * (descuento / 100));
    document.getElementById('resultadoDescuento').innerText = `Precio final después del descuento: $${precioFinal.toFixed(2)}`;
}

// Sección 4: Calificación Final
function calcularCalificacionFinal() {
    const promedioParciales = parseFloat(document.getElementById('parciales').value);
    const examenFinal = parseFloat(document.getElementById('examenFinal').value);
    const trabajoFinal = parseFloat(document.getElementById('trabajoFinal').value);

    // Validaciones
    if (isNaN(promedioParciales) || promedioParciales < 0 || promedioParciales > 10) {
        alert('Por favor, ingrese un promedio válido para las calificaciones parciales (0-10).');
        return;
    }

    if (isNaN(examenFinal) || examenFinal < 0 || examenFinal > 10) {
        alert('Por favor, ingrese una calificación válida para el examen final (0-10).');
        return;
    }

    if (isNaN(trabajoFinal) || trabajoFinal < 0 || trabajoFinal > 10) {
        alert('Por favor, ingrese una calificación válida para el trabajo final (0-10).');
        return;
    }

    // Cálculo de la calificación final
    const calificacionFinal = (promedioParciales * 0.55) + (examenFinal * 0.30) + (trabajoFinal * 0.15);
    document.getElementById('resultado').innerText = `Calificación final: ${calificacionFinal.toFixed(2)}`;
}


// Sección 5: Cálculo de Edad
function calcularEdad() {
    const inputFecha = document.getElementById('fechaNacimiento').value;

    if (!inputFecha) {
        alert('Por favor, ingrese una fecha de nacimiento.');
        return;
    }

    const fechaNacimiento = new Date(inputFecha);
    const hoy = new Date();

    if (isNaN(fechaNacimiento.getTime())) {
        alert('La fecha ingresada no es válida.');
        return;
    }

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    document.getElementById('resultadoEdad').innerText = `Edad: ${edad} años`;
}

// Sección 6: Palabras a Números
function palabrasANumeros() {
    const palabras = document.getElementById('palabras').value.toLowerCase().split(',').map(p => p.trim());

    const equivalencias = {
        uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5,
        seis: 6, siete: 7, ocho: 8, nueve: 9, cero: 0
    };

    const numeros = palabras.map(palabra => equivalencias[palabra] !== undefined ? equivalencias[palabra] : '-1');
    document.getElementById('resultadoPalabras').innerText = `Números: ${numeros.join(', ')}`;
}

// Sección 7: Cálculo de Horas Extras
function calcularHorasExtras() {
    const horasNormales = parseFloat(document.getElementById('horasNormales').value);
    const tarifaPorHora = parseFloat(document.getElementById('tarifaPorHora').value);
    
    if (isNaN(horasNormales) || isNaN(tarifaPorHora) || horasNormales < 0 || tarifaPorHora < 0) {
        alert('Por favor, ingrese valores válidos para horas normales y tarifa por hora.');
        return;
    }
    
    const HORAS_REGULARES = 40;
    const HORAS_EXTRA_LIMITE = 8;
    
    let horasExtras = Math.max(0, horasNormales - HORAS_REGULARES);
    let horasNormalesLegales = Math.min(horasNormales, HORAS_REGULARES);
    
    let pagoHorasNormales = horasNormalesLegales * tarifaPorHora;
    let pagoHorasExtras;

    if (horasExtras <= HORAS_EXTRA_LIMITE) {
        pagoHorasExtras = horasExtras * tarifaPorHora * 2;
    } else {
        pagoHorasExtras = (HORAS_EXTRA_LIMITE * tarifaPorHora * 2) + ((horasExtras - HORAS_EXTRA_LIMITE) * tarifaPorHora * 3);
    }

    let totalPago = pagoHorasNormales + pagoHorasExtras;
    
    document.getElementById('resultadoHorasExtras').innerText = `Pago por horas normales: $${pagoHorasNormales.toFixed(2)}\nPago por horas extras: $${pagoHorasExtras.toFixed(2)}\nTotal a pagar: $${totalPago.toFixed(2)}`;
}

// Sección 8: Reparto de Utilidades
function calcularUtilidad() {
    const salarioInput = document.getElementById('salario').value;
    const antiguedadInput = document.getElementById('antiguedad').value;

    // Validaciones
    const salario = parseFloat(salarioInput);
    const antiguedad = parseFloat(antiguedadInput);

    if (isNaN(salario) || salario < 0 || salarioInput.includes('+') || salarioInput.includes('-') || salarioInput.includes('*') || salarioInput.includes('/')) {
        alert('Por favor, ingrese un salario válido.');
        return;
    }

    if (isNaN(antiguedad) || antiguedad < 0) {
        alert('Por favor, ingrese una antigüedad válida (número no negativo).');
        return;
    }

    // Determinar el porcentaje de utilidad según la antigüedad
    let porcentaje;
    if (antiguedad < 1) {
        porcentaje = 0.05;
    } else if (antiguedad < 2) {
        porcentaje = 0.07;
    } else if (antiguedad < 5) {
        porcentaje = 0.10;
    } else if (antiguedad < 10) {
        porcentaje = 0.15;
    } else {
        porcentaje = 0.20;
    }

    const utilidad = salario * porcentaje;
    document.getElementById('resultado').innerText = `Utilidad anual: $${utilidad.toFixed(2)}`;
}

// Sección 9: Formulario de Registro

// Variables para controlar si los campos han sido validados
let validaciones = {
    nombre: false,
    email: false,
    comentarios: false,
    password: false,
    aceptar: false
};

// Validación al perder el foco
document.getElementById('nombre').addEventListener('blur', function() {
    validaciones.nombre = validarNombre();
});
document.getElementById('email').addEventListener('blur', function() {
    validaciones.email = validarEmail();
});
document.getElementById('comentarios').addEventListener('blur', function() {
    validaciones.comentarios = validarComentarios();
});
document.getElementById('password').addEventListener('blur', function() {
    validaciones.password = validarPassword();
});
document.getElementById('aceptar').addEventListener('change', function() {
    validaciones.aceptar = validarAceptar();
});

// Validación al enviar el formulario
document.getElementById('formulario').addEventListener('submit', function(event) {
    if (!validaciones.nombre || !validaciones.email || !validaciones.comentarios || !validaciones.password || !validaciones.aceptar) {
        event.preventDefault(); // Evita el envío del formulario
        alert('Por favor, corrige los errores antes de enviar el formulario.');
    }
});

// Funciones de validación
function validarNombre() {
    const nombre = document.getElementById('nombre').value.trim();
    if (!nombre) {
        alert('El nombre es obligatorio.');
        return false;
    }
    return true;
}

function validarEmail() {
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        alert('El email debe ser una dirección válida.');
        return false;
    }
    return true;
}

function validarComentarios() {
    const comentarios = document.getElementById('comentarios').value.trim();
    if (comentarios.length > 50) {
        alert('Los comentarios no pueden exceder los 50 caracteres.');
        return false;
    }
    return true;
}

function validarPassword() {
    const password = document.getElementById('password').value;
    if (password.length < 6 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        alert('La contraseña debe tener al menos 6 caracteres, una letra minúscula, una letra mayúscula y un dígito.');
        return false;
    }
    return true;
}

function validarAceptar() {
    const aceptar = document.getElementById('aceptar').checked;
    if (!aceptar) {
        alert('Debes aceptar las condiciones del servicio.');
        return false;
    }
    return true;
}

// Sección 10: Eliminación de Etiquetas Peligrosas
function eliminarEtiquetas() {
    const html = document.getElementById('html').value.trim();
    
    // Validar que el usuario ha ingresado algo
    if (!html) {
        alert('Por favor, ingrese código HTML para eliminar etiquetas peligrosas.');
        return;
    }

    const resultado = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');

    // Mensaje para el usuario
    if (resultado === html) {
        document.getElementById('resultadoEtiquetas').innerText = 'No se encontraron etiquetas <script> en el código.';
    } else {
        document.getElementById('resultadoEtiquetas').innerText = resultado;
    }
}
