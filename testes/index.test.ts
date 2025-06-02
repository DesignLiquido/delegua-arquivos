import mock from "mock-fs";

import { diretorioAtual } from "../fontes";

describe('Casos de sucesso', () => {

    beforeAll(() => {
        mock({
            'path/to/fake/dir': {
                'some-file.txt': 'file content here',
                'empty-dir': {/** empty directory */}
            },
            'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
            'some/other/path': {/** another empty directory */}
        });
    });

    afterAll(() => {
        mock.restore();
    });

    describe('abrir()', () => {
        it('Trivial', () => {

        });
    });

    describe('diretorioAtual()', () => {
        it('Trivial', () => {
            const resultado = diretorioAtual();
            expect(resultado).toBeDefined();
        });
    });
});
