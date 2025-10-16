import * as sistemaArquivos from 'fs';

/**
 * Representa um arquivo no sistema de arquivos.
 */
export class Arquivo {
    caminhoArquivo: string;
    buffer: Buffer;
    stat: sistemaArquivos.Stats;

    constructor(caminhoArquivo: string, buffer: Buffer) {
        this.caminhoArquivo = caminhoArquivo;
        this.buffer = buffer;
        this.stat = sistemaArquivos.lstatSync(caminhoArquivo);
    }

    /**
     * Método que verifica se a entrada do sistema de arquivos é um arquivo regular.
     * @returns {boolean} Verdadeiro se for um arquivo, falso caso contrário.
     */
    eArquivo(): boolean {
        return this.stat.isFile();
    }

    /**
     * Método que verifica se a entrada do sistema de arquivos é um diretório.
     * @returns {boolean} Verdadeiro se for um diretório, falso caso contrário.
     */
    eDiretorio(): boolean {
        return this.stat.isDirectory();
    }

    /**
     * Escreve em um arquivo um conteúdo, adicionando ao conteúdo existente.
     * @param {string} conteudo O conteúdo a ser escrito no arquivo.
     */
    escrever(conteudo: string): void {
        sistemaArquivos.appendFileSync(this.caminhoArquivo, conteudo);
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
    recarregar() {
        this.buffer = sistemaArquivos.readFileSync(this.caminhoArquivo);
    }

    /**
     * Sobrescreve o conteúdo do arquivo com o conteúdo fornecido.
     * @param {string} conteudo O novo conteúdo a ser escrito no arquivo.
     */
    sobrescrever(conteudo: string): void {
        sistemaArquivos.writeFileSync(this.caminhoArquivo, conteudo);
    }
}
