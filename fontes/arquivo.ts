import { SistemaArquivosInterface } from './interfaces/sistema-arquivos-interface';
import { SistemaArquivosNode } from './infraestruturas/sistema-arquivos-node';

/**
 * Representa um arquivo no sistema de arquivos.
 */
export class Arquivo {
    caminhoArquivo: string;
    buffer: Buffer;

    private sistemaArquivos: SistemaArquivosInterface;
    private informacoes: { eArquivo: boolean; eDiretorio: boolean };

    constructor(
        caminhoArquivo: string,
        buffer: Buffer,
        informacoes: { eArquivo: boolean; eDiretorio: boolean },
        sistemaArquivos: SistemaArquivosInterface = new SistemaArquivosNode()
    ) {
        this.caminhoArquivo = caminhoArquivo;
        this.buffer = buffer;
        this.sistemaArquivos = sistemaArquivos;
        this.informacoes = informacoes;
    }

    /**
     * Método que verifica se a entrada do sistema de arquivos é um arquivo regular.
     * @returns {boolean} Verdadeiro se for um arquivo, falso caso contrário.
     */
    eArquivo(): boolean {
        return this.informacoes.eArquivo;
    }

    /**
     * Método que verifica se a entrada do sistema de arquivos é um diretório.
     * @returns {boolean} Verdadeiro se for um diretório, falso caso contrário.
     */
    eDiretorio(): boolean {
        return this.informacoes.eDiretorio;
    }

    /**
     * Escreve em um arquivo um conteúdo, adicionando ao conteúdo existente.
     * @param {string} conteudo O conteúdo a ser escrito no arquivo.
     */
    async escrever(conteudo: string): Promise<void> {
        await this.sistemaArquivos.anexarArquivo(this.caminhoArquivo, conteudo);
    }

    /**
     * Converte o conteúdo do arquivo para texto.
     * @returns {string} O conteúdo do arquivo como texto.
     */
    paraTexto(): string {
        return this.buffer.toString().replace(/\r\n/g, '\n');
    }

    /**
     * Recarrega o conteúdo do arquivo a partir do sistema de arquivos.
     */
    async recarregar(): Promise<void> {
        this.buffer = await this.sistemaArquivos.lerArquivo(this.caminhoArquivo);
    }

    /**
     * Sobrescreve o conteúdo do arquivo com o conteúdo fornecido.
     * @param {string} conteudo O novo conteúdo a ser escrito no arquivo.
     */
    async sobrescrever(conteudo: string): Promise<void> {
        await this.sistemaArquivos.escreverArquivo(this.caminhoArquivo, conteudo);
    }
}
