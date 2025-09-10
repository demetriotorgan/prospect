const resumoStatus = (empresas) => {
  return empresas.reduce((acc, empresa) => {
    const status = empresa.statusAtual;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
};

export default resumoStatus;
