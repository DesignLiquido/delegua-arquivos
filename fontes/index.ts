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
export async function abrir(interpretador: { diretorioBase: string }, caminhoArquivo: string): Promise<Arquivo> {
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
export async function diretorioExiste(interpretador: { diretorioBase: string }, caminhoDiretorio: string): Promise<boolean> {
    return servicoArquivosPadrao.diretorioExiste(interpretador, caminhoDiretorio);
}

/**
 *
 * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
 * @param caminhoArquivoOuDiretorio O caminho a ser testado.
 * @returns
 */
export async function eArquivo(interpretador: { diretorioBase: string }, caminhoArquivoOuDiretorio: string): Promise<boolean> {
    return servicoArquivosPadrao.eArquivo(interpretador, caminhoArquivoOuDiretorio);
}

/**
 *
 * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
 * @param caminhoArquivoOuDiretorio O caminho a ser testado.
 * @returns
 */
export async function eDiretorio(interpretador: { diretorioBase: string }, caminhoArquivoOuDiretorio: string): Promise<boolean> {
    return servicoArquivosPadrao.eDiretorio(interpretador, caminhoArquivoOuDiretorio);
}

// Operações com a mesma interface do módulo `arquivos` da realização LLVM.
type Interpretador = { diretorioBase: string };

export async function existe(interpretador: Interpretador, caminho: string): Promise<boolean> {
    return servicoArquivosPadrao.existe(interpretador, caminho);
}

export async function criarDiretorio(interpretador: Interpretador, caminho: string): Promise<boolean> {
    return servicoArquivosPadrao.criarDiretorio(interpretador, caminho);
}

export async function remover(interpretador: Interpretador, caminho: string): Promise<boolean> {
    return servicoArquivosPadrao.remover(interpretador, caminho);
}

export async function renomear(interpretador: Interpretador, origem: string, destino: string): Promise<boolean> {
    return servicoArquivosPadrao.renomear(interpretador, origem, destino);
}

export async function listarDiretorio(interpretador: Interpretador, caminho: string): Promise<string[]> {
    return servicoArquivosPadrao.listarDiretorio(interpretador, caminho);
}

export async function criarDiretorioTemporario(interpretador: Interpretador, diretorioPai: string, prefixo: string): Promise<string | null> {
    return servicoArquivosPadrao.criarDiretorioTemporario(interpretador, diretorioPai, prefixo);
}

export function diretorioPessoal(): string | null {
    return servicoArquivosPadrao.diretorioPessoal();
}

export async function lerTexto(interpretador: Interpretador, caminho: string): Promise<string | null> {
    return servicoArquivosPadrao.lerTexto(interpretador, caminho);
}

export async function escreverTexto(interpretador: Interpretador, caminho: string, conteudo: string): Promise<boolean> {
    return servicoArquivosPadrao.escreverTexto(interpretador, caminho, conteudo);
}

export async function definirPermissoes(interpretador: Interpretador, caminho: string, modo: number): Promise<boolean> {
    return servicoArquivosPadrao.definirPermissoes(interpretador, caminho, modo);
}

export function juntarCaminhos(_interpretador: Interpretador, base: string, parte: string): string {
    return servicoArquivosPadrao.juntarCaminhos(base, parte);
}

export function diretorioPai(_interpretador: Interpretador, caminho: string): string {
    return servicoArquivosPadrao.diretorioPai(caminho);
}

export function nomeBase(_interpretador: Interpretador, caminho: string): string {
    return servicoArquivosPadrao.nomeBase(caminho);
}

export function caminhoAbsoluto(interpretador: Interpretador, caminho: string): string | null {
    return servicoArquivosPadrao.caminhoAbsoluto(interpretador, caminho);
}

export * from './arquivo';
export * from './interfaces';
export * from './infraestruturas';
export * from './servico-arquivos';
