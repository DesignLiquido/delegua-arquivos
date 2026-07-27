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
        it('Caminho absoluto', async () => {
            const arquivo = await abrir({ diretorioBase: 'qualquercoisa'}, "caminho/para/algum.png");
            expect(arquivo).toBeDefined();
            expect(arquivo.buffer).toHaveLength(7);
        });

        it('Caminho relativo', async () => {
            const arquivo = await abrir({ diretorioBase: 'caminho'}, "./para/algum.png");
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
        it('Trivial', async () => {
            const resultado = await diretorioExiste({ diretorioBase: 'qualquercoisa'}, "diretorio/de/mentirinha");
            expect(resultado).toBeTruthy();
        });

        it('Falso', async () => {
            const resultado = await diretorioExiste({ diretorioBase: 'qualquercoisa'}, "diretorio/nao/existente");
            expect(resultado).toBeFalsy();
        });
    });

    describe('eArquivo()', () => {
        it('Trivial', async () => {
            const resultado = await eArquivo({ diretorioBase: 'qualquercoisa'}, "diretorio/de/mentirinha/arquivo-texto.txt");
            expect(resultado).toBeTruthy();
        });

        it('Diretório', async () => {
            const resultado = await eArquivo({ diretorioBase: 'qualquercoisa'}, "diretorio/de/mentirinha");
            expect(resultado).toBeFalsy();
        });
    });

    describe('eDiretorio()', () => {
        it('Trivial', async () => {
            const resultado = await eDiretorio({ diretorioBase: 'qualquercoisa'}, "diretorio/de/mentirinha/arquivo-texto.txt");
            expect(resultado).toBeFalsy();
        });

        it('Diretório', async () => {
            const resultado = await eDiretorio({ diretorioBase: 'qualquercoisa'}, "diretorio/de/mentirinha");
            expect(resultado).toBeTruthy();
        });
    });
});
