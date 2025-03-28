import React from "react";

const XCCSQLPreview = ({ modification, formData }) => {
  const generateSQL = () => {
    switch (modification) {
      case "Cambio de Transacción":
        return `BEGIN TRANSACTION
SELECT * FROM Movimientos WHERE MovNro=${formData.movNro || ""}
UPDATE Movimientos SET MovIdTrnRemota = '${formData.movIdTrnRemota || ""}' WHERE MovNro='${formData.movNro || ""}';
UPDATE Movimientos SET MovTxtRef002 = 'Se modifica movidTrnRemota a pedido de call. MovidTrnRemota anterior ${formData.movIdTrnRemotaAnterior || ""}' WHERE MovNro='${formData.movNro || ""}'
SELECT * FROM Movimientos WHERE MovNro=${formData.movNro || ""}
ROLLBACK
--COMMIT`;

      case "Otorgar Permisos a Usuario":
        const entidades = Array.isArray(formData.entidades) ? formData.entidades : [];
        return `BEGIN TRANSACTION;
SELECT * FROM UsuariosVsEntidades WHERE UserName='${formData.userName || ""}';
${entidades.map((ent) => `INSERT INTO UsuariosVsEntidades(UserName,EntidadId) VALUES ('${formData.userName || ""}','${ent || ""}');`).join("\n")}
SELECT * FROM UsuariosVsEntidades WHERE UserName='${formData.userName || ""}';
ROLLBACK
--COMMIT;`;

      case "Actualizar Tipo de Pago":
        return `BEGIN TRANSACTION
SELECT * FROM Movimientos WHERE MovNro=${formData.movNro || ""}
UPDATE Movimientos SET MovTpoPago='${formData.movTpoPago || ""}' WHERE MovNro=${formData.movNro || ""}
UPDATE Movimientos SET MovTxtRef002 = 'Se modifica el tipo de pago a ${formData.movTpoPago || ""}, tipo de pago anterior ${formData.movTpoPagoAnterior || ""}' WHERE MovNro=${formData.movNro || ""}
SELECT * FROM Movimientos WHERE MovNro=${formData.movNro || ""}
ROLLBACK
--COMMIT;`;

      case "Actualizar Entidad":
        return `BEGIN TRANSACTION
SELECT * FROM Movimientos WHERE MovNro='${formData.movNro || ""}'
UPDATE Movimientos SET NewEntidadId='${formData.newEntidadId || ""}' WHERE MovNro='${formData.movNro || ""}'
UPDATE Movimientos SET MovTxtRef001 = 'Se modifica la entidad a ${formData.newEntidadId || ""}, entidad anterior ${formData.entidadIdAnterior || ""}' WHERE MovNro='${formData.movNro || ""}'
SELECT * FROM Movimientos WHERE MovNro=${formData.movNro || ""}
ROLLBACK
--COMMIT;`;

      default:
        return "";
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">Consulta SQL Generada</label>
      <textarea className="form-control" rows="6" readOnly value={generateSQL()} />
    </div>
  );
};

export default XCCSQLPreview;
