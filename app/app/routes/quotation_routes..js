


    const quotation = require('../controllers/quotation_controllers')
    
    module.exports = function(server) {	
        server.get('/quotation/:coinFrom/:coinTo?/:amount?', quotation.get)
        //https://localhost:3000/quotation/USD/BRL/1
    
        
}