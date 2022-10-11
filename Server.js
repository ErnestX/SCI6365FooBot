//////////////// Server Starts /////////////////
const groupName = 'enative design t1';
var client = createClient();

loadDebugEvents_Basic(); 
loadDebugEvents_GroupChat();

sendToChatBot("Helllllolololo");



//////////////// Function Definitions ////////////////

async function sendToChatBot(text) {
	var request = require('request-promise');

	var options = {
        method: 'POST',
  
        // http:flaskserverurl:port/route
        uri: 'http://127.0.0.1:5000/fooBot',
        body: text,
  
        // Automatically stringifies the body to JSON 
        json: true
    };

	var sendrequest = await request(options)
  
    // The parsedBody contains the data sent back from the Flask server 
    .then(function (parsedBody) {
        console.log(parsedBody);
              
        // You can do something with returned data
        let result;
        result = parsedBody['result'];
        console.log("Reply: ", result);
    })
    .catch(function (err) {
        console.log(err);
    });
}


function createClient() {
	const qrcode = require('qrcode-terminal');
	const { Client } = require('whatsapp-web.js');
	var c = new Client();

	// const { Client, LocalAuth } = require('whatsapp-web.js');
	// const c = new Client({
 	//    authStrategy: new LocalAuth()
	// });

	c.on('qr', qr => {
		qrcode.generate(qr, { small: true });
	});

	c.on('ready', () => {
		onClientReady();
	});

	c.on('authenticated', () => {
		onAuthentication();
	});

	c.on('auth_failure', () => {
		console.log('authen failure');
	})

	c.initialize();

	return c;
}

function onClientReady() {
	console.log('Client is ready!');
	testChats();
}

function onAuthentication() {
	console.log('Authenticated!')
}

async function testChats() {

}

function loadDebugEvents_Basic() {
	
	// test receieving message
	client.on('message', message => {
		console.log(message.body);
	});
	
	// test public reply
	client.on('message', message => {
		if(message.body === '!ping') {
			message.reply('pong');
		}
	});

	client.on('message', message => {
		if(message.body === 'bot') {
			message.reply('Hi, I am bot.');
		}
	});
}

function loadDebugEvents_GroupChat() {
	client.on('message', message => {
		let chatPromise = message.getChat();
		chatPromise.then(
			function(value){
				console.log(value);
				console.log(value.name);
				console.log(value.id);
				if (groupName == value.name) {
					console.log('come from the group chat:');
					console.log(message.body);
				} else {
					console.log('not from the group chat:');
					console.log(message.body);
				}
			}, 
			function(error){console.log(error)}
		);
	});
}


 
