import './App.css';
import React, { useState } from "react";
import AppSelector from "./components/AppSelector";
import ModificationSelector from "./components/ModificationSelector";
import XCCSQLGenerator from "./components/XCCSQLGenerator"; // Componente XCC
import XCCSQLPreview from "./components/XCCSQLPreview"; // Nuevo componente XCCSQLPreview
import XturfSQLGenerator from "./components/XturfSQLGenerator"; // Componente Xturf
import XturfSQLPreview from "./components/XturfSQLpreview"; // Nuevo componente XturfSQLPreview

const App = () => {
  const [app, setApp] = useState("");
  const [modification, setModification] = useState("");
  const [formData, setFormData] = useState({});

  const modifications = {
    XCC: [
      "Cambio de Transacción",
      "Otorgar Permisos a Usuario",
      "Actualizar Tipo de Pago",
      "Actualizar Entidad",
    ],
    Xturf: [
      "Desbloqueo de Usuario",
      "Cambiar Distancia de Carrera",
      "Descargos Jockeys"
    ],
    "Maroñas Online": ["Actualización de Saldo"],
  };

  return (
    <div className="container mt-4">
      <h2>Generador de Consultas SQL</h2>
      <AppSelector app={app} setApp={setApp} modifications={modifications} />
      {app && (
        <ModificationSelector
          app={app}
          modification={modification}
          setModification={setModification}
          modifications={modifications}
        />
      )}

      {/* Mostrar generador y preview de XCC si la app seleccionada es XCC */}
      {app === "XCC" && modification && (
        <>
          <XCCSQLGenerator modification={modification} formData={formData} setFormData={setFormData} />
          <XCCSQLPreview modification={modification} formData={formData} />
        </>
      )}

      {/* Mostrar generador y preview de Xturf si la app seleccionada es Xturf */}
      {app === "Xturf" && modification && (
        <>
          <XturfSQLGenerator modification={modification} formData={formData} setFormData={setFormData} />
          <XturfSQLPreview modification={modification} formData={formData} />
        </>
      )}
    </div>
  );
};

export default App;
