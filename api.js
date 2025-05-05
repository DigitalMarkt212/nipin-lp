const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8080;

function buscarPorCampo(campo, valor, callback) {
    fs.readFile('cadsus.json', 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }

        const db = JSON.parse(data);  // Parse o conteúdo JSON
        const resultado = db.find(item => item[campo] === valor);  // Encontrar o valor pelo campo especificado

        callback(null, resultado);
    });
}

function formatarResultado(row) {
    return {
        cpf: row.num_doc,
        nome: row.nom_pessoa,
        tipo: row.ind_tipo_pessoa,
        origem: row.dsc_origem,
        data_insercao: row.dat_insercao,
        estado: row.sgl_estado,
        valido: row.ind_valido
    };
}

app.get('/api/buscar-por-cpf', (req, res) => {
    const cpf = req.query.cpf;
    if (!cpf) {
        return res.status(400).json({ message: 'CPF não especificado' });
    }

    buscarPorCampo('num_doc', cpf, (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar CPF' });
        }

        if (row) {
            const resultado = formatarResultado(row);
            return res.status(200).json(resultado);
        } else {
            return res.status(404).json({ message: 'CPF não encontrado' });
        }
    });
});

app.get('/api/buscar-por-nome', (req, res) => {
    const nome = req.query.nome;
    if (!nome) {
        return res.status(400).json({ message: 'Nome não especificado' });
    }

    buscarPorCampo('nom_pessoa', nome, (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar nome' });
        }

        if (row) {
            const resultado = formatarResultado(row);
            return res.status(200).json(resultado);
        } else {
            return res.status(404).json({ message: 'Nome não encontrado' });
        }
    });
});

app.get('/api/buscar-por-celular', (req, res) => {
    const celular = req.query.celular;
    if (!celular) {
        return res.status(400).json({ message: 'Celular não especificado' });
    }

    buscarPorCampo('celular', celular, (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar celular' });
        }

        if (row) {
            const resultado = formatarResultado(row);
            return res.status(200).json(resultado);
        } else {
            return res.status(404).json({ message: 'Celular não encontrado' });
        }
    });
});

app.get('/api/buscar-por-telefone', (req, res) => {
    const telefone = req.query.telefone;
    if (!telefone) {
        return res.status(400).json({ message: 'Telefone não especificado' });
    }

    buscarPorCampo('telefone', telefone, (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar telefone' });
        }

        if (row) {
            const resultado = formatarResultado(row);
            return res.status(200).json(resultado);
        } else {
            return res.status(404).json({ message: 'Telefone não encontrado' });
        }
    });
});

app.get('/api/buscar-por-cns', (req, res) => {
    const cns = req.query.cns;
    if (!cns) {
        return res.status(400).json({ message: 'CNS não especificado' });
    }

    buscarPorCampo('cns', cns, (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar CNS' });
        }

        if (row) {
            const resultado = formatarResultado(row);
            return res.status(200).json(resultado);
        } else {
            return res.status(404).json({ message: 'CNS não encontrado' });
        }
    });
});

app.get('/api/buscar-cpf-todas', (req, res) => {
    const cpf = req.query.cpf;
    if (!cpf) {
        return res.status(400).json({ message: 'CPF não especificado' });
    }

    const resultados = [];

    buscarPorCampo('num_doc', cpf, (err, cadsusRow) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar CPF na tabela cadsus' });
        }

        if (cadsusRow) {
            resultados.push({ tabela: 'cadsus', registros: [formatarResultado(cadsusRow)] });
        }

        return res.status(200).json({ resultados });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
