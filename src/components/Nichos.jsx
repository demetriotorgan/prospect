import React, { useState } from "react";
import "../styles/Nicho.css";

const NichoForm = ({ onSave }) => {
  const [nicho, setNicho] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nicho.trim()) return;
    onSave(nicho);
    setNicho("");
  };

  return (
    <form className="nicho-form" onSubmit={handleSubmit}>
      <label htmlFor="nicho">Cadastrar Nicho</label>
      <input
        type="text"
        id="nicho"
        value={nicho}
        onChange={(e) => setNicho(e.target.value)}
        placeholder="Digite o nicho..."
      />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default NichoForm;
