function initializeClient() {
	const qrcode = require('qrcode-terminal');
	const { Client } = require('whatsapp-web.js');
	const client = new Client();

	client.on('qr', qr => {
		qrcode.generate(qr, { small: true });
	});

	client.on('ready', () => {
		console.log('Client is ready!');
	});

	client.initialize();
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
}


//////////////// Server Starts /////////////////

initializeClient();

loadDebugEvents(); 


