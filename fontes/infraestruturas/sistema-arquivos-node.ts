import * as caminho from 'path';
import * as os from 'os';
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

    async criarDiretorio(caminhoDiretorio: string): Promise<void> {
        await sistemaArquivos.mkdir(caminhoDiretorio, { recursive: true });
    }

    async remover(caminhoAlvo: string): Promise<void> {
        // `force`: remover algo que não existe não é erro, como na realização LLVM.
        await sistemaArquivos.rm(caminhoAlvo, { recursive: true, force: true });
    }

    async renomear(origem: string, destino: string): Promise<void> {
        await sistemaArquivos.rename(origem, destino);
    }

    async listarDiretorio(caminhoDiretorio: string): Promise<string[]> {
        return sistemaArquivos.readdir(caminhoDiretorio);
    }

    async criarDiretorioTemporario(diretorioPai: string, prefixo: string): Promise<string> {
        return sistemaArquivos.mkdtemp(caminho.join(diretorioPai, prefixo));
    }

    diretorioTemporarioSistema(): string {
        return os.tmpdir();
    }

    diretorioPessoal(): string {
        return os.homedir();
    }

    async definirPermissoes(caminhoAlvo: string, modo: number): Promise<void> {
        await sistemaArquivos.chmod(caminhoAlvo, modo);
    }

    separadorCaminhos(): string {
        return caminho.sep;
    }

    eCaminhoAbsoluto(caminhoAlvo: string): boolean {
        return caminho.isAbsolute(caminhoAlvo);
    }

    caminhoAbsoluto(caminhoAlvo: string): string {
        return caminho.resolve(caminhoAlvo);
    }
}
