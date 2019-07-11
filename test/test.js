const app = require('../app')
const mongoose = require('mongoose')
const request = require('supertest')
const config = require('../app/config/config')

const quotationUSD = {
    coinFrom: "USD",
    coinTo: "BRL",
    amount: "125.55",
    quotation_id: "dcf1cc20-a400-11e9-83dd-fc2a3f11c6da"
}

const quotationEUR = {
    coinFrom: "EUR",
    coinTo: "BRL",
    amount: "1992.55",
    quotation_id: "d01a2380-a400-11e9-86f5-46fb4a52fc85"
}

const quotationETH = {
    coinFrom: "ETH",
    coinTo: "BRL",
    amount: "1",
    quotation_id: "9b64f1b0-a400-11e9-8b13-665038a9ce7a"
}

describe( 'Testando api de cotação', () =>{
    mongoose.connect(config.db.urlTeste)
    setTimeout( function () {
        mongoose.disconnect()
      }, 3000);

    it('#quotationUSD', done => {
        request(app)
        .get(`/quotation/${quotationUSD.coinFrom}/${quotationUSD.coinTo}/${quotationUSD.amount}`)
        .set('test_id', quotationUSD.quotation_id)
        .timeout(3000)
        .expect(201)
        .end(done)
    })
    
    it('#quotationEUR', done => {
        request(app)
        .get(`/quotation/${quotationEUR.coinFrom}/${quotationEUR.coinTo}/${quotationEUR.amount}`)
        .set('test_id', quotationEUR.quotation_id)
        .timeout(3000)
        .expect(201)
        .end(done)
    })
    
    it('#quotationETH', done => {
        request(app)
        .get(`/quotation/${quotationETH.coinFrom}/${quotationETH.coinTo}/${quotationETH.amount}`)
        .set('test_id', quotationETH.quotation_id)
        .timeout(3000)
        .expect(201)
        .end(done)
    })

    it('#deleteQuotationUSD', done => {
        request(app)
        .delete(`/removetest/${quotationUSD.quotation_id}`)
        .timeout(3000)
        .expect(200)
        .end(done)
    })

    it('#deleteQuotationEUR', done => {
        request(app)
        .delete(`/removetest/${quotationEUR.quotation_id}`)
        .timeout(3000)
        .expect(200)
        .end(done)
    })

    it('#deleteQuotationETH', done => {
        request(app)
        .delete(`/removetest/${quotationETH.quotation_id}`)
        .timeout(3000)
        .expect(200)
        .end(done)
    })
})  
    
