import * as sistemaArquivos from 'fs';

import { Arquivo } from './arquivo';

/**
 * 
 * @param _ 
 * @param caminhoArquivo 
 * @returns 
 */
export function abrir(_: any, caminhoArquivo: string): Arquivo {
    const buffer = sistemaArquivos.readFileSync(caminhoArquivo);
    return new Arquivo(caminhoArquivo, buffer);
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