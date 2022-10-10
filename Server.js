//////////////// Server Starts /////////////////

var client = createClient();

loadDebugEvents(); 




//////////////// Function Definitions ////////////////

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

	c.initialize();

	return c;
}

function onClientReady() {
	console.log('Client is ready!');
	testChats();
}

async function testChats() {
	const allChats = await client.getChats();
	console.log(typeof allChats);
	console.log(allChats.length);
	console.log(typeof allChats[0]);
	console.log(allChats[0].id);
	console.log(allChats[0].name);
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


 
