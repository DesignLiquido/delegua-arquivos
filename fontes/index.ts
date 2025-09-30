import * as caminho from 'path';
import * as sistemaArquivos from 'fs';

import { Arquivo } from './arquivo';

function logicaComumResolucaoCaminho(diretorioBaseInterpretador: string, caminhoDiretorioOuArquivo: string) {
    let caminhoResolvido = caminhoDiretorioOuArquivo;
    if (caminhoDiretorioOuArquivo.startsWith('.')) {
        caminhoResolvido = caminho.join(diretorioBaseInterpretador, caminhoDiretorioOuArquivo);
    }

    return caminhoResolvido;
}

/**
 * Abre um arquivo, lê o conteúdo dele, e retorna um descritor dele.
 * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
 * @param caminhoArquivo O caminho do arquivo.
 * @returns Um descritor para o arquivo.
 */
export function abrir(interpretador: { diretorioBase: string }, caminhoArquivo: string): Arquivo {
    const caminhoArquivoResolvido = logicaComumResolucaoCaminho(interpretador.diretorioBase, caminhoArquivo);    
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
 * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido. 
 * @param caminhoDiretorio O caminho do diretório
 * @returns `true` se o diretório existe, e `false` em caso contrário.
 */
export function diretorioExiste(interpretador: { diretorioBase: string }, caminhoDiretorio: string): boolean {
    const caminhoDiretorioResolvido = logicaComumResolucaoCaminho(interpretador.diretorioBase, caminhoDiretorio);
    return sistemaArquivos.existsSync(caminhoDiretorioResolvido);
}

/**
 * 
 * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido. 
 * @param caminhoArquivoOuDiretorio O caminho a ser testado.
 * @returns 
 */
export function eArquivo(interpretador: { diretorioBase: string }, caminhoArquivoOuDiretorio: string): boolean {
    const caminhoResolvido = logicaComumResolucaoCaminho(interpretador.diretorioBase, caminhoArquivoOuDiretorio);
    return sistemaArquivos.lstatSync(caminhoResolvido).isFile();
}

/**
 * 
 * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido. 
 * @param caminhoArquivoOuDiretorio O caminho a ser testado.
 * @returns 
 */
export function eDiretorio(interpretador: { diretorioBase: string }, caminhoArquivoOuDiretorio: string): boolean {
    const caminhoResolvido = logicaComumResolucaoCaminho(interpretador.diretorioBase, caminhoArquivoOuDiretorio);
    return sistemaArquivos.lstatSync(caminhoResolvido).isDirectory();
}

export * from './arquivo';