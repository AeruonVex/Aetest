const { WAConnection } = require('@adiwajshing/baileys');
const config = require('./config.json');

const PREFIX = '#';

async function startBot() {
  const conn = new WAConnection();
  conn.logger.level = 'warn';

  conn.on('qr', qr => {
    // Mostrar el código QR y esperar a que se escanee
    console.log('Escanea el código QR:');
    console.log(qr);
  });

  conn.on('credentials-updated', () => {
    // Guardar los nuevos datos de sesión en cada actualización
    const authInfo = conn.base64EncodedAuthInfo();
    // Puedes guardar authInfo en tu archivo config.json si lo deseas
    console.log('Datos de sesión actualizados.');
  });

  conn.on('chat-update', async chatUpdate => {
    // Verificar si el mensaje es un comando válido
    if (
      chatUpdate?.messages?.length &&
      chatUpdate.messages[0]?.message?.conversation &&
      chatUpdate.messages[0].message.conversation.startsWith(PREFIX)
    ) {
      const message = chatUpdate.messages[0];
      const command = message.message.conversation.slice(1); // Eliminar el prefijo del comando
      const chatId = message.key.remoteJid;

      switch (command) {
        case 'menu':
          await conn.sendMessage(chatId, 'Hola! Este es el menú principal');
          break;
        default:
          await conn.sendMessage(chatId, 'Comando no reconocido');
          break;
      }
    }
  });

  // Iniciar sesión utilizando los datos de sesión guardados
  await conn.loadAuthInfo(config.sessionData);
  await conn.connect();

  // Guardar los nuevos datos de sesión si ha habido cambios
  const newSessionData = JSON.stringify(conn.base64EncodedAuthInfo());
  // Puedes guardar newSessionData en tu archivo config.json si lo deseas
}

startBot().catch(console.error);
