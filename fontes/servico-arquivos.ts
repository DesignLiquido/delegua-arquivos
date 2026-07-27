import { Arquivo } from './arquivo';
import { SistemaArquivosInterface } from './interfaces/sistema-arquivos-interface';

/**
 * Reúne as operações do módulo `arquivos` sobre um `SistemaArquivosInterface` injetado,
 * em vez de acessar `fs`/`path` diretamente.
 */
export class ServicoArquivos {
    constructor(private sistemaArquivos: SistemaArquivosInterface) {}

    /**
     * Abre um arquivo, lê o conteúdo dele, e retorna um descritor dele.
     * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
     * @param caminhoArquivo O caminho do arquivo.
     * @returns Um descritor para o arquivo.
     */
    async abrir(interpretador: { diretorioBase: string }, caminhoArquivo: string): Promise<Arquivo> {
        const caminhoArquivoResolvido = this.sistemaArquivos.resolverCaminho(interpretador.diretorioBase, caminhoArquivo);
        const buffer = await this.sistemaArquivos.lerArquivo(caminhoArquivoResolvido);
        const informacoes = await this.sistemaArquivos.obterInformacoes(caminhoArquivoResolvido);
        return new Arquivo(caminhoArquivoResolvido, buffer, informacoes, this.sistemaArquivos);
    }

    diretorioAtual(): string {
        return this.sistemaArquivos.diretorioAtual();
    }

    /**
     * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
     * @param caminhoDiretorio O caminho do diretório
     * @returns `true` se o diretório existe, e `false` em caso contrário.
     */
    async diretorioExiste(interpretador: { diretorioBase: string }, caminhoDiretorio: string): Promise<boolean> {
        const caminhoDiretorioResolvido = this.sistemaArquivos.resolverCaminho(interpretador.diretorioBase, caminhoDiretorio);
        return this.sistemaArquivos.existeArquivo(caminhoDiretorioResolvido);
    }

    /**
     * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
     * @param caminhoArquivoOuDiretorio O caminho a ser testado.
     */
    async eArquivo(interpretador: { diretorioBase: string }, caminhoArquivoOuDiretorio: string): Promise<boolean> {
        const caminhoResolvido = this.sistemaArquivos.resolverCaminho(interpretador.diretorioBase, caminhoArquivoOuDiretorio);
        const informacoes = await this.sistemaArquivos.obterInformacoes(caminhoResolvido);
        return informacoes.eArquivo;
    }

    /**
     * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
     * @param caminhoArquivoOuDiretorio O caminho a ser testado.
     */
    async eDiretorio(interpretador: { diretorioBase: string }, caminhoArquivoOuDiretorio: string): Promise<boolean> {
        const caminhoResolvido = this.sistemaArquivos.resolverCaminho(interpretador.diretorioBase, caminhoArquivoOuDiretorio);
        const informacoes = await this.sistemaArquivos.obterInformacoes(caminhoResolvido);
        return informacoes.eDiretorio;
    }
}
