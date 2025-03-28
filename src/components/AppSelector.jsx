import React from "react";

const AppSelector = ({ app, setApp, modifications }) => {
  return (
    <div className="mb-3">
      <label className="form-label">Selecciona la Aplicación</label>
      <select className="form-select" value={app} onChange={(e) => setApp(e.target.value)}>
        <option value="">-- Seleccionar --</option>
        {Object.keys(modifications).map((app) => (
          <option key={app} value={app}>{app}</option>
        ))}
      </select>
    </div>
  );
};

export default AppSelector;

