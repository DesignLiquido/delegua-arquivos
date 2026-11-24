import * as caminho from 'path';
import * as os from 'os';
import * as fs from 'fs';

import {
    eArquivo,
    eDiretorio,
    caminhoAbsoluto,
    criarDiretorio,
    criarDiretorioTemporario,
    definirPermissoes,
    diretorioPai,
    diretorioPessoal,
    escreverTexto,
    existe,
    juntarCaminhos,
    lerTexto,
    listarDiretorio,
    nomeBase,
    remover,
    renomear
} from '../fontes';

const interpretador = { diretorioBase: process.cwd() };

describe('Operações de sistema de arquivos', () => {
    let raiz: string;

    beforeEach(() => {
        raiz = fs.mkdtempSync(caminho.join(os.tmpdir(), 'delegua-arquivos-teste-'));
    });

    afterEach(() => {
        fs.rmSync(raiz, { recursive: true, force: true });
    });

    it('existe()', async () => {
        expect(await existe(interpretador, raiz)).toBe(true);
        expect(await existe(interpretador, caminho.join(raiz, 'nao-existe'))).toBe(false);
        expect(await existe(interpretador, '')).toBe(false);
    });

    it('eArquivo() e eDiretorio() devolvem falso para caminho inexistente', async () => {
        const inexistente = caminho.join(raiz, 'nao-existe');
        expect(await eArquivo(interpretador, inexistente)).toBe(false);
        expect(await eDiretorio(interpretador, inexistente)).toBe(false);
        expect(await eDiretorio(interpretador, raiz)).toBe(true);
    });

    it('criarDiretorio() cria intermediários', async () => {
        const destino = caminho.join(raiz, 'a', 'b', 'c');
        expect(await criarDiretorio(interpretador, destino)).toBe(true);
        expect(fs.statSync(destino).isDirectory()).toBe(true);
        // Já existente também é sucesso.
        expect(await criarDiretorio(interpretador, destino)).toBe(true);
    });

    it('escreverTexto() e lerTexto()', async () => {
        const arquivo = caminho.join(raiz, 'texto.txt');
        expect(await escreverTexto(interpretador, arquivo, 'Olá, mundo')).toBe(true);
        expect(await lerTexto(interpretador, arquivo)).toBe('Olá, mundo');
        expect(await escreverTexto(interpretador, arquivo, 'novo')).toBe(true);
        expect(await lerTexto(interpretador, arquivo)).toBe('novo');
    });

    it('lerTexto() devolve nulo para arquivo inexistente', async () => {
        expect(await lerTexto(interpretador, caminho.join(raiz, 'nada.txt'))).toBeNull();
    });

    it('escreverTexto() falha em diretório inexistente', async () => {
        expect(await escreverTexto(interpretador, caminho.join(raiz, 'x', 'y.txt'), 'a')).toBe(false);
    });

    it('listarDiretorio() devolve nomes em ordem', async () => {
        fs.writeFileSync(caminho.join(raiz, 'b.txt'), '');
        fs.writeFileSync(caminho.join(raiz, 'a.txt'), '');
        fs.mkdirSync(caminho.join(raiz, 'c'));
        expect(await listarDiretorio(interpretador, raiz)).toEqual(['a.txt', 'b.txt', 'c']);
        expect(await listarDiretorio(interpretador, caminho.join(raiz, 'nao-existe'))).toEqual([]);
    });

    it('remover() remove arquivos e diretórios recursivamente', async () => {
        const diretorio = caminho.join(raiz, 'remover');
        fs.mkdirSync(caminho.join(diretorio, 'interno'), { recursive: true });
        fs.writeFileSync(caminho.join(diretorio, 'interno', 'arquivo.txt'), 'x');
        expect(await remover(interpretador, diretorio)).toBe(true);
        expect(fs.existsSync(diretorio)).toBe(false);
        // Remover algo inexistente é sucesso.
        expect(await remover(interpretador, diretorio)).toBe(true);
    });

    it('renomear()', async () => {
        const origem = caminho.join(raiz, 'origem.txt');
        const destino = caminho.join(raiz, 'destino.txt');
        fs.writeFileSync(origem, 'conteúdo');
        expect(await renomear(interpretador, origem, destino)).toBe(true);
        expect(fs.existsSync(origem)).toBe(false);
        expect(fs.readFileSync(destino, 'utf-8')).toBe('conteúdo');
        expect(await renomear(interpretador, origem, destino)).toBe(false);
    });

    it('criarDiretorioTemporario()', async () => {
        const criado = await criarDiretorioTemporario(interpretador, raiz, 'prefixo-');
        expect(criado).not.toBeNull();
        expect(nomeBase(interpretador, criado as string).startsWith('prefixo-')).toBe(true);
        expect(fs.statSync(criado as string).isDirectory()).toBe(true);
    });

    it('definirPermissoes()', async () => {
        const arquivo = caminho.join(raiz, 'permissoes.txt');
        fs.writeFileSync(arquivo, '');
        expect(await definirPermissoes(interpretador, arquivo, 0o644)).toBe(true);
        expect(await definirPermissoes(interpretador, caminho.join(raiz, 'nada'), 0o644)).toBe(false);
    });

    it('diretorioPessoal()', () => {
        expect(diretorioPessoal()).toBe(os.homedir());
    });
});

describe('Operações de caminhos', () => {
    it('juntarCaminhos()', () => {
        expect(juntarCaminhos(interpretador, 'a', 'b')).toBe('a' + caminho.sep + 'b');
        expect(juntarCaminhos(interpretador, 'a/', 'b')).toBe('a/b');
        expect(juntarCaminhos(interpretador, '', 'b')).toBe('b');
        expect(juntarCaminhos(interpretador, 'a', '')).toBe('a');
        const absoluto = caminho.resolve('x');
        expect(juntarCaminhos(interpretador, 'a', absoluto)).toBe(absoluto);
    });

    it('diretorioPai()', () => {
        expect(diretorioPai(interpretador, 'a/b/c.txt')).toBe('a/b');
        expect(diretorioPai(interpretador, 'a/b/')).toBe('a');
        expect(diretorioPai(interpretador, 'c.txt')).toBe('.');
        expect(diretorioPai(interpretador, '/a')).toBe('/');
        expect(diretorioPai(interpretador, '')).toBe('.');
    });

    it('nomeBase()', () => {
        expect(nomeBase(interpretador, 'a/b/c.txt')).toBe('c.txt');
        expect(nomeBase(interpretador, 'a/b/')).toBe('b');
        expect(nomeBase(interpretador, '')).toBe('');
    });

    it('caminhoAbsoluto()', () => {
        expect(caminhoAbsoluto(interpretador, 'x')).toBe(caminho.resolve('x'));
    });
});
