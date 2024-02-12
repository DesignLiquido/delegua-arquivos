import * as sistemaArquivos from 'fs';

import { Arquivo } from './arquivo';

export function abrir(caminhoArquivo: string): Arquivo {
    const buffer = sistemaArquivos.readFileSync(caminhoArquivo);
    return new Arquivo(caminhoArquivo, buffer);
}

export function diretorioAtual(): string {
    return process.cwd();
}

export function diretorioExiste(caminhoDiretorio: string): boolean {
    return sistemaArquivos.existsSync(caminhoDiretorio);
}

export function eArquivo(caminhoArquivo: string): boolean {
    return sistemaArquivos.lstatSync(caminhoArquivo).isFile();
}

export function eDiretorio(caminhoArquivo: string): boolean {
    return sistemaArquivos.lstatSync(caminhoArquivo).isDirectory();
}

export * from './arquivo';