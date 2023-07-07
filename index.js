const { create, decryptMedia } = require('@whiskeysockets/baileys');
const fs = require('fs');

const PREFIX = '#';
const OWNER_NUMBER = '595994422882';

const client = create();

client.on('qr', (qrCode) => {
  // Mostrar el código QR y esperar a que se escanee
  console.log('Escanea el código QR:');
  console.log(qrCode);
});

client.on('authenticated', (session) => {
  // Guardar los datos de sesión para futuras conexiones
  fs.writeFileSync('./session.json', JSON.stringify(session));
  console.log('Sesión guardada en session.json');
});

client.on('message', async (message) => {
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

// Cargar la sesión si existe
if (fs.existsSync('./session.json')) {
  const sessionData = JSON.parse(fs.readFileSync('./session.json', 'utf8'));
  client.loadAuthInfo(sessionData).then(() => {
    // Iniciar sesión
    client.connect();
  });
} else {
  // Iniciar sesión
  client.connect();
}

// Guardar la sesión al cerrar la aplicación
process.on('SIGINT', async () => {
  if (client.state) {
    const sessionData = client.base64EncodedAuthInfo();
    fs.writeFileSync('./session.json', JSON.stringify(sessionData));
    await client.close();
    process.exit(0);
  }
});
          
