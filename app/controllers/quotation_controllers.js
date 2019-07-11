var mongoose = require('mongoose');
var config = require('../config/config')
const Quotation = mongoose.model('Quotation');
const axios = require('axios');
mongoose.set('debug', true)

exports.quotation = function (req, res){
    var coinFrom = req.params.coinFrom
    var coinTo = req.params.coinTo
    var retorno = 1

    if(!coinFrom) return res.status(400).send("Moeda principal é um campo obrigatório") 
    if(!coinTo) return res.status(400).send("Moeda a ser convertida é um campo obrigatório") 
    if(!req.params.amount) return res.status(400).send("Valor a ser convertido é um campo obrigatório") 

    //Conexão com a apai da awesomeApi para fazer a cotação
    axios.get(config.awesomeApi.url + `/${coinFrom}-${coinTo}/${retorno}`,
    {
        timeout: 3000
    }).then( response => {
        if(response.data.length){
            //Função para carregar dados 
            var saveQuotation = awesomeApi(req, response, coinFrom, coinTo)

            saveQuotation.save(function(err, saved){
                if(err){
                    return res.status(500).send("Erro ao salvar cotação solicitada")
                }
                if(saved){
                    return res.status(201).send({
                        message: saved._doc.message,
                        res: saved
                    })
                }else{
                    return res.status(400).send("Algo deu errado!")
                }
            })    
        }else{
            return res.status(204).send("Nenhuma valor encontrado para pesquisa.")
        }
    }).catch( err => {
        return res.status(500).send({message: "Algo deu errado ao validar consulta!",
                                    error: err})
    })
}

exports.getQuotation = function (req, res){
    var page = req.params.page
    var limit = 10
    var skip = page * limit

    //Query para fazer consulta da cotação desejada por ID
    if(req.params.id){
        var query = { quotation_id: req.params.id, active: true }
    }else{
        var query = { active: true }
    }

    //Consulta com paginação, exibe 10 resultados por página
    Quotation.find(query, function (err, response){
        if(err){
            return res.status(500).send("Erro ao consultar cotação")
        }
        if(response.length){
            return res.status(200).send(response) 
        }else{
            return res.status(204).send("Nenhuma cotação encontrada!")
        }
    }).limit(limit).skip(skip)
}

exports.remove = function(req, res){
    //Exclusão são lógicas, altera active true para false
    var queryFind = { quotation_id: req.params.id, active: true }
    var queryUpdate = { active: false }

    Quotation.findOneAndUpdate(queryFind, queryUpdate, function(err, updated){
        if(err){
            return res.status(500).send("Erro ao atualizar")
        }
        if(updated){
            return res.status(200).send("Cotação removida com sucesso!")
        }else{
            return res.status(204).send("Nenhuma cotação encontrada!")
        }
    })
}

//RemoveTest - exclusão dos testes 
exports.removetest = function(req, res){
    //Exclusão são lógicas, altera active true para false
    var queryFind = { idTest: req.params.id, active: true }
    var queryUpdate = { active: false }

    Quotation.findOneAndUpdate(queryFind, queryUpdate, function(err, updated){
        if(err){
            return res.status(500).send("Erro ao atualizar")
        }
        if(updated){
            return res.status(200).send("Cotação removida com sucesso!")
        }else{
            return res.status(204).send("Nenhuma cotação encontrada!")
        }
    })
}

awesomeApi = function(req, response, coinFrom, coinTo){
    //Função carrega dados para salvar
    var amount = req.params.amount
    var quotation = response.data[0]
    
    //Retorno da cotação da moeda multiplicado pelo valor desejado 
    quotation.valueQuotation = parseFloat(quotation.high * amount).toFixed(2)
    
    //Cria mensaga de exibição
    quotation.message = "Valor a ser cotado $" +amount+ ", resultado da conversão: " +coinFrom+ " para " +coinTo+ " = " +quotation.valueQuotation
    
   

    var saveQuotation = new Quotation({
        idTest: req.headers.test_id,
        varBid: quotation.varBid,
        code: quotation.code,
        codein: quotation.codein,
        name: quotation.name,
        high: quotation.high,
        low: quotation.low,
        pctChange: quotation.pctChange,
        bid: quotation.bid,
        ask: quotation.ask,
        timestamp: quotation.timestamp,
        create_date: quotation.create_date,
        message: quotation.message,
        valueQuotation: quotation.valueQuotation
    })
    return saveQuotation
}