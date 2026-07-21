import { Arquivo } from './arquivo';
import { SistemaArquivosNode } from './infraestruturas/sistema-arquivos-node';
import { ServicoArquivos } from './servico-arquivos';

const servicoArquivosPadrao = new ServicoArquivos(new SistemaArquivosNode());

/**
 * Abre um arquivo, lê o conteúdo dele, e retorna um descritor dele.
 * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
 * @param caminhoArquivo O caminho do arquivo.
 * @returns Um descritor para o arquivo.
 */
export function abrir(interpretador: { diretorioBase: string }, caminhoArquivo: string): Arquivo {
    return servicoArquivosPadrao.abrir(interpretador, caminhoArquivo);
}

/**
 *
 * @returns
 */
export function diretorioAtual(): string {
    return servicoArquivosPadrao.diretorioAtual();
}

/**
 *
 * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
 * @param caminhoDiretorio O caminho do diretório
 * @returns `true` se o diretório existe, e `false` em caso contrário.
 */
export function diretorioExiste(interpretador: { diretorioBase: string }, caminhoDiretorio: string): boolean {
    return servicoArquivosPadrao.diretorioExiste(interpretador, caminhoDiretorio);
}

/**
 *
 * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
 * @param caminhoArquivoOuDiretorio O caminho a ser testado.
 * @returns
 */
export function eArquivo(interpretador: { diretorioBase: string }, caminhoArquivoOuDiretorio: string): boolean {
    return servicoArquivosPadrao.eArquivo(interpretador, caminhoArquivoOuDiretorio);
}

/**
 *
 * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
 * @param caminhoArquivoOuDiretorio O caminho a ser testado.
 * @returns
 */
export function eDiretorio(interpretador: { diretorioBase: string }, caminhoArquivoOuDiretorio: string): boolean {
    return servicoArquivosPadrao.eDiretorio(interpretador, caminhoArquivoOuDiretorio);
}

export * from './arquivo';
export * from './interfaces';
export * from './infraestruturas';
export * from './servico-arquivos';
