import { create, Message } from '@whiskeysocket/baileys';
import { ownerNumber, PREFIX, COMMAND_MENU, COMMAND_OWNER } from './config';

const client = create();

client.on('open', () => {
  console.log('Escanea el siguiente código QR para iniciar sesión:');
  console.log(client.generateQRCode());
});

client.on('message', async (message: Message) => {
  const sender = message.key.remoteJID;
  const text = message.message?.conversation;

  console.log(`Mensaje recibido de ${sender}: ${text}`);

  if (text.startsWith(PREFIX)) {
    const [command, ...args] = text.slice(1).split(' ');

    if (command === COMMAND_MENU) {
      await client.sendMessage(sender, 'Este es el menú principal');
    } else if (command === COMMAND_OWNER) {
      if (sender === ownerNumber || sender === `+${ownerNumber}`) {
        await client.sendMessage(sender, 'Hola creador');
      } else {
        await client.sendMessage(sender, 'Comando solo para el owner');
      }
    } else {
      await client.sendMessage(sender, 'Comando no reconocido. Inténtalo nuevamente.');
    }
  }
});

client.connect();
