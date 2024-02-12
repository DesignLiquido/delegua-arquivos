import * as sistemaArquivos from 'fs';

export class Arquivo {
    caminhoArquivo: string;
    buffer: Buffer;
    stat: sistemaArquivos.Stats;

    constructor(caminhoArquivo: string, buffer: Buffer) {
        this.caminhoArquivo = caminhoArquivo;
        this.buffer = buffer;
        this.stat = sistemaArquivos.lstatSync(caminhoArquivo);
    }

    eArquivo(): boolean {
        return this.stat.isFile();
    }

    eDiretorio(): boolean {
        return this.stat.isDirectory();
    }

    escrever(conteudo: string): void {
        sistemaArquivos.writeFileSync(this.caminhoArquivo, conteudo);
    }

    paraTexto() {
        return this.buffer.toString();
    }
}
