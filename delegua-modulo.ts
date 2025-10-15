import { abrir, Arquivo, diretorioAtual, diretorioExiste, eArquivo, eDiretorio } from "./fontes";

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
    // Classes
    Arquivo: {
        implementacao: Arquivo,
        propriedades: {
            
        },
        metodos: {
            eArquivo: {
                tipoRetorno: 'lógico',
                argumentos: []
            },
            eDiretorio: {
                tipoRetorno: 'lógico',
                argumentos: []
            },
            escrever: {
                tipoRetorno: 'vazio',
                argumentos: [
                    {
                        nome: 'conteudo',
                        tipo: 'texto'
                    }
                ]
            },
            paraTexto: {
                tipoRetorno: 'texto',
                argumentos: []
            },
            recarregar: {
                tipoRetorno: 'vazio',
                argumentos: []
            },
            sobrescrever: {
                tipoRetorno: 'vazio',
                argumentos: [
                    {
                        nome: 'conteudo',
                        tipo: 'texto'
                    }
                ]
            }
        }
    },
    // Métodos
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