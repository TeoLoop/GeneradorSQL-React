import React from "react";

const ModificationSelector = ({ app, modification, setModification, modifications }) => {
  return (
    <div className="mb-3">
      <label className="form-label">Selecciona el Tipo de Modificación</label>
      <select className="form-select" value={modification} onChange={(e) => setModification(e.target.value)}>
        <option value="">-- Seleccionar --</option>
        {modifications[app].map((mod) => (
          <option key={mod} value={mod}>{mod}</option>
        ))}
      </select>
    </div>
  );
};

export default ModificationSelector;
