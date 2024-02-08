import * as sistemaArquivos from 'fs';
import { Arquivo } from './arquivo';

export function abrir(caminhoArquivo: string): Arquivo {
    const buffer = sistemaArquivos.readFileSync(caminhoArquivo);
    return new Arquivo(caminhoArquivo, buffer);
}