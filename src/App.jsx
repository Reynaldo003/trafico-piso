// src/App.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  CalendarDays,
  CarFront,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  Mail,
  MessageSquareText,
  Phone,
  Search,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import { crearTraficoPiso } from "./lib/traficoPisoApi";
import fondo4 from "./assets/fondo4.jpg";
import fondo3 from "./assets/fondo3.jpg";

const STORAGE_KEY = "trafico-piso-rr-form-v1";

const AGENCIAS = [
  "VW Cordoba",
  "VW Orizaba",
  "VW Poza Rica",
  "VW Tuxtepec",
  "VW Tuxpan",
  "Chirey",
  "JAECOO R&R",
];

const ASESORES = [
  "AURA MARLIZETH FERNANDEZ LOPEZ",
  "Bianca Isabel Chavez Alarcon",
  "ERENDIRA SANTOS COYOTZI",
  "IRENE DEL CARMEN GUIZA LOPEZ",
  "MARCOS RAUL DIAZ RAMOS",
  "MARIO ALBERTO LOPEZ RAMOS",
  "MARISOL LAGUNES GONZALEZ",
  "NALLELY HERNANDEZ GARCIA",
  "OCTAVIO BRUNO GONZALEZ",
  "ROGELIO VAZQUEZ SANCHEZ",
  "RUBEN ALBERTO TOSQUY ADRIANO",
  "Saja Azzam Mohammad Jamous",
  "SANDRA LUZ PRIETO PEREZ",
  "YAMIL MISAEL RODRIGUEZ AGUILAR",
  "LUIS ALFONSO CORIA MARROQUIN",
  "CANDY DENISSE MARQUEZ CORTES",
  "DELMAR JAVIER ILLESCAS DOMINGUEZ",
  "EDGAR JESUS GOMEZ PEREZ",
  "Valeria Zilli Durante",
  "IDALMY JIMENEZ SANCHEZ",
  "IVAN JUAREZ ORTEGA",
  "JESSICA OLIVARES CAMPOS",
  "JESUS XITLAMA GOMEZ",
  "LIZBETH CANO CLARA",
  "LUIS MANUEL PALOMARES OLAYO",
  "MARIA DEL CARMEN ZAVALA VELAZQUEZ",
  "OMAR VILLIERS MONDRAGON",
  "RUBEN ROMERO VALDES",
  "VERONICA CASTILLO FUENTES",
  "Hector Rodriguez",
  "GEOVANI NAVA DIAZ",
  "ZEILA NAVARRO CONTRERAS",
  "JOSE ALFREDO BARRANCA REYES",
  "ADRIAN GALVEZ ROLDAN",
  "MARIA DE GUADALUPE VANVOLLENHOVEN DIAZ",
  "Marelly Tenorio Salinas",
  "ELIA INES ARANO REYES",
  "JORGE LUIS ALAMILLO RODRIGUEZ",
  "Cesar Ivan Salazar Reyes",
  "Cristian Fernando Rivera Godinez",
  "DULCE ABIGAIL GARCIA OLIVARES",
  "Felix Emmanuel Solis Angeles",
  "GERMAN JARITH SALAZAR MIRANDA",
  "Iris Yazmín Gómez Velázquez",
  "Israel Garcia Juarez",
  "JORGE ANTONIO RODRIGUEZ MARTINEZ",
  "JOSE DE JESUS GARCIA ROMAN",
  "JUAN MANUEL SOBREVILLA VICENCIO",
  "Miguel Capitanachi Paredes",
  "OLIMPIA VAZQUEZ MENDEZ",
  "Roberto Ramses Luna Fajardo",
  "Carlos Arturo Garces Vengas",
  "Edgar Omar Noguera Solis",
  "Javier Perez Meraz",
  "Luis Armando Almora Perez",
  "Mara Erubey Soto Villegas",
  "Sergio Ivan Quintana Martinez",
  "Sergio Rene Delgado Sarmiento",
  "Yoseth Ruiz Castellanos",
  "Luis Alfonso Coria Marroquín",
  "Juan Jesús Márquez Aquino",
  "Estefano Marlom De Azcue Aparicio",
  "VANESSA JIMENEZ MEDINA",
  "JOSE ALBERTO SEDAS FLORES",
];

const MOTIVOS_INGRESO = [
  "Vi anuncios en la TV",
  "Vi anuncios en las redes sociales",
  "Vi publicitarios",
  "Siempre me ha gustado la marca",
  "Pasé y sentí curiosidad",
  "Recibí información por Whatsapp"
];

