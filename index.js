const venom = require('venom-bot');

const PREFIX = '#';
const OWNER_NUMBER = '595994422882';

venom
  .create()
  const client = create({ useChrome: true });
  .then((client) => startBot(client))
  .catch((error) => console.log('Error al iniciar el bot:', error));

function startBot(client) {
  client.onMessage(async (message) => {
    // Obtener información del mensaje
    const { from, body } = message;

    // Verificar si el mensaje es un comando válido
    if (body.startsWith(PREFIX)) {
      const command = body.slice(1); // Eliminar el prefijo del comando

      // Comando de menú
      if (command === 'menu') {
        await client.sendText(from, 'Hola! Este es el menú principal');
      }

      // Comando de dueño
      if (command === 'owner' && from.endsWith(OWNER_NUMBER)) {
        await client.sendText(from, 'Hola creador');
      }
    }
  });

  // Escanear código QR
  client
    .onStateChange((state) => {
      if (state.qrCode) {
        // Mostrar el código QR y esperar a que se escanee
        console.log('Escanea el código QR:');
        console.log(state.qrCode);
      }
    })
    .catch((error) => console.log('Error al escanear el código QR:', error));
    }
    
