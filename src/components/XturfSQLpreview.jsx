import React from "react";

const XturfSQLPreview = ({ modification, formData }) => {
  const generateSQL = () => {
    switch (modification) {
      case "Cambiar Distancia de Carrera":
        return `BEGIN TRANSACTION;

        -- Actualización en Carreras
        UPDATE [Xturf].[dbo].[Carreras]
        SET CarrTiro = ${formData.carrTiro}
        WHERE CarrNro = ${formData.carrNro} AND HipoId = ${formData.hipoId};
        
        SELECT * FROM [Xturf].[dbo].[Carreras]
        WHERE CarrNro = ${formData.carrNro} AND HipoId = ${formData.hipoId};
        
        -- Actualización en Premios
        UPDATE [Xturf].[dbo].[Premios]
        SET PremioValDist = ${formData.carrTiro}
        WHERE PremioNro = ${formData.premioNro} AND HipoId = ${formData.hipoId};
        
        SELECT * FROM [Xturf].[dbo].[Premios]
        WHERE PremioNro = ${formData.premioNro} AND HipoId = ${formData.hipoId};
        
        -- Actualización en PerformParciales
        UPDATE [Xturf].[dbo].[PerformParciales]
        SET CarrValDist = ${formData.carrTiro}
        WHERE CarrNro = ${formData.carrNro} AND HipoId = ${formData.hipoId};
        
        SELECT * FROM [Xturf].[dbo].[PerformParciales]
        WHERE CarrNro = ${formData.carrNro} AND HipoId = ${formData.hipoId};
        
        -- Actualización en PerformManuales
        UPDATE [Xturf].[dbo].[PerformManuales]
        SET TiroValDist = ${formData.carrTiro}
        WHERE CarrNro = ${formData.carrNro} AND HipoId = ${formData.hipoId};
        
        SELECT * FROM [Xturf].[dbo].[PerformManuales]
        WHERE CarrNro = ${formData.carrNro} AND HipoId = ${formData.hipoId};
        
        -- Actualización en TeleTimer
        UPDATE [Xturf].[dbo].[TeleTimer]
        SET TeleValDist = ${formData.carrTiro}
        WHERE CarrNro = ${formData.carrNro} AND HipoId = ${formData.hipoId} AND TraceDbOrdinalInsert = 5;
        
        SELECT * FROM [Xturf].[dbo].[TeleTimer]
        WHERE CarrNro = ${formData.carrNro} AND HipoId = ${formData.hipoId};
        
        -- Actualización en XTCache_vw_Programa
        UPDATE [Xturf].[dbo].[XTCache_vw_Programa]
        SET cabCarrValDist = ${formData.carrTiro}
        WHERE cabCarrNro = ${formData.carrNro} AND cabHipoId = ${formData.hipoId};
        
        SELECT * FROM [Xturf].[dbo].[XTCache_vw_Programa]
        WHERE cabCarrNro = ${formData.carrNro} AND cabHipoId = ${formData.hipoId};
        
        -- Actualización en XTCache_vw_Tabulada
        UPDATE [Xturf].[dbo].[XTCache_vw_Tabulada]
        SET grp1CarrValDist = ${formData.carrTiro}
        WHERE grp1CarrNro = ${formData.carrNro} AND grp1HipoId = ${formData.hipoId};
        
        SELECT * FROM [Xturf].[dbo].[XTCache_vw_Tabulada]
        WHERE grp1CarrNro = ${formData.carrNro} AND grp1HipoId = ${formData.hipoId};
        
        ROLLBACK;`;

      case "Desbloqueo de Usuario":
        return `BEGIN TRANSACTION;
UPDATE [Xturf].[dbo].[XS_Users]
SET UserIsLocked = 0, UserFailedLoginCount = 0
WHERE UserName = '${formData.userName}';

SELECT * FROM [Xturf].[dbo].[XS_Users]
WHERE UserName = '${formData.userName}';
ROLLBACK`;

    case "Descargos Jockeys":
        return `--BUSCAMOS LA CARRERA
SELECT * FROM CARRERAS WHERE HIPOID = ${formData.hipoId} AND CARRFCH = '${formData.CarrFch};
SELECT * FROM INSCRIPCIONES WHERE HIPOID = ${formData.hipoId} AND PREMIONRO = ${formData.premioNro} AND INSCIDEQUINO = ${formData.EquinoId};
SELECT * FROM PERFORMANCES WHERE HIPOID = ${formData.hipoId} AND CARRNRO = ${formData.carrNro} AND EQUINOID = ${formData.EquinoId};

--ACTUALIZAMOS
UPDATE INSCRIPCIONES SET INSCVALDESCMANJCK = NULL, INSCVALPESOJCKDESCARGAAPR = ${formData.descarga}, INSCVALPESOJCKDESCARGAAPRREADJ = ${formData.descarga} WHERE HIPOID = ${formData.hipoId} AND PREMIONRO =  ${formData.premioNro} AND INSCIDEQUINO = ${formData.EquinoId};
UPDATE PERFORMANCES SET CARRVALPESOJCKDESCARGAAPR = ${formData.descarga}, CARRVALPESOJCKDESCARGAAPRREADJ = ${formData.descarga} WHERE HIPOID = ${formData.hipoId} AND CARRNRO = ${formData.carrNro} AND EQUINOID = ${formData.EquinoId};
`
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

export default XturfSQLPreview;