const TIPOS_PERSONA = ["Física", "Moral"];
const TIEMPOS_COMPRA = ["Este mes", "De 1 a 3 meses", "De 3 a 6 meses"];

const FORMAS_CAPITALIZACION = [
  "Deseo un Crédito",
  "Quiero pagarlo de contado",
  "Me interesa un arrendamiento",
  "Me interesa un Autofinanciamiento",
];

const MENSUALIDADES = [3, 6, 12, 18, 26, 36, 48, 60, 72];

const FORMAS_COMPROBAR_INGRESOS = [
  "No cuenta",
  "Recibo de Nómina",
  "Factura por Servicios",
  "Estado de Cuenta",
  "Declaración de Impuestos",
  "Pago de Pensión",
  "Carta de Ingresos",
];

const MOTIVOS_COMPRA = [
  "Renovar auto",
  "Mi familia se hace más grande",
  "Mi trabajo me lo pide",
  "Mi estilo de vida me lo pide",
];

const PERFILES_PROFESIONALES = [
  "Comerciales",
  "Asalariado Sector Público",
  "Asalariado Sector Privado",
  "Pensionado",
  "Profesionista Independiente",
];

const ESTADOS_CIVILES = ["Soltero", "Casado", "Divorciado"];

const PASATIEMPOS = [
  "Ciclismo",
  "Natación",
  "Futbol",
  "Pesca",
  "Senderismo",
  "Tenis-frontón",
  "Golf",
  "Mixología",
  "Cocinar",
  "Coleccionar objetos",
  "Viajar dentro del país",
  "Viajar fuera del país",
  "Automovilismo",
  "Fotografía",
  "Pintura",
  "Arquitectura",
  "Conciertos",
  "Ajedrez",
  "Lectura",
  "Desarrollo personal",
  "Pilates",
  "Yoga",
  "Neurociencias",
  "Aprendizaje de idioma",
];

const respuestasIniciales = {
  agencia: "",
  nombre_prospecto: "",
  codigo_postal: "",
  telefono: "",
  email: "",
  asesor_ventas: "",
  motivo_ingreso: "",
  tipo_persona: "Física",
  tiempo_compra: "",
  deja_auto_cuenta: false,
  modelo_auto_cuenta: "",
  forma_capitalizacion: "",
  presupuesto_estimado: "",
  enganche_presupuestado: "",
  mensualidades_presupuestadas: "",
  comprueba_ingresos: false,
  forma_comprobar_ingresos: "No cuenta",
  motivo_compra: "",
  perfil_profesional: "",
  edad: "",
  cantidad_hijos: "0",
  estado_civil: "",
  pasatiempos: [],
  comentarios: "",
};

