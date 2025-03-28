import React, { useEffect } from "react";

// Definimos los hipódromos en una constante
const hipodromos = [
    { id: 1, nombre: "MAROÑAS" },
    { id: 4, nombre: "COLONIA" },
    { id: 7, nombre: "DURAZNO" },
    { id: 8, nombre: "FLORES" },
    { id: 9, nombre: "FLORIDA" },
    { id: 10, nombre: "FRAY BENTOS" },
    { id: 13, nombre: "LAS PIEDRAS" },
    { id: 14, nombre: "MALDONADO" },
    { id: 16, nombre: "MELO" },
    { id: 17, nombre: "MERCEDES" },
    { id: 21, nombre: "PAYSANDÚ" },
    { id: 22, nombre: "ROCHA" },
    { id: 24, nombre: "SALTO" },
    { id: 26, nombre: "SAN JOSÉ" },
    { id: 42, nombre: "ARTIGAS" },
];

const XturfSQLGenerator = ({ modification, formData, setFormData }) => {
    useEffect(() => {
        if (modification === "Cambiar Distancia de Carrera") {
            setFormData({
                carrNro: "", // Número de carrera
                premioNro: "", // Número de premio
                hipoId: 1,  // HipoId por defecto
                carrTiro: "", // Distancia a modificar
            });
        } else if (modification === "Desbloqueo de Usuario") {
            setFormData({
                userName: "", // Usuario a desbloquear
            });
        } else if (modification === "Descargos Jockeys") {
            setFormData({
                carrNro: "", // Número de carrera
                premioNro: "", // Número de premio
                hipoId: 1, // HipoId por defecto
                EquinoId: "",
                CarrFch: new Date().toISOString().slice(0, 16),
                descarga:"",
            })
        }
    }, [modification, setFormData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="mb-3">
            {modification === "Cambiar Distancia de Carrera" && (
                <div className="mb-3">
                    <label className="form-label">Número de Carrera</label>
                    <input
                        type="number"
                        className="form-control"
                        name="carrNro"
                        value={formData.carrNro || ""}
                        onChange={handleChange}
                    />

                    <label className="form-label mt-2">Número de Premio</label>
                    <input
                        type="number"
                        className="form-control"
                        name="premioNro"
                        value={formData.premioNro || ""}
                        onChange={handleChange}
                    />

                    <label className="form-label mt-2">Hipódromo</label>
                    <select
                        className="form-control"
                        name="hipoId"
                        value={formData.hipoId || ""}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione un Hipódromo</option>
                        {hipodromos.map((hipo) => (
                            <option key={hipo.id} value={hipo.id}>
                                {hipo.id} - {hipo.nombre}
                            </option>
                        ))}
                    </select>

                    <label className="form-label mt-2">Nueva Distancia</label>
                    <input
                        type="number"
                        className="form-control"
                        name="carrTiro"
                        value={formData.carrTiro || ""}
                        onChange={handleChange}
                    />
                </div>
            )}

            {modification === "Desbloqueo de Usuario" && (
                <div>
                    <label className="form-label">Nombre de Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        name="userName"
                        value={formData.userName || ""}
                        onChange={handleChange}
                    />
                </div>
            )}

            {modification === "Descargos Jockeys" && (
                <div>
                    <label className="form-label mt-2">Hipódromo</label>
                    <select
                        className="form-control"
                        name="hipoId"
                        value={formData.hipoId || ""}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione un Hipódromo</option>
                        {hipodromos.map((hipo) => (
                            <option key={hipo.id} value={hipo.id}>
                                {hipo.id} - {hipo.nombre}
                            </option>
                        ))}
                    </select>

                    <label className="form-label mt-2">Fecha</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="CarrFch"
                        value={formData.CarrFch || ""}
                        onChange={handleChange}
                    />

                    <label className="form-label">Número de Carrera</label>
                    <input
                        type="number"
                        className="form-control"
                        name="carrNro"
                        value={formData.carrNro || ""}
                        onChange={handleChange}
                    />

                    <label className="form-label mt-2">Número de Premio</label>
                    <input
                        type="number"
                        className="form-control"
                        name="premioNro"
                        value={formData.premioNro || ""}
                        onChange={handleChange}
                    />
                    <label className="form-label mt-2">Equino ID</label>
                    <input
                        type="number"
                        className="form-control"
                        name="EquinoId"
                        value={formData.EquinoId || ""}
                        onChange={handleChange}
                    />
                    <label className="form-label mt-2">Descarga en Kg</label>
                    <input
                        type="number"
                        className="form-control"
                        name="descarga"
                        value={formData.descarga || ""}
                        onChange={handleChange}
                    />

                </div>
            )}
        </div>
    );
};

export default XturfSQLGenerator;