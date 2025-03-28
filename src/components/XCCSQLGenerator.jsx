import React, { useEffect } from "react";

// Definir las entidades y tipos de pago como constantes
const entidades = [
  "AMTOTE",
  "CC_DIA",
  "CC_GEANT",
  "CC_HIPO",
  "CC_HLP",
  "CC_MSH",
  "CC_NC",
  "CC_PANDO",
  "CC_PIEDRAS",
  "CC_TELEF",
  "CLIENTEORO",
  "HANDSOFT",
  "HIPICA",
  "REDPAGOS",
  "SIMULCAST",
  "TITAU",
  "TREDBROU",
  "VALAPUESTA",
  "WEB_MP",
  "WEBBANRED",
  "WEBBONIF",
  "WEBTARJETA",
  "XPRESS",
];

const tiposDePago = [
  { value: "A", label: "Ajuste Administrativo" },
  { value: "B", label: "Bonificación" },
  { value: "C", label: "Tarjeta de Crédito" },
  { value: "D", label: "Tarjeta de Débito" },
  { value: "E", label: "Efectivo" },
  { value: "F", label: "Crédito con Pago Diferido" },
  { value: "H", label: "Transferencia Bancaria" },
  { value: "I", label: "Indefinido" },
  { value: "P", label: "Tarjeta Prepaga" },
  { value: "R", label: "Acreditación solo apostar" },
  { value: "T", label: "Transferencia Redpagos" },
  { value: "X", label: "Apuesta Terceros" },
];

const XCCSQLGenerator = ({ modification, formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultipleChange = (e) => {
    const { options } = e.target;
    const selectedEntities = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedEntities.push(options[i].value);
      }
    }
    setFormData({ ...formData, [e.target.name]: selectedEntities });
  };

  useEffect(() => {
    // Solo actualizar el estado si 'movTxtRef002' no tiene un valor
    if (!formData.movTxtRef002) {
      setFormData({ ...formData, movTxtRef002: "" });
    }
    // Agregar dependencia 'formData.movTxtRef002' para evitar el ciclo infinito
  }, [formData.movTxtRef002, setFormData]);

  return (
    <>
      {modification === "Cambio de Transacción" && (
        <>
          <div className="mb-3">
            <label className="form-label">Número de Movimiento</label>
            <input
              type="text"
              className="form-control"
              name="movNro"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">MovIdTrnRemota</label>
            <input
              type="text"
              className="form-control"
              name="movIdTrnRemota"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Transacción Remota Anterior</label>
            <input
              type="text"
              className="form-control"
              name="movIdTrnRemotaAnterior"
              value={formData.movIdTrnRemotaAnterior || ""}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      {modification === "Otorgar Permisos a Usuario" && (
        <>
          <div className="mb-3">
            <label className="form-label">Nombre de Usuario</label>
            <input
              type="text"
              className="form-control"
              name="userName"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Entidades</label>
            <select
              className="form-control"
              name="entidades"
              multiple
              onChange={handleMultipleChange}
            >
              {entidades.map((entidad) => (
                <option key={entidad} value={entidad}>
                  {entidad}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      {modification === "Actualizar Tipo de Pago" && (
        <>
          <div className="mb-3">
            <label className="form-label">Número de Movimiento</label>
            <input
              type="text"
              className="form-control"
              name="movNro"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nuevo Tipo de Pago</label>
            <select
              className="form-control"
              name="movTpoPago"
              onChange={handleChange}
            >
              {tiposDePago.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo de Pago Anterior</label>
            <select
              className="form-control"
              name="movTpoPagoAnterior"
              onChange={handleChange}
            >
              {tiposDePago.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      {modification === "Actualizar Entidad" && (
        <>
          <div className="mb-3">
            <label className="form-label">Número de Movimiento</label>
            <input
              type="text"
              className="form-control"
              name="movNro"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nueva Entidad</label>
            <select
              className="form-control"
              name="newEntidadId"
              onChange={handleChange}
            >
              {entidades.map((entidad) => (
                <option key={entidad} value={entidad}>
                  {entidad}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Entidad Anterior</label>
            <select
              className="form-control"
              name="entidadIdAnterior"
              onChange={handleChange}
            >
              {entidades.map((entidad) => (
                <option key={entidad} value={entidad}>
                  {entidad}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
};

export default XCCSQLGenerator;
