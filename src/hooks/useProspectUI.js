// hooks/useProspectUI.js
import { useEffect, useState } from "react";

export function useProspectUI({ empresas, setOnProspect, setShowProspectController }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const empresaAtual = empresas[currentIndex] || null;

  // Efeito para scroll e ativar estado de prospecção
  useEffect(() => {
    if (!empresaAtual) return;
    const elementoH3 = document.getElementById("empresa-prospec");
    if (elementoH3) {
      elementoH3.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOnProspect(true);
  }, [empresaAtual, setOnProspect]);

  // Fechar modal de prospecção
  const handleFecharProspec = () => {
    setShowProspectController(false);
    setOnProspect(false);
  };

  return {
    currentIndex,
    setCurrentIndex,
    empresaAtual,
    handleFecharProspec,
  };
}
