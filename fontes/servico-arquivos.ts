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
    abrir(interpretador: { diretorioBase: string }, caminhoArquivo: string): Arquivo {
        const caminhoArquivoResolvido = this.sistemaArquivos.resolverCaminho(interpretador.diretorioBase, caminhoArquivo);
        const buffer = this.sistemaArquivos.lerArquivo(caminhoArquivoResolvido);
        return new Arquivo(caminhoArquivoResolvido, buffer, this.sistemaArquivos);
    }

    diretorioAtual(): string {
        return this.sistemaArquivos.diretorioAtual();
    }

    /**
     * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
     * @param caminhoDiretorio O caminho do diretório
     * @returns `true` se o diretório existe, e `false` em caso contrário.
     */
    diretorioExiste(interpretador: { diretorioBase: string }, caminhoDiretorio: string): boolean {
        const caminhoDiretorioResolvido = this.sistemaArquivos.resolverCaminho(interpretador.diretorioBase, caminhoDiretorio);
        return this.sistemaArquivos.existeArquivo(caminhoDiretorioResolvido);
    }

    /**
     * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
     * @param caminhoArquivoOuDiretorio O caminho a ser testado.
     */
    eArquivo(interpretador: { diretorioBase: string }, caminhoArquivoOuDiretorio: string): boolean {
        const caminhoResolvido = this.sistemaArquivos.resolverCaminho(interpretador.diretorioBase, caminhoArquivoOuDiretorio);
        return this.sistemaArquivos.obterInformacoes(caminhoResolvido).eArquivo;
    }

    /**
     * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
     * @param caminhoArquivoOuDiretorio O caminho a ser testado.
     */
    eDiretorio(interpretador: { diretorioBase: string }, caminhoArquivoOuDiretorio: string): boolean {
        const caminhoResolvido = this.sistemaArquivos.resolverCaminho(interpretador.diretorioBase, caminhoArquivoOuDiretorio);
        return this.sistemaArquivos.obterInformacoes(caminhoResolvido).eDiretorio;
    }
}
