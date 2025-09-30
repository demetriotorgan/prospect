import { formatDistance, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";

export function horarioDeAgendamento(reuniao) {
  const agora = new Date();
  const dataReuniao = new Date(reuniao.dataTime);

  const dias = String(reuniao.diasRestantes).toLowerCase();

  // Caso especial: reunião marcada para hoje
  if (dias === "hoje") {
    if (isBefore(dataReuniao, agora)) {
      // Já passou o horário
      return { texto: "Atrasada", classe: "atrasada" };
    } else {
      // Ainda vai acontecer hoje → mostra diferença em horas/minutos
      const distancia = formatDistance(dataReuniao, agora, { locale: ptBR });
      return { texto: `Restam ${distancia}`, classe: "" };
    }
  }

  // Caso o tempo já passou (diasRestantes < 0)
  if (Number(reuniao.diasRestantes) < 0) {
    return { texto: "Atrasada", classe: "atrasada" };
  }

  // Caso padrão: dias restantes
  return { texto: `Faltam ${reuniao.diasRestantes} dias`, classe: "" };
}
