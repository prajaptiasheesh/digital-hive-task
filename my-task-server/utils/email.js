const sender = require('../emails/smtp-aquilalogic');
const { wlogger } = require('../config/index');

module.exports.sendMail = function(req, template, emailTo, data, callback) {
  // get the host url
  const uri = req ? req.protocol + '://' + req.headers.host : '';
  wlogger.info('email is sending to email : ', emailTo);
  sender.send({
    template: template,
    message: {
      to: emailTo
    },
    locals: {
      host: uri,
      data: data
    }
  })
  .then((result) => {
    callback(null, result);
  })
  .catch((err) => {
    callback(err, null);
  });
}