const PASOS = [
  {
    id: "agencia",
    tipo: "opcion",
    etiqueta: "Agencia",
    titulo: "¿En qué agencia se está registrando el ingreso?",
    opciones: AGENCIAS,
  },
  {
    id: "nombre_prospecto",
    tipo: "texto",
    etiqueta: "Datos generales",
    titulo: "Nombre del prospecto",
    placeholder: "NOMBRE COMPLETO",
    icono: UserRound,
    mayusculas: true,
  },
  {
    id: "codigo_postal",
    tipo: "numero",
    etiqueta: "Datos generales",
    titulo: "Código postal",
    placeholder: "Ej. 68300",
    icono: ClipboardList,
    maxLength: 5,
  },
  {
    id: "telefono",
    tipo: "numero",
    etiqueta: "Datos generales",
    titulo: "Teléfono del prospecto",
    placeholder: "10 dígitos",
    icono: Phone,
    maxLength: 12,
  },
  {
    id: "email",
    tipo: "email",
    etiqueta: "Datos generales",
    titulo: "Correo electrónico",
    placeholder: "correo@dominio.com",
    icono: Mail,
    opcional: true,
  },
  {
    id: "asesor_ventas",
    tipo: "asesor",
    etiqueta: "Datos generales",
    titulo: "Asesor de ventas que atiende al prospecto",
  },
  {
    id: "motivo_ingreso",
    tipo: "opcion",
    etiqueta: "Origen del ingreso",
    titulo: "Ingresó a la agencia porque...",
    opciones: MOTIVOS_INGRESO,
  },
  {
    id: "tipo_persona",
    tipo: "opcion",
    etiqueta: "Datos generales",
    titulo: "Tipo de persona",
    opciones: TIPOS_PERSONA,
  },
  {
    id: "tiempo_compra",
    tipo: "opcion",
    etiqueta: "Intención de compra",
    titulo: "¿Cuándo tiene programado realizar su compra?",
    opciones: TIEMPOS_COMPRA,
  },
  {
    id: "deja_auto_cuenta",
    tipo: "booleano",
    etiqueta: "Intención de compra",
    titulo: "¿Tiene interés en dejar un auto a cuenta?",
  },
  {
    id: "modelo_auto_cuenta",
    tipo: "texto",
    etiqueta: "Intención de compra",
    titulo: "¿Qué modelo de auto le interesa dejar a cuenta?",
    placeholder: "Ej. Jetta 2020",
    icono: CarFront,
    condicional: (respuestas) => Boolean(respuestas.deja_auto_cuenta),
  },
  {
    id: "forma_capitalizacion",
    tipo: "opcion",
    etiqueta: "Intención de compra",
    titulo: "Forma de capitalización",
    opciones: FORMAS_CAPITALIZACION,
  },
  {
    id: "presupuesto_estimado",
    tipo: "numero",
    etiqueta: "Intención de compra",
    titulo: "Presupuesto estimado de compra",
    placeholder: "Mínimo 6 dígitos. Ej. 300000",
    icono: BadgeDollarSign,
  },
  {
    id: "enganche_presupuestado",
    tipo: "numero",
    etiqueta: "Intención de compra",
    titulo: "Enganche presupuestado",
    placeholder: "Mínimo 5 dígitos. Ej. 50000",
    icono: BadgeDollarSign,
  },
  {
    id: "mensualidades_presupuestadas",
    tipo: "opcion",
    etiqueta: "Intención de compra",
    titulo: "Mensualidades presupuestadas",
    opciones: MENSUALIDADES.map(String),
    icono: CalendarDays,
  },
  {
    id: "comprueba_ingresos",
    tipo: "booleano",
    etiqueta: "Perfil financiero",
    titulo: "¿Puede comprobar ingresos?",
    icono: ShieldCheck,
  },
  {
    id: "forma_comprobar_ingresos",
    tipo: "opcion",
    etiqueta: "Perfil financiero",
    titulo: "Forma de comprobar ingresos",
    opciones: FORMAS_COMPROBAR_INGRESOS,
  },
  {
    id: "motivo_compra",
    tipo: "opcion",
    etiqueta: "Perfil del prospecto",
    titulo: "Motivo de compra",
    opciones: MOTIVOS_COMPRA,
  },
  {
    id: "perfil_profesional",
    tipo: "opcion",
    etiqueta: "Perfil del prospecto",
    titulo: "Perfil profesional",
    opciones: PERFILES_PROFESIONALES,
    icono: BriefcaseBusiness,
  },
  {
    id: "edad",
    tipo: "numero",
    etiqueta: "Perfil del prospecto",
    titulo: "Edad",
    placeholder: "Ej. 35",
    icono: UserRound,
    maxLength: 3,
    opcional: true,
  },
  {
    id: "cantidad_hijos",
    tipo: "numero",
    etiqueta: "Perfil del prospecto",
    titulo: "Cantidad de hijos",
    placeholder: "Ej. 0",
    icono: Users,
    maxLength: 2,
    opcional: true,
  },
  {
    id: "estado_civil",
    tipo: "opcion",
    etiqueta: "Perfil del prospecto",
    titulo: "Estado civil",
    opciones: ESTADOS_CIVILES,
  },
  {
    id: "pasatiempos",
    tipo: "pasatiempos",
    etiqueta: "Perfil del prospecto",
    titulo: "Seleccione al menos 3 pasatiempos",
  },
  {
    id: "comentarios",
    tipo: "comentario",
    etiqueta: "Notas finales",
    titulo: "Comentarios adicionales",
    placeholder: "Notas adicionales del asesor...",
    opcional: true,
  },
];

function cls(...clases) {
  return clases.filter(Boolean).join(" ");
}

function soloNumeros(value) {
  return String(value || "").replace(/\D/g, "");
}

function validarTelefonoMx(value) {
  const digitos = soloNumeros(value);

  if (!digitos) {
    return false;
  }

  // Válido: número nacional de 10 dígitos
  if (digitos.length === 10) {
    return true;
  }

  // Válido: número con lada país México: 52 + 10 dígitos
  if (digitos.length === 12 && digitos.startsWith("52")) {
    return true;
  }

  return false;
}

