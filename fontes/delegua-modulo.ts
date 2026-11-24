import {
    abrir,
    Arquivo,
    caminhoAbsoluto,
    criarDiretorio,
    criarDiretorioTemporario,
    definirPermissoes,
    diretorioAtual,
    diretorioExiste,
    diretorioPai,
    diretorioPessoal,
    eArquivo,
    eDiretorio,
    escreverTexto,
    existe,
    juntarCaminhos,
    lerTexto,
    listarDiretorio,
    nomeBase,
    remover,
    renomear
} from ".";

const argumento = (nome: string, tipo: string) => ({ nome, tipo });

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
    'éDiretório': definicaoEDiretorio,

    // Sistema de arquivos (lógico: verdadeiro em caso de sucesso).
    existe: { tipoRetorno: 'lógico', funcao: existe, argumentos: [argumento('caminho', 'texto')] },
    criarDiretorio: { tipoRetorno: 'lógico', funcao: criarDiretorio, argumentos: [argumento('caminho', 'texto')] },
    remover: { tipoRetorno: 'lógico', funcao: remover, argumentos: [argumento('caminho', 'texto')] },
    renomear: {
        tipoRetorno: 'lógico',
        funcao: renomear,
        argumentos: [argumento('origem', 'texto'), argumento('destino', 'texto')]
    },
    listarDiretorio: { tipoRetorno: 'texto[]', funcao: listarDiretorio, argumentos: [argumento('caminho', 'texto')] },
    criarDiretorioTemporario: {
        tipoRetorno: 'texto',
        funcao: criarDiretorioTemporario,
        argumentos: [argumento('diretorioPai', 'texto'), argumento('prefixo', 'texto')]
    },
    diretorioPessoal: { tipoRetorno: 'texto', funcao: diretorioPessoal, argumentos: [] },
    lerTexto: { tipoRetorno: 'texto', funcao: lerTexto, argumentos: [argumento('caminho', 'texto')] },
    escreverTexto: {
        tipoRetorno: 'lógico',
        funcao: escreverTexto,
        argumentos: [argumento('caminho', 'texto'), argumento('conteudo', 'texto')]
    },
    definirPermissoes: {
        tipoRetorno: 'lógico',
        funcao: definirPermissoes,
        argumentos: [argumento('caminho', 'texto'), argumento('modo', 'inteiro')]
    },

    // Caminhos.
    juntarCaminhos: {
        tipoRetorno: 'texto',
        funcao: juntarCaminhos,
        argumentos: [argumento('base', 'texto'), argumento('parte', 'texto')]
    },
    diretorioPai: { tipoRetorno: 'texto', funcao: diretorioPai, argumentos: [argumento('caminho', 'texto')] },
    nomeBase: { tipoRetorno: 'texto', funcao: nomeBase, argumentos: [argumento('caminho', 'texto')] },
    caminhoAbsoluto: { tipoRetorno: 'texto', funcao: caminhoAbsoluto, argumentos: [argumento('caminho', 'texto')] }
}