import * as caminho from 'path';
import * as sistemaArquivos from 'fs';

import { Arquivo } from './arquivo';

/**
 * Abre um arquivo, lê o conteúdo dele, e retorna um descritor dele.
 * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
 * @param caminhoArquivo O caminho do arquivo.
 * @returns Um descritor para o arquivo.
 */
export function abrir(interpretador: { diretorioBase: string }, caminhoArquivo: string): Arquivo {
    let caminhoArquivoResolvido = caminhoArquivo;
    if (caminhoArquivo.startsWith('.')) {
        caminhoArquivoResolvido = caminho.join(interpretador.diretorioBase, caminhoArquivo);
    }
    
    const buffer = sistemaArquivos.readFileSync(caminhoArquivoResolvido);
    return new Arquivo(caminhoArquivoResolvido, buffer);
}

/**
 * 
 * @returns 
 */
export function diretorioAtual(): string {
    return process.cwd();
}

/**
 * 
 * @param _ 
 * @param caminhoDiretorio 
 * @returns 
 */
export function diretorioExiste(_: any, caminhoDiretorio: string): boolean {
    return sistemaArquivos.existsSync(caminhoDiretorio);
}

/**
 * 
 * @param _ 
 * @param caminhoArquivo 
 * @returns 
 */
export function eArquivo(_: any, caminhoArquivo: string): boolean {
    return sistemaArquivos.lstatSync(caminhoArquivo).isFile();
}

/**
 * 
 * @param _ 
 * @param caminhoArquivo 
 * @returns 
 */
export function eDiretorio(_: any, caminhoArquivo: string): boolean {
    return sistemaArquivos.lstatSync(caminhoArquivo).isDirectory();
}

export * from './arquivo';