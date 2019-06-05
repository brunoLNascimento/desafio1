const app = require('../app')
const mongoose = require('mongoose')
const request = require('supertest')
const config = require('../app/config/config')



const quotationUSD = {
    coinFrom: "USD",
    coinTo: "BRL",
    amount: "125.55",
    quotation_id: "1"
}

const quotationEUR = {
    coinFrom: "EUR",
    coinTo: "BRL",
    amount: "1992.55",
    quotation_id: "2"
}

const quotationETH = {
    coinFrom: "ETH",
    coinTo: "BRL",
    amount: "1",
    quotation_id: "3"
}

const deleteQuotationUSD = {
    quotation_id: "1"
}

const deleteQuotationEUR = {
    quotation_id: "2"
}
const dleteQuotationETH = {
    quotation_id: "3"
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

    it('#deleteQuotationUSD', done => {
        request(app)
        .delete(`/removeQuotation/${deleteQuotationUSD.quotation_id}`)
        .timeout(3000)
        .expect(200)
        .end(done)
    })

    it('#deleteQuotationEUR', done => {
        request(app)
        .delete(`/removeQuotation/${deleteQuotationEUR.quotation_id}`)
        .timeout(3000)
        .expect(200)
        .end(done)
    })

    it('#dleteQuotationETH', done => {
        request(app)
        .delete(`/removeQuotation/${dleteQuotationETH.quotation_id}`)
        .timeout(3000)
        .expect(200)
        .end(done)
    })
})  
    
