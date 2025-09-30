import mock from "mock-fs";

import { abrir, Arquivo } from "../fontes";

describe('Classe Arquivo', () => {
    beforeAll(() => {
        mock({
            'diretorio/de/mentirinha': {
                'arquivo-texto.txt': 'algum texto aqui',
                'diretorio-vazio': {/** diretório vazio */}
            },
            'caminho/para/algum.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
            'algum/outro/caminho': {/** outro diretório vazio */}
        });
    });

    afterAll(() => {
        mock.restore();
    });

    describe('Propriedades e métodos de Arquivo', () => {
        let arquivo: Arquivo;

        beforeAll(() => {
            arquivo = abrir({ diretorioBase: 'qualquercoisa'}, 'diretorio/de/mentirinha/arquivo-texto.txt');
        });

        it('eArquivo()', () => {
            expect(arquivo.eArquivo()).toBe(true);
        });

        it('eDiretorio()', () => {
            expect(arquivo.eDiretorio()).toBe(false);
        });

        it('paraTexto()', () => {
            expect(arquivo.paraTexto()).toBe('algum texto aqui');
        });

        it('escrever()', () => {
            arquivo.escrever(' teste um dois');
            arquivo.recarregar();
            expect(arquivo.paraTexto()).toBe('algum texto aqui teste um dois');
        });

        it('sobrescrever()', () => {
            arquivo.sobrescrever('teste um dois');
            arquivo.recarregar();
            expect(arquivo.paraTexto()).toBe('teste um dois');
        });
    });
});