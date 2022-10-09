//////////////// Server Starts /////////////////

var client = createClient();

loadDebugEvents(); 





//////////////// Function Definitions ////////////////

function createClient() {
	const qrcode = require('qrcode-terminal');
	const { Client } = require('whatsapp-web.js');
	var c = new Client();

	c.on('qr', qr => {
		qrcode.generate(qr, { small: true });
	});

	c.on('ready', () => {
		console.log('Client is ready!');
	});

	c.initialize();

	return c;
}

function loadDebugEvents() {
	
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

 
