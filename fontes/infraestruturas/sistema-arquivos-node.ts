import * as caminho from 'path';
import { promises as sistemaArquivos } from 'fs';

import { SistemaArquivosInterface } from '../interfaces/sistema-arquivos-interface';

/**
 * Implementação padrão de `SistemaArquivosInterface`, baseada nas APIs assíncronas do Node.js.
 */
export class SistemaArquivosNode implements SistemaArquivosInterface {
    async lerArquivo(caminhoArquivo: string): Promise<Buffer> {
        return sistemaArquivos.readFile(caminhoArquivo);
    }

    async escreverArquivo(caminhoArquivo: string, conteudo: string): Promise<void> {
        await sistemaArquivos.writeFile(caminhoArquivo, conteudo);
    }

    async anexarArquivo(caminhoArquivo: string, conteudo: string): Promise<void> {
        await sistemaArquivos.appendFile(caminhoArquivo, conteudo);
    }

    async existeArquivo(caminhoAlvo: string): Promise<boolean> {
        try {
            await sistemaArquivos.access(caminhoAlvo);
            return true;
        } catch {
            return false;
        }
    }

    async obterInformacoes(caminhoAlvo: string): Promise<{ eArquivo: boolean; eDiretorio: boolean }> {
        const informacoes = await sistemaArquivos.lstat(caminhoAlvo);
        return {
            eArquivo: informacoes.isFile(),
            eDiretorio: informacoes.isDirectory()
        };
    }

    diretorioAtual(): string {
        return process.cwd();
    }

    resolverCaminho(diretorioBaseInterpretador: string, caminhoDiretorioOuArquivo: string): string {
        if (caminhoDiretorioOuArquivo.startsWith('.')) {
            return caminho.join(diretorioBaseInterpretador, caminhoDiretorioOuArquivo);
        }

        return caminhoDiretorioOuArquivo;
    }
}
