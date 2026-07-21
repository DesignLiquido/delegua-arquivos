import * as caminho from 'path';
import * as sistemaArquivos from 'fs';

import { SistemaArquivosInterface } from '../interfaces/sistema-arquivos-interface';

/**
 * Implementação padrão de `SistemaArquivosInterface`, baseada nas APIs síncronas do Node.js.
 */
export class SistemaArquivosNode implements SistemaArquivosInterface {
    lerArquivo(caminhoArquivo: string): Buffer {
        return sistemaArquivos.readFileSync(caminhoArquivo);
    }

    escreverArquivo(caminhoArquivo: string, conteudo: string): void {
        sistemaArquivos.writeFileSync(caminhoArquivo, conteudo);
    }

    anexarArquivo(caminhoArquivo: string, conteudo: string): void {
        sistemaArquivos.appendFileSync(caminhoArquivo, conteudo);
    }

    existeArquivo(caminhoAlvo: string): boolean {
        return sistemaArquivos.existsSync(caminhoAlvo);
    }

    obterInformacoes(caminhoAlvo: string): { eArquivo: boolean; eDiretorio: boolean } {
        const informacoes = sistemaArquivos.lstatSync(caminhoAlvo);
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
