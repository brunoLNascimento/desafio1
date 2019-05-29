


    const quotation = require('../controllers/quotation')
    
    module.exports = function(server) {	
        server.get('/quotation/:moeda1/:moeda2?/:qtd?', quotation.get)
        //https://localhost:3000/quotation/USD/BRL/1
    
        
}