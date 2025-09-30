import mock from "mock-fs";

import { abrir, diretorioAtual, diretorioExiste, eArquivo, eDiretorio } from "../fontes";

describe('Casos de sucesso', () => {

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

    describe('abrir()', () => {
        it('Caminho absoluto', () => {
            const arquivo = abrir({ diretorioBase: 'qualquercoisa'}, "caminho/para/algum.png");
            expect(arquivo).toBeDefined();
            expect(arquivo.buffer).toHaveLength(7);
        });

        it('Caminho relativo', () => {
            const arquivo = abrir({ diretorioBase: 'caminho'}, "./para/algum.png");
            expect(arquivo).toBeDefined();
            expect(arquivo.buffer).toHaveLength(7);
        });
    });

    describe('diretorioAtual()', () => {
        it('Trivial', () => {
            const resultado = diretorioAtual();
            expect(resultado).toBeDefined();
        });
    });

    describe('diretorioExiste()', () => {
        it('Trivial', () => {
            const resultado = diretorioExiste(undefined, "diretorio/de/mentirinha");
            expect(resultado).toBeTruthy();
        });

        it('Falso', () => {
            const resultado = diretorioExiste(undefined, "diretorio/nao/existente");
            expect(resultado).toBeFalsy();
        });
    });

    describe('eArquivo()', () => {
        it('Trivial', () => {
            const resultado = eArquivo(undefined, "diretorio/de/mentirinha/arquivo-texto.txt");
            expect(resultado).toBeTruthy();
        });

        it('Diretório', () => {
            const resultado = eArquivo(undefined, "diretorio/de/mentirinha");
            expect(resultado).toBeFalsy();
        });
    });

    describe('eDiretorio()', () => {
        it('Trivial', () => {
            const resultado = eDiretorio(undefined, "diretorio/de/mentirinha/arquivo-texto.txt");
            expect(resultado).toBeFalsy();
        });

        it('Diretório', () => {
            const resultado = eDiretorio(undefined, "diretorio/de/mentirinha");
            expect(resultado).toBeTruthy();
        });
    });
});
