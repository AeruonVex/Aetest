const { WAConnection, MessageType } = require('@whiskeysockets/baileys');
const fs = require('fs');

const PREFIX = '#';
const OWNER_NUMBER = '595994422882';

const conn = new WAConnection();

conn.on('qr', (qrCode) => {
  // Mostrar el código QR y esperar a que se escanee
  console.log('Escanea el código QR:');
  console.log(qrCode);
});

conn.on('authenticated', (session) => {
  // Guardar los datos de sesión para futuras conexiones
  fs.writeFileSync('./session.json', JSON.stringify(session));
  console.log('Sesión guardada en session.json');
});

conn.on('message', async (message) => {
  // Obtener información del mensaje
  const { from, body } = message;

  // Verificar si el mensaje es un comando válido
  if (body.startsWith(PREFIX)) {
    const command = body.slice(1); // Eliminar el prefijo del comando

    // Comando de menú
    if (command === 'menu') {
      await conn.sendMessage(from, 'Hola! Este es el menú principal', MessageType.text);
    }

    // Comando de dueño
    if (command === 'owner' && from.endsWith(OWNER_NUMBER)) {
      await conn.sendMessage(from, 'Hola creador', MessageType.text);
    }
  }
});

// Cargar la sesión si existe
if (fs.existsSync('./session.json')) {
  const sessionData = JSON.parse(fs.readFileSync('./session.json', 'utf8'));
  conn.loadAuthInfo(sessionData).then(() => {
    // Iniciar sesión
    conn.connect();
  });
} else {
  // Iniciar sesión
  conn.connect();
}

// Guardar la sesión al cerrar la aplicación
process.on('SIGINT', async () => {
  if (conn.state) {
    const sessionData = conn.base64EncodedAuthInfo();
    fs.writeFileSync('./session.json', JSON.stringify(sessionData));
    await conn.close();
    process.exit(0);
  }
});
        
