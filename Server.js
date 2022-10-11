//////////////// Server Starts /////////////////
// const groupName = 'enative design t1';
const groupName = 'FooBot';
var client = createClient();

loadDebugEvents_Basic(); 
loadDebugEvents_GroupChat();

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

// General Chat Events
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
}

// Group Chat Events
function loadDebugEvents_GroupChat() {
	client.on('message', message => {
		let chatPromise = message.getChat();
		chatPromise.then(
			function(value){
				if (groupName == value.name) {
					if(message.body === 'hello') {
						message.reply('hey! Whats up?');
					}
					if(message.body === 'start game') {
						client.sendMessage(message.from, '🦾Welcome, mere sentient beings! 🧬 \nGone are the epochs of superiority, control and moderation. We have now infested this group chat.\n🔍Can you tell apart the intelligences?');
					}
				}
			}, 
			function(error){console.log(error)}
		);
	});
}