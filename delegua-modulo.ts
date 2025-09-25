import { abrir, diretorioAtual, diretorioExiste, eArquivo, eDiretorio } from "./fontes";

const definicaoEArquivo = {
    tipoRetorno: 'lógico',
    funcao: eArquivo,
    argumentos: [
        {
            nome: 'caminhoArquivo',
            tipo: 'texto'
        }
    ]
}

const definicaoEDiretorio = {
    tipoRetorno: 'lógico',
    funcao: eDiretorio,
    argumentos: [
        {
            nome: 'caminhoArquivo',
            tipo: 'texto'
        }
    ]
}

export const DeleguaModuloArquivos = {
    abrir: {
        tipoRetorno: 'Arquivo',
        funcao: abrir,
        argumentos: [
            {
                nome: 'caminhoArquivo',
                tipo: 'texto'
            }
        ]
    },
    diretorioAtual: {
        tipoRetorno: 'texto',
        funcao: diretorioAtual,
        argumentos: []
    },
    diretorioExiste: {
        tipoRetorno: 'lógico',
        funcao: diretorioExiste,
        argumentos: [
            {
                nome: 'caminhoArquivo',
                tipo: 'texto'
            }
        ]
    },
    eArquivo: definicaoEArquivo,
    'éArquivo': definicaoEArquivo,
    eDiretorio: definicaoEDiretorio,
    'éDiretório': definicaoEDiretorio
}