function mensajeTelefono(value) {
  const digitos = soloNumeros(value);

  if (!digitos) {
    return "Capture un teléfono numérico.";
  }

  if (digitos.length < 10) {
    return "El teléfono debe tener mínimo 10 dígitos.";
  }

  if (digitos.length === 11) {
    return "El teléfono no puede tener 11 dígitos. Use 10 dígitos o 52 + 10 dígitos.";
  }

  if (digitos.length === 12 && !digitos.startsWith("52")) {
    return "Si el teléfono tiene 12 dígitos, debe iniciar con 52.";
  }

  if (digitos.length > 12) {
    return "El teléfono no puede tener más de 12 dígitos.";
  }

  return "Teléfono inválido.";
}

function validarEmail(value) {
  const email = String(value || "").trim();

  // Si el paso es opcional y viene vacío, se acepta.
  if (!email) {
    return true;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function validarPaso(paso, respuestas) {
  if (!paso) return false;

  const valor = respuestas[paso.id];

  if (paso.opcional && !String(valor || "").trim()) {
    return true;
  }

  switch (paso.tipo) {
    case "texto":
      return String(valor || "").trim().length >= 2;

    case "numero": {
      const digitos = soloNumeros(valor);

      if (!digitos && paso.opcional) return true;
      if (!digitos) return false;

      if (paso.id === "telefono") {
        return validarTelefonoMx(digitos);
      }

      if (paso.id === "presupuesto_estimado") {
        return Number(digitos) >= 100000;
      }

      if (paso.id === "enganche_presupuestado") {
        return Number(digitos) >= 10000;
      }

      return true;
    }

    case "email":
      return validarEmail(valor);

    case "asesor":
      return ASESORES.includes(valor);

    case "opcion":
      return Boolean(valor);

    case "booleano":
      return typeof valor === "boolean";

    case "pasatiempos":
      return Array.isArray(valor) && valor.length >= 3;

    case "comentario":
      return true;

    default:
      return false;
  }
}

function ayudaPaso(paso, respuestas) {
  if (!paso) return "";
  if (validarPaso(paso, respuestas)) return "";

  const valor = respuestas[paso.id];

  switch (paso.id) {
    case "nombre_prospecto":
      return "Capture el nombre completo del prospecto.";

    case "codigo_postal":
      return "Capture solo números.";

    case "telefono":
      return mensajeTelefono(valor);

    case "email":
      return "Capture un correo válido. Ejemplo: nombre@dominio.com";

    case "asesor_ventas":
      return "Seleccione un asesor de la lista.";

    case "presupuesto_estimado":
      return "El presupuesto debe tener al menos seis dígitos.";

    case "enganche_presupuestado":
      return "El enganche debe tener al menos cinco dígitos.";

    case "pasatiempos":
      return "Seleccione al menos 3 pasatiempos.";

    default:
      return "Este dato es requerido para continuar.";
  }
}
function money(value) {
  const n = Number(soloNumeros(value) || 0);
  return n.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}

function normalizarResumen(valor) {
  if (Array.isArray(valor)) return valor.join(", ");
  if (typeof valor === "boolean") return valor ? "SÍ" : "NO";
  return String(valor || "No indicado");
}

function Encabezado({ progreso }) {
  return (
    <div className="mb-8 text-center sm:mb-10">
      <div className="mb-4 flex justify-center">
        <span className="inline-flex items-center rounded-full border border-white bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white">
          Automotriz R&amp;R
        </span>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        Registro de tráfico de piso
      </h1>

      <div className="mx-auto mt-6 h-2 max-w-xl overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-white transition-all duration-300"
          style={{ width: `${progreso}%` }}
        />
      </div>
    </div>
  );
}

function CabeceraPregunta({ paso, indice, total }) {
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
        {paso.titulo}
      </h2>
    </div>
  );
}

function PreguntaTexto({ paso, valor, onChange, onEnter }) {
  const Icono = paso.icono || UserRound;

  return (
    <div className="rounded-2xl border border-white/10 p-4 shadow-[0_18px_45px_-30px_rgba(19,30,92,0.28)] sm:rounded-3xl sm:p-5 md:p-6">
      <div className="mb-3 flex items-center gap-2 text-white">
        <Icono className="h-4 w-4" />
        <span className="text-sm font-medium">Captura</span>
      </div>

      <input
        type="text"
        value={valor}
        onChange={(e) => {
          const next = paso.mayusculas ? e.target.value.toUpperCase() : e.target.value;
          onChange(next);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnter();
        }}
        placeholder={paso.placeholder}
        autoComplete="off"
        className="w-full border-0 bg-transparent text-lg font-semibold text-white outline-none placeholder:text-slate-400 sm:text-2xl"
      />
    </div>
  );
}

function PreguntaNumero({ paso, valor, onChange, onEnter }) {
  const Icono = paso.icono || ClipboardList;
  const mostrarMoneda = ["presupuesto_estimado", "enganche_presupuestado"].includes(paso.id);

  return (
    <div className="rounded-2xl border border-white/10 p-4 shadow-[0_18px_45px_-30px_rgba(19,30,92,0.28)] sm:rounded-3xl sm:p-5 md:p-6">
      <div className="mb-3 flex items-center gap-2 text-white">
        <Icono className="h-4 w-4" />
        <span className="text-sm font-medium">Solo números</span>
      </div>

      <input
        type="text"
        inputMode="numeric"
        value={valor}
        maxLength={paso.maxLength || undefined}
        onChange={(e) => onChange(soloNumeros(e.target.value).slice(0, paso.maxLength || 20))}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnter();
        }}
        placeholder={paso.placeholder}
        autoComplete="off"
        className="w-full border-0 bg-transparent text-lg font-semibold text-white outline-none placeholder:text-slate-400 sm:text-2xl"
      />

      {mostrarMoneda && valor ? (
        <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
          Monto capturado: {money(valor)}
        </p>
      ) : null}
    </div>
  );
}

