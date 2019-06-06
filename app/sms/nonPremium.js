var querystring = require('querystring');
var https = require('https');

var username = 'dennisobel';
var apiKey = 'a8556c71a466f9131103636a6feb070ceffabdc9277ec9e05d3f502235c9cb4e';

exports.sendMessage = function(){
	var to = '+254727677068'
	var message = 'Welcome to BilaMchoro blah blah blah...'
    // Specify your AfricasTalking shortCode or sender id
    var from = "bilamchoro";	

    var post_data = querystring.stringify({
         'username' : username,
         'to'       : to,
         'message'  : message,
         'from'     : from
    });    

    var post_options = {
        host   : 'api.africastalking.com',
        path   : '/version1/messaging',
        method : 'POST',
        
        rejectUnauthorized : false,
        requestCert        : true,
        agent              : false,
        
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length,
            'Accept': 'application/json',
            'apikey': apikey
        }
    }; 
    
    var post_req = https.request(post_options, function(res) {
        
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            var jsObject   = JSON.parse(chunk);
            var recipients = jsObject.SMSMessageData.Recipients;
            if ( recipients.length > 0 ) {
                for (var i = 0; i < recipients.length; ++i ) {
                    var logStr  = 'number=' + recipients[i].number;
                    logStr     += ';cost='   + recipients[i].cost;
                    logStr     += ';status=' + recipients[i].status;
                    logStr     += ';statusCode=' + recipients[i].statusCode;
                    console.log(logStr);
                    }
                } else {
                    console.log('Error while sending: ' + jsObject.SMSMessageData.Message);
                }
        });
    });   
    
    post_req.write(post_data);
    
    post_req.end();        
}