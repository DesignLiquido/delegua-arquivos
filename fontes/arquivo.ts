export class Arquivo {
    caminhoArquivo: string;
    buffer: Buffer;

    constructor(caminhoArquivo: string, buffer: Buffer) {
        this.caminhoArquivo = caminhoArquivo;
        this.buffer = buffer;
    }

    paraTexto() {
        return this.buffer.toString();
    }
}
