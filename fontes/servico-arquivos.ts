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
        try {
            const informacoes = await this.sistemaArquivos.obterInformacoes(caminhoResolvido);
            return informacoes.eArquivo;
        } catch {
            // Caminho inexistente ou inacessível não é um arquivo (como na realização LLVM).
            return false;
        }
    }

    /**
     * @param interpretador A instância do interpretador, que tem por padrão um `diretorioBase` definido.
     * @param caminhoArquivoOuDiretorio O caminho a ser testado.
     */
    async eDiretorio(interpretador: { diretorioBase: string }, caminhoArquivoOuDiretorio: string): Promise<boolean> {
        const caminhoResolvido = this.sistemaArquivos.resolverCaminho(interpretador.diretorioBase, caminhoArquivoOuDiretorio);
        try {
            const informacoes = await this.sistemaArquivos.obterInformacoes(caminhoResolvido);
            return informacoes.eDiretorio;
        } catch {
            // Caminho inexistente ou inacessível não é um diretório (como na realização LLVM).
            return false;
        }
    }

    // As operações abaixo têm a mesma interface do módulo `arquivos` da realização LLVM:
    // falhas não levantam erro; operações devolvem `verdadeiro` em caso de sucesso,
    // `nulo` (texto) ou vetor vazio (listagem).

    private resolver(interpretador: { diretorioBase: string } | undefined, caminho: string): string {
        return this.sistemaArquivos.resolverCaminho(interpretador?.diretorioBase ?? this.diretorioAtual(), String(caminho));
    }

    private caminhoValido(caminho: any): boolean {
        return caminho !== null && caminho !== undefined && String(caminho) !== '';
    }

    /** @returns `true` se o arquivo ou diretório existe. */
    async existe(interpretador: { diretorioBase: string }, caminho: string): Promise<boolean> {
        if (!this.caminhoValido(caminho)) return false;
        return this.sistemaArquivos.existeArquivo(this.resolver(interpretador, caminho));
    }

    /** Cria o diretório, incluindo os intermediários. @returns `true` se o diretório existe ao final. */
    async criarDiretorio(interpretador: { diretorioBase: string }, caminho: string): Promise<boolean> {
        if (!this.caminhoValido(caminho)) return false;
        try {
            await this.sistemaArquivos.criarDiretorio(this.resolver(interpretador, caminho));
            return true;
        } catch {
            return false;
        }
    }

    /** Remove um arquivo, ou um diretório recursivamente. Remover algo inexistente é sucesso. */
    async remover(interpretador: { diretorioBase: string }, caminho: string): Promise<boolean> {
        if (!this.caminhoValido(caminho)) return false;
        try {
            await this.sistemaArquivos.remover(this.resolver(interpretador, caminho));
            return true;
        } catch {
            return false;
        }
    }

    async renomear(interpretador: { diretorioBase: string }, origem: string, destino: string): Promise<boolean> {
        if (!this.caminhoValido(origem) || !this.caminhoValido(destino)) return false;
        try {
            await this.sistemaArquivos.renomear(this.resolver(interpretador, origem), this.resolver(interpretador, destino));
            return true;
        } catch {
            return false;
        }
    }

    /** @returns Os nomes das entradas do diretório, em ordem; vetor vazio se o diretório não puder ser lido. */
    async listarDiretorio(interpretador: { diretorioBase: string }, caminho: string): Promise<string[]> {
        if (!this.caminhoValido(caminho)) return [];
        try {
            const nomes = await this.sistemaArquivos.listarDiretorio(this.resolver(interpretador, caminho));
            return nomes.filter((nome) => nome !== '.' && nome !== '..').sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
        } catch {
            return [];
        }
    }

    /**
     * Cria um diretório temporário único.
     * @param diretorioPai Onde criar; vazio ou nulo usa o diretório temporário do sistema.
     * @param prefixo Início do nome; vazio ou nulo usa `delegua-`.
     * @returns O caminho criado, ou `null` em caso de falha.
     */
    async criarDiretorioTemporario(interpretador: { diretorioBase: string }, diretorioPai: string, prefixo: string): Promise<string | null> {
        const base = this.caminhoValido(diretorioPai)
            ? this.resolver(interpretador, diretorioPai)
            : this.sistemaArquivos.diretorioTemporarioSistema();
        const inicio = this.caminhoValido(prefixo) ? String(prefixo) : 'delegua-';
        try {
            return await this.sistemaArquivos.criarDiretorioTemporario(base, inicio);
        } catch {
            return null;
        }
    }

    diretorioPessoal(): string | null {
        try {
            return this.sistemaArquivos.diretorioPessoal() || null;
        } catch {
            return null;
        }
    }

    /** @returns O conteúdo do arquivo como texto (UTF-8), ou `null` se não puder ser lido. */
    async lerTexto(interpretador: { diretorioBase: string }, caminho: string): Promise<string | null> {
        if (!this.caminhoValido(caminho)) return null;
        try {
            const buffer = await this.sistemaArquivos.lerArquivo(this.resolver(interpretador, caminho));
            return buffer.toString('utf-8');
        } catch {
            return null;
        }
    }

    /** Escreve (sobrescrevendo) o texto no arquivo. @returns `true` em caso de sucesso. */
    async escreverTexto(interpretador: { diretorioBase: string }, caminho: string, conteudo: string): Promise<boolean> {
        if (!this.caminhoValido(caminho)) return false;
        try {
            await this.sistemaArquivos.escreverArquivo(
                this.resolver(interpretador, caminho),
                conteudo === null || conteudo === undefined ? '' : String(conteudo)
            );
            return true;
        } catch {
            return false;
        }
    }

    async definirPermissoes(interpretador: { diretorioBase: string }, caminho: string, modo: number): Promise<boolean> {
        if (!this.caminhoValido(caminho)) return false;
        try {
            await this.sistemaArquivos.definirPermissoes(this.resolver(interpretador, caminho), Number(modo));
            return true;
        } catch {
            return false;
        }
    }

    // ── Caminhos (operações puramente textuais, como na realização LLVM) ──

    private eSeparador(caractere: string): boolean {
        return caractere === '/' || (this.sistemaArquivos.separadorCaminhos() === '\\' && caractere === '\\');
    }

    /** Junta `parte` a `base`. Se `parte` é absoluta, ela é devolvida como está. */
    juntarCaminhos(base: string, parte: string): string {
        const textoBase = base === null || base === undefined ? '' : String(base);
        const textoParte = parte === null || parte === undefined ? '' : String(parte);
        if (textoBase === '') return textoParte;
        if (textoParte === '') return textoBase;
        if (this.sistemaArquivos.eCaminhoAbsoluto(textoParte)) return textoParte;
        const precisaSeparador = !this.eSeparador(textoBase[textoBase.length - 1]);
        return textoBase + (precisaSeparador ? this.sistemaArquivos.separadorCaminhos() : '') + textoParte;
    }

    /** @returns O diretório que contém `caminho`, ou `.` se não houver separador. */
    diretorioPai(caminho: string): string {
        const texto = caminho === null || caminho === undefined ? '' : String(caminho);
        if (texto === '') return '.';
        let tamanho = texto.length;
        while (tamanho > 1 && this.eSeparador(texto[tamanho - 1])) tamanho--;
        while (tamanho > 0 && !this.eSeparador(texto[tamanho - 1])) tamanho--;
        if (tamanho === 0) return '.';
        // Remove o separador final, mas mantém a raiz ("/" ou "C:\").
        while (tamanho > 1 && this.eSeparador(texto[tamanho - 1]) && !(tamanho === 3 && texto[1] === ':')) tamanho--;
        return texto.substring(0, tamanho);
    }

    /** @returns O último componente de `caminho`, ignorando separadores finais. */
    nomeBase(caminho: string): string {
        const texto = caminho === null || caminho === undefined ? '' : String(caminho);
        if (texto === '') return '';
        let tamanho = texto.length;
        while (tamanho > 1 && this.eSeparador(texto[tamanho - 1])) tamanho--;
        let inicio = tamanho;
        while (inicio > 0 && !this.eSeparador(texto[inicio - 1])) inicio--;
        return texto.substring(inicio, tamanho);
    }

    caminhoAbsoluto(interpretador: { diretorioBase: string }, caminho: string): string | null {
        if (caminho === null || caminho === undefined) return null;
        return this.sistemaArquivos.caminhoAbsoluto(this.resolver(interpretador, caminho));
    }
}
