var querystring = require('querystring');
var https = require('https');

var username = 'dennisobel';
var apiKey = 'a8556c71a466f9131103636a6feb070ceffabdc9277ec9e05d3f502235c9cb4e';

exports.sendMessage = function(){
	var to = '+254727677068';
	var shortCode = 'xxxxxx';
	var keyword = 'premiumkeyword';

	var bulkSMSMode = 0;

	// Set the linkId parameter
    // linkId is received from the message sent by subscriber to your onDemand service

    var linkId = 'messageLinkId';
    var retryDurationInHours = '';
    var message = 'Order reeady for pick up';

    // Build the post string from an object
    var post_data = querystring.stringify({
        'username'             : username,
        'to'                   : to,
        'message'              : message,
        'from'                 : shortCode,
        'keyword'              : keyword,
        'linkId'               : linkId,
        'retryDurationInHours' : retryDurationInHours
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
    
    var post_req = https.request(post_options, function(response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            try {
                if(response.statusCode != 201)
                 throw chunk;
                 
                 var jsObject   = JSON.parse(chunk);
                 var recipients = jsObject.SMSMessageData.Recipients;
                 if ( recipients.length > 0 ) {
                     for (var i = 0; i < recipients.length; ++i ) {
                         var logStr  = 'number=' + recipients[i].number;
                         logStr     += ';messageId='   + recipients[i].messageId;
                         logStr     += ';status=' + recipients[i].status;
                        logStr     += ';statusCode=' + recipients[i].statusCode;
                         console.log(logStr);
                    }
                }
            }
           
           catch(errorStr) {
             console.log(errorStr);
           }
        });
    });   
    
    post_req.write(post_data);
    post_req.end();     
}

