const { WAConnection, MessageType } = require('@adiwajshing/baileys');
const qrcode = require('qrcode-terminal');

const exe = new WAConnection();
exe.logger.level = 'warn';

exe.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('Escanee el código QR con su teléfono para iniciar sesión.');
});

exe.on('credentials-updated', () => {
  const authInfo = exe.base64EncodedAuthInfo();
  fs.writeFileSync('auth_info.json', JSON.stringify(authInfo, null, '\t'));
});

exe.loadAuthInfo('auth_info.json');
exe.connect();

exe.on('message-new', async (message) => {
  if (!message.isGroup && message.body.startsWith('#menu')) {
    const response = 'Hola! Este es el menú principal del bot en desarrollo, éstos son los comandos disponibles por ahora:\n#menu para ver el menú del bot';
    exe.sendMessage(message.jid, response, MessageType.text);
  } else if (message.body.startsWith('/owner')) {
    const ownerNumber = '595994422882'; // Número del dueño del bot
    if (message.sender === ownerNumber) {
      const response = 'Hola creador';
      exe.sendMessage(message.jid, response, MessageType.text);
    }
  }
});
