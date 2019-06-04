const app = require('../app')
const mongoose = require('mongoose')
const request = require('supertest')
const config = require('../app/config/config')



const quotationUSD = {
    coinFrom: "USD",
    coinTo: "BRL",
    amount: "125.55"
}

const quotationEUR = {
    coinFrom: "EUR",
    coinTo: "BRL",
    amount: "1992.55"
}

const quotationETH = {
    coinFrom: "ETH",
    coinTo: "BRL",
    amount: "1"
}

const wrongQuotation = {
    coinFrom: "ETH",
    coinTo: "",
    amount: "1"
}

describe( 'Testando api de cotação', () =>{
        
    mongoose.connect(config.db.urlTeste)

    it('#quotationUSD', done => {
        request(app)
        .get(`/quotation/${quotationUSD.coinFrom}/${quotationUSD.coinTo}/${quotationUSD.amount}`)
        .timeout(3000)
        .expect(201)
        .end(done)
    })
    
    it('#quotationEUR', done => {
        request(app)
        .get(`/quotation/${quotationEUR.coinFrom}/${quotationEUR.coinTo}/${quotationEUR.amount}`)
        .timeout(3000)
        .expect(201)
        .end(done)
    })
    
    it('#quotationETH', done => {
        request(app)
        .get(`/quotation/${quotationETH.coinFrom}/${quotationETH.coinTo}/${quotationETH.amount}`)
        .timeout(3000)
        .expect(201)
        .end(done)
    })
    
  /*  it('#wrongQuotation', done => {
        request(app)
        .get(`/quotation/${wrongQuotation.coinFrom}/${wrongQuotation.coinTo}/${wrongQuotation.amount}`)
        .timeout(3000)
    //    .expect(404, "Moeda a conversão é um campo obrigatório") 
        .end(after())
        
    })*/
    
    
})  
    
