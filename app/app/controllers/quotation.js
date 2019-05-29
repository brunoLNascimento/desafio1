const axios = require('axios')

exports.get = function (req, res){
    var moeda1 = req.params.moeda1
    var moeda2 = req.params.moeda2
    var retorno = 1
    var qtd = req.params.qtd
    axios.get(`https://economia.awesomeapi.com.br/${moeda1}-${moeda2}/${retorno}`,
    {
        timeout: 3000
    }).then( response => {
        if(response.data.length){
            let conversao = parseInt(response.data[0].high * qtd).toFixed(2)
            return res.status(200).send({
                message: "Resultado da conversão: " +moeda1+ " para " +moeda2+ " = " +conversao,
                res: response.data
            })
        }else{
            return res.status(200).send("Nenhuma valor encontrado para pesquisa.")
        }
    }).catch( err => {
        console.log(err)
        return res.status(500).send(err)
    })
}