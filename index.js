const { Wechaty } = require('wechaty');

const ownerNumber = '+1234567890'; // Número del dueño

const bot = new Wechaty();

bot.on('scan', (qrcode, status) => {
  console.log(`Escanea el siguiente código QR para iniciar sesión: ${qrcode}`);
});

bot.on('login', (user) => {
  console.log(`Usuario ${user} ha iniciado sesión`);
});

bot.on('logout', (user) => {
  console.log(`Usuario ${user} ha cerrado sesión`);
});

bot.on('message', async (message) => {
  const sender = message.from().name();
  const text = message.text();
  const senderNumber = message.from().id;

  console.log(`Mensaje recibido de ${sender}: ${text}`);

  // Verificar si el remitente es el dueño
  if (senderNumber === ownerNumber) {
    // Lógica para responder a comandos exclusivos del dueño
    if (text.startsWith('#owner')) {
      await message.say('Hola creador');
    } else {
      await message.say('Comando no reconocido. Inténtalo nuevamente.');
    }
  } else {
    await message.say('No tienes permiso para utilizar este bot.');
  }
});

bot.start();
    