function PreguntaEmail({ paso, valor, onChange, onEnter }) {
  const Icono = paso.icono || Mail;

  return (
    <div className="rounded-2xl border border-white/10 p-4 shadow-[0_18px_45px_-30px_rgba(19,30,92,0.28)] sm:rounded-3xl sm:p-5 md:p-6">
      <div className="mb-3 flex items-center gap-2 text-white">
        <Icono className="h-4 w-4" />
        <span className="text-sm font-medium">Opcional</span>
      </div>

      <input
        type="email"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnter();
        }}
        placeholder={paso.placeholder}
        autoComplete="off"
        className="w-full border-0 bg-transparent text-lg font-semibold text-white outline-none placeholder:text-slate-400 sm:text-2xl"
      />
    </div>
  );
}

function PreguntaOpciones({ paso, valor, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {paso.opciones.map((opcion) => {
        const activo = String(valor) === String(opcion);

        return (
          <button
            key={opcion}
            type="button"
            onClick={() => onChange(String(opcion))}
            className={cls(
              "rounded-2xl border p-4 text-left transition sm:p-5",
              activo
                ? "border-[#131E5C] bg-[#131E5C] font-bold text-white shadow-[0_14px_30px_-18px_rgba(19,30,92,0.65)]"
                : "border-[#131E5C]/10 text-white font-bold hover:border-[#131E5C]/25 hover:bg-white/15",
            )}
          >
            <div className="flex items-start gap-3">
              <span
                className={cls(
                  "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                  activo ? "bg-white" : "bg-white/25",
                )}
              />
              <p className="text-sm font-bold leading-6">{opcion}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function PreguntaBooleano({ valor, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {[
        { label: "SÍ", value: true },
        { label: "NO", value: false },
      ].map((opcion) => {
        const activo = valor === opcion.value;

        return (
          <button
            key={opcion.label}
            type="button"
            onClick={() => onChange(opcion.value)}
            className={cls(
              "rounded-2xl border px-5 py-8 text-center transition",
              activo
                ? "border-[#131E5C] bg-[#131E5C] font-bold text-white shadow-[0_14px_30px_-18px_rgba(19,30,92,0.65)]"
                : "border-[#131E5C]/10 text-white font-bold hover:border-[#131E5C]/25 hover:bg-white/15",
            )}
          >
            <div className="text-3xl font-black">{opcion.label}</div>
          </button>
        );
      })}
    </div>
  );
}

function PreguntaAsesor({ valor, onChange }) {
  const [busqueda, setBusqueda] = useState("");

  const asesoresFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return ASESORES;

    return ASESORES.filter((asesor) => asesor.toLowerCase().includes(q));
  }, [busqueda]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white">
        <Search className="h-4 w-4" />
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Escriba para buscar al asesor..."
          className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/60"
        />
      </div>

      <div className="max-h-[420px] overflow-y-auto rounded-2xl border border-[#131E5C]/10 p-2 shadow-[0_18px_45px_-30px_rgba(19,30,92,0.22)] sm:rounded-3xl sm:p-3">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {asesoresFiltrados.length > 0 ? (
            asesoresFiltrados.map((asesor) => {
              const activo = valor === asesor;

              return (
                <button
                  key={asesor}
                  type="button"
                  onClick={() => onChange(asesor)}
                  className={cls(
                    "flex min-h-[58px] items-center gap-3 rounded-2xl border px-3 py-3 text-left font-bold transition sm:min-h-[64px]",
                    activo
                      ? "border-[#131E5C] bg-[#131E5C] text-white shadow-[0_14px_30px_-18px_rgba(19,30,92,0.65)]"
                      : "border-[#131E5C]/10 text-white hover:border-[#131E5C]/25 hover:bg-white/15",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-base font-bold leading-5">
                      {asesor}
                    </p>
                  </div>

                  {activo ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-white" />
                  ) : null}
                </button>
              );
            })
          ) : (
            <div className="px-3 py-8 text-center text-sm text-white/70">
              No se encontraron asesores con esa búsqueda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PreguntaPasatiempos({ valor, onChange }) {
  const seleccionados = new Set(valor || []);

  function toggle(item) {
    if (seleccionados.has(item)) {
      onChange((valor || []).filter((x) => x !== item));
      return;
    }

    onChange([...(valor || []), item]);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <HeartHandshake className="h-4 w-4" />
          <span className="text-sm font-bold">Selección múltiple</span>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#131E5C]">
          {(valor || []).length}/3 mínimos
        </span>
      </div>

      <div className="flex max-h-[430px] flex-wrap gap-2 overflow-y-auto rounded-2xl border border-white/10 p-3 sm:rounded-3xl">
        {PASATIEMPOS.map((item) => {
          const activo = seleccionados.has(item);

          return (
            <button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              className={cls(
                "rounded-full border px-4 py-3 text-sm font-bold transition",
                activo
                  ? "border-[#131E5C] bg-[#131E5C] text-white"
                  : "border-white/15 bg-white/5 text-white hover:bg-white/15",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PreguntaComentario({ paso, valor, onChange }) {
  return (
    <div className="rounded-2xl border border-white/10 p-4 shadow-[0_18px_45px_-30px_rgba(19,30,92,0.28)] sm:rounded-3xl sm:p-5 md:p-6">
      <div className="mb-3 flex items-center gap-2 text-white">
        <MessageSquareText className="h-4 w-4" />
        <span className="text-sm font-medium">Comentario opcional</span>
      </div>

      <textarea
        rows={6}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={paso.placeholder}
        className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none transition placeholder:text-white/60 focus:border-white/40 focus:ring-4 focus:ring-[#131E5C]/8"
      />

      <p className="mt-3 text-sm text-white">
        Puede dejar este campo vacío si no hay notas adicionales.
      </p>
    </div>
  );
}

function PantallaFinal({ respuestas, onRestart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-2 text-center"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#131E5C]/10 text-white">
        <CheckCircle2 className="h-8 w-8" />
      </div>

      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white">
        Registro guardado correctamente
      </h2>

      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Agencia", respuestas.agencia],
          ["Prospecto", respuestas.nombre_prospecto],
          ["Teléfono", respuestas.telefono],
          ["Asesor", respuestas.asesor_ventas],
          ["Compra", respuestas.tiempo_compra],
          ["Capitalización", respuestas.forma_capitalizacion],
          ["Presupuesto", money(respuestas.presupuesto_estimado)],
          ["Enganche", money(respuestas.enganche_presupuestado)],
          ["Auto a cuenta", respuestas.deja_auto_cuenta],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/75">
              {label}
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {normalizarResumen(value)}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-8 inline-flex w-full items-center justify-center rounded-2xl border border-[#131E5C] bg-white px-5 py-3 text-sm font-semibold text-[#131E5C] transition hover:bg-[#131E5C] hover:text-white sm:w-auto"
      >
        Registrar otro ingreso
      </button>
    </motion.div>
  );
}

export default function App() {
  const [respuestas, setRespuestas] = useState(respuestasIniciales);
  const [indiceActual, setIndiceActual] = useState(0);
  const [direccion, setDireccion] = useState(1);
  const [finalizada, setFinalizada] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");

  const timeoutAvanceRef = useRef(null);

  const pasosVisibles = useMemo(() => {
    return PASOS.filter((paso) => {
      if (typeof paso.condicional !== "function") return true;
      return paso.condicional(respuestas);
    });
  }, [respuestas]);

  const pasoActual = pasosVisibles[indiceActual] || pasosVisibles[pasosVisibles.length - 1];
  const puedeContinuar = validarPaso(pasoActual, respuestas);
  const ayuda = ayudaPaso(pasoActual, respuestas);
  const progreso = pasosVisibles.length
    ? Math.round(((indiceActual + 1) / pasosVisibles.length) * 100)
    : 0;

  useEffect(() => {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (!guardado) return;

    try {
      const datos = JSON.parse(guardado);

      setRespuestas({ ...respuestasIniciales, ...(datos.respuestas || {}) });
      setIndiceActual(typeof datos.indiceActual === "number" ? datos.indiceActual : 0);
      setFinalizada(Boolean(datos.finalizada));
    } catch (error) {
      console.error("No se pudieron restaurar los datos:", error);
    }
  }, []);

  useEffect(() => {
    if (indiceActual > pasosVisibles.length - 1) {
      setIndiceActual(Math.max(pasosVisibles.length - 1, 0));
    }
  }, [indiceActual, pasosVisibles.length]);

  useEffect(() => {
    if (!respuestas.deja_auto_cuenta && respuestas.modelo_auto_cuenta) {
      setRespuestas((prev) => ({ ...prev, modelo_auto_cuenta: "" }));
    }
  }, [respuestas.deja_auto_cuenta, respuestas.modelo_auto_cuenta]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        respuestas,
        indiceActual,
        finalizada,
      }),
    );
  }, [respuestas, indiceActual, finalizada]);

  useEffect(() => {
    return () => {
      if (timeoutAvanceRef.current) clearTimeout(timeoutAvanceRef.current);
    };
  }, []);

  useEffect(() => {
    preloadImages([fondo4]);
  }, []);

  function actualizarRespuesta(campo, valor) {
    setErrorEnvio("");
    setRespuestas((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function siguiente() {
    if (!puedeContinuar) return;
    if (indiceActual >= pasosVisibles.length - 1) return;

    if (timeoutAvanceRef.current) clearTimeout(timeoutAvanceRef.current);

    setDireccion(1);
    setIndiceActual((prev) => prev + 1);
  }

  function anterior() {
    if (indiceActual <= 0) return;

    if (timeoutAvanceRef.current) clearTimeout(timeoutAvanceRef.current);

    setDireccion(-1);
    setIndiceActual((prev) => prev - 1);
  }

  function manejarSeleccionConAvance(campo, valor) {
    actualizarRespuesta(campo, valor);

    if (enviando) return;
    if (indiceActual >= pasosVisibles.length - 1) return;

    if (timeoutAvanceRef.current) clearTimeout(timeoutAvanceRef.current);

    timeoutAvanceRef.current = setTimeout(() => {
      setDireccion(1);
      setIndiceActual((prev) => {
        if (prev >= pasosVisibles.length - 1) return prev;
        return prev + 1;
      });
    }, 180);
  }

  function reiniciarFormulario() {
    if (timeoutAvanceRef.current) clearTimeout(timeoutAvanceRef.current);

    localStorage.removeItem(STORAGE_KEY);
    setRespuestas(respuestasIniciales);
    setIndiceActual(0);
    setDireccion(1);
    setFinalizada(false);
    setEnviando(false);
    setErrorEnvio("");
  }

  async function finalizarRegistro() {
    if (enviando) return;
    if (!puedeContinuar) return;

    setEnviando(true);
    setErrorEnvio("");

    try {
      await crearTraficoPiso(respuestas);
      localStorage.removeItem(STORAGE_KEY);
      setFinalizada(true);
    } catch (error) {
      console.error("Error al guardar tráfico de piso:", error);
      setErrorEnvio(
        error.message || "Ocurrió un error al guardar el tráfico de piso.",
      );
    } finally {
      setEnviando(false);
    }
  }

  function renderPregunta() {
    switch (pasoActual.tipo) {
      case "texto":
        return (
          <PreguntaTexto
            paso={pasoActual}
            valor={respuestas[pasoActual.id]}
            onChange={(valor) => actualizarRespuesta(pasoActual.id, valor)}
            onEnter={siguiente}
          />
        );

      case "numero":
        return (
          <PreguntaNumero
            paso={pasoActual}
            valor={respuestas[pasoActual.id]}
            onChange={(valor) => actualizarRespuesta(pasoActual.id, valor)}
            onEnter={siguiente}
          />
        );

      case "email":
        return (
          <PreguntaEmail
            paso={pasoActual}
            valor={respuestas[pasoActual.id]}
            onChange={(valor) => actualizarRespuesta(pasoActual.id, valor)}
            onEnter={siguiente}
          />
        );

      case "asesor":
        return (
          <PreguntaAsesor
            valor={respuestas[pasoActual.id]}
            onChange={(valor) => manejarSeleccionConAvance(pasoActual.id, valor)}
          />
        );

      case "opcion":
        return (
          <PreguntaOpciones
            paso={pasoActual}
            valor={respuestas[pasoActual.id]}
            onChange={(valor) => manejarSeleccionConAvance(pasoActual.id, valor)}
          />
        );

      case "booleano":
        return (
          <PreguntaBooleano
            valor={respuestas[pasoActual.id]}
            onChange={(valor) => manejarSeleccionConAvance(pasoActual.id, valor)}
          />
        );

      case "pasatiempos":
        return (
          <PreguntaPasatiempos
            valor={respuestas[pasoActual.id]}
            onChange={(valor) => actualizarRespuesta(pasoActual.id, valor)}
          />
        );

      case "comentario":
        return (
          <PreguntaComentario
            paso={pasoActual}
            valor={respuestas[pasoActual.id]}
            onChange={(valor) => actualizarRespuesta(pasoActual.id, valor)}
          />
        );

      default:
        return null;
    }
  }

  function preloadImages(images = []) {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }

  const mostrarBotonContinuarManual = [
    "texto",
    "numero",
    "email",
    "pasatiempos",
    "comentario",
  ].includes(pasoActual.tipo);

  return (
    <div className="min-h-screen overflow-hidden bg-[#131e5c]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(44,91,187,0.24),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.10),_transparent_28%)]" />
        <div className="absolute left-[-12%] top-[-8%] rounded-full bg-[#2A63FF]/10 blur-3xl" />
        <div className="absolute bottom-[-12%] right-[-10%] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,16,45,0.96),rgba(11,31,94,0.92),rgba(7,16,38,0.98))]" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative w-full overflow-hidden rounded-lg border border-[#131E5C]/10 p-4 shadow-[0_30px_80px_-25px_rgba(19,30,92,0.14)] sm:rounded-3xl sm:p-6 md:p-8 lg:p-10"
          style={{
            backgroundImage: `url(${fondo3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-[#131e5c]/20" />

          <div className="relative z-10">
            {finalizada ? (
              <PantallaFinal respuestas={respuestas} onRestart={reiniciarFormulario} />
            ) : (
              <>
                <CabeceraPregunta
                  paso={pasoActual}
                  indice={indiceActual}
                  total={pasosVisibles.length}
                />

                <AnimatePresence mode="wait" custom={direccion}>
                  <motion.div
                    key={pasoActual.id}
                    custom={direccion}
                    initial={{ opacity: 0, x: direccion > 0 ? 22 : -22 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direccion > 0 ? -22 : 22 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderPregunta()}
                  </motion.div>
                </AnimatePresence>


                {errorEnvio ? (
                  <div className="mt-4 rounded-2xl border border-red-300/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-white">
                    {errorEnvio}
                  </div>
                ) : null}

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={anterior}
                    disabled={indiceActual === 0 || enviando}
                    className={cls(
                      "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition sm:w-auto",
                      indiceActual === 0 || enviando
                        ? "cursor-not-allowed border border-white/10 bg-slate-100 text-slate-400"
                        : "border border-[#131E5C]/20 bg-white text-[#131E5C] hover:border-white hover:bg-[#131E5C]/5 hover:text-white",
                    )}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Regresar
                  </button>

                  {mostrarBotonContinuarManual ? (
                    <button
                      type="button"
                      onClick={
                        indiceActual === pasosVisibles.length - 1
                          ? finalizarRegistro
                          : siguiente
                      }
                      disabled={enviando || !puedeContinuar}
                      className={cls(
                        "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition sm:w-auto",
                        enviando || !puedeContinuar
                          ? "cursor-not-allowed bg-white/45 font-bold text-white"
                          : "bg-white/80 font-bold text-[#131e5c] hover:bg-white",
                      )}
                    >
                      {enviando ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Guardando...
                        </>
                      ) : indiceActual === pasosVisibles.length - 1 ? (
                        "Guardar tráfico de piso"
                      ) : (
                        <>
                          Continuar
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="w-full rounded-2xl border border-[#131E5C]/10 bg-[#131E5C]/5 px-4 py-3 text-center text-sm text-white sm:w-auto sm:text-left">
                      Seleccione una opción para continuar automáticamente.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
