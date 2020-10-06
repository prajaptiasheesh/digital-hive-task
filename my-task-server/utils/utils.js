const path = require('path');
const appconfig = require('../config/index');
const stripe = require('stripe')(appconfig.stripe.stripeSecretKey);

module.exports.basePath = function(d) {
  return path.parse(d).base;
};

module.exports.dirPath = function(d) {
  return path.parse(d).dir;
};

module.exports.trimPath = function(path) {
  if (path) return path.replace(/^\/+|\/+$/g, '');
  return '';
};

module.exports.transferMoney=function({ amount_transfer, stripe_account_id }){
  
  return  new Promise(async(resolve,reject) => {

              try{
                
                const transerData = await stripe.transfers.create({
                                                                      amount: amount_transfer,
                                                                      currency: 'usd',
                                                                      destination: stripe_account_id,
                                                                      transfer_group: 'ORDER_10',
                                                                  });
                  if (!transerData) {
              
                    reject(transerData);
                    
                  }else{
                      
                    resolve(transerData)
                  }
                  
                  wlogger.info(`Error in cancelling the trip ==> `, transerData);
              
              }catch(error){
            
                  reject(error)
              }
  })

}