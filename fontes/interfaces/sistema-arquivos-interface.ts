/**
 * Abstrai as operações de sistema de arquivos usadas por este módulo, para que uma
 * implementação diferente da padrão em Node.js (por exemplo, baseada na API do VSCode)
 * possa ser injetada por quem consome este pacote.
 */
export interface SistemaArquivosInterface {
    lerArquivo(caminhoArquivo: string): Promise<Buffer>;
    escreverArquivo(caminhoArquivo: string, conteudo: string): Promise<void>;
    anexarArquivo(caminhoArquivo: string, conteudo: string): Promise<void>;
    existeArquivo(caminho: string): Promise<boolean>;
    obterInformacoes(caminho: string): Promise<{ eArquivo: boolean; eDiretorio: boolean }>;
    diretorioAtual(): string;
    resolverCaminho(diretorioBaseInterpretador: string, caminhoDiretorioOuArquivo: string): string;

    /** Cria o diretório e todos os diretórios intermediários que faltarem. */
    criarDiretorio(caminhoDiretorio: string): Promise<void>;
    /** Remove um arquivo, ou um diretório com todo o seu conteúdo. */
    remover(caminho: string): Promise<void>;
    renomear(origem: string, destino: string): Promise<void>;
    /** Nomes das entradas do diretório (sem `.` e `..`). */
    listarDiretorio(caminhoDiretorio: string): Promise<string[]>;
    /** Cria um diretório temporário único dentro de `diretorioPai` e devolve o caminho dele. */
    criarDiretorioTemporario(diretorioPai: string, prefixo: string): Promise<string>;
    diretorioTemporarioSistema(): string;
    diretorioPessoal(): string;
    definirPermissoes(caminho: string, modo: number): Promise<void>;
    separadorCaminhos(): string;
    eCaminhoAbsoluto(caminho: string): boolean;
    caminhoAbsoluto(caminho: string): string;
}
