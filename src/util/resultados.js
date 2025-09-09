/**
 * Processa os resultados vindos da API após salvar empresas.
 * @param {Array} resultados - Array de objetos retornados pela API.
 * @returns {Object} - Objeto com arrays separados.
 */
export const processarResultados = (resultados) => {
  if (!Array.isArray(resultados)) {
    return {
      jaCadastradas: [],
      cadastradasComSucesso: [],
    };
  }

  const jaCadastradas = resultados
    .filter((item) => item.status === "Já esta cadastrada")
    .map((item) => item.nome);

  const cadastradasComSucesso = resultados
    .filter((item) => item.status === "Cadastrado com sucesso")
    .map((item) => item.nome);

  return {
    jaCadastradas,
    cadastradasComSucesso,
  };
};
