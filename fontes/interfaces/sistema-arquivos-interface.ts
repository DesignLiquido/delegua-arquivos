/**
 * Abstrai as operações de sistema de arquivos usadas por este módulo, para que uma
 * implementação diferente da padrão em Node.js (por exemplo, baseada na API do VSCode)
 * possa ser injetada por quem consome este pacote.
 */
export interface SistemaArquivosInterface {
    lerArquivo(caminhoArquivo: string): Buffer;
    escreverArquivo(caminhoArquivo: string, conteudo: string): void;
    anexarArquivo(caminhoArquivo: string, conteudo: string): void;
    existeArquivo(caminho: string): boolean;
    obterInformacoes(caminho: string): { eArquivo: boolean; eDiretorio: boolean };
    diretorioAtual(): string;
    resolverCaminho(diretorioBaseInterpretador: string, caminhoDiretorioOuArquivo: string): string;
}
