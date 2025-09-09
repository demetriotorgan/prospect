export function padronizarTexto(texto){
    return texto
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}