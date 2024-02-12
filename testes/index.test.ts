import { diretorioAtual } from "../fontes";

describe('Casos de sucesso', () => {
    describe('diretorioAtual()', () => {
        it('Trivial', () => {
            const resultado = diretorioAtual();
            expect(resultado).toBeDefined();
        });
    });
});
