//traficoPisoApi.js
const API_URL =
  import.meta.env.VITE_API_URL || "https://crm.grupoautomotrizryr.com";
// import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function getAuthHeader() {
  try {
    const token = localStorage.getItem("auth.access");

    if (!token || token === "undefined" || token === "null") {
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  } catch {
    return {};
  }
}

function limpiarTexto(valor) {
  return String(valor ?? "").trim();
}

function soloNumeros(valor) {
  return String(valor ?? "").replace(/\D/g, "");
}

function normalizarMonto(valor) {
  const limpio = soloNumeros(valor);
  return limpio ? Number(limpio) : 0;
}

function normalizarEntero(valor) {
  const limpio = soloNumeros(valor);
  return limpio ? Number(limpio) : 0;
}

export async function crearTraficoPiso(respuestas) {
  const payload = {
    agencia: limpiarTexto(respuestas.agencia),

    nombre_prospecto: limpiarTexto(respuestas.nombre_prospecto).toUpperCase(),
    codigo_postal: soloNumeros(respuestas.codigo_postal),
    telefono: soloNumeros(respuestas.telefono),
    email: limpiarTexto(respuestas.email),

    asesor_ventas: limpiarTexto(respuestas.asesor_ventas),
    motivo_ingreso: limpiarTexto(respuestas.motivo_ingreso),
    tipo_persona: limpiarTexto(respuestas.tipo_persona),

    tiempo_compra: limpiarTexto(respuestas.tiempo_compra),
    deja_auto_cuenta: Boolean(respuestas.deja_auto_cuenta),
    modelo_auto_cuenta: respuestas.deja_auto_cuenta
      ? limpiarTexto(respuestas.modelo_auto_cuenta)
      : "",

    forma_capitalizacion: limpiarTexto(respuestas.forma_capitalizacion),
    presupuesto_estimado: normalizarMonto(respuestas.presupuesto_estimado),
    enganche_presupuestado: normalizarMonto(respuestas.enganche_presupuestado),
    mensualidades_presupuestadas: normalizarEntero(
      respuestas.mensualidades_presupuestadas,
    ),

    comprueba_ingresos: Boolean(respuestas.comprueba_ingresos),
    forma_comprobar_ingresos: limpiarTexto(respuestas.forma_comprobar_ingresos),

    motivo_compra: limpiarTexto(respuestas.motivo_compra),
    perfil_profesional: limpiarTexto(respuestas.perfil_profesional),
    edad:
      respuestas.edad === "" || respuestas.edad === null
        ? null
        : normalizarEntero(respuestas.edad),
    cantidad_hijos: normalizarEntero(respuestas.cantidad_hijos),
    estado_civil: limpiarTexto(respuestas.estado_civil),

    pasatiempos: Array.isArray(respuestas.pasatiempos)
      ? respuestas.pasatiempos
      : [],

    comentarios: limpiarTexto(respuestas.comentarios),
  };

  const respuesta = await fetch(`${API_URL}/trafico-piso/api/trafico-piso/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  let data = null;

  try {
    data = await respuesta.json();
  } catch {
    data = null;
  }

  if (!respuesta.ok) {
    const mensaje =
      data?.detail ||
      data?.message ||
      data?.non_field_errors?.[0] ||
      "No se pudo guardar el tráfico de piso en el servidor.";

    throw new Error(mensaje);
  }

  return data;
}
