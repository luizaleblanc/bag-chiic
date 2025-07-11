"use server"

interface SendOrderMessageResult {
  success: true
  message: string
}

export async function sendOrderMessage(
  customerName: string,
  customerEmail: string,
  totalAmount: number,
): Promise<SendOrderMessageResult> {
  const targetPhoneNumber = "6199366-1734"
  const messageContent = `(Cliente: ${customerName}, Email: ${customerEmail}) está efetuando uma compra no valor de R$ ${totalAmount.toFixed(2).replace(".", ",")}!`

  // Em um ambiente de produção, você integraria aqui com um serviço de SMS (ex: Twilio, Zenvia)
  // Por exemplo:
  // const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  // await twilioClient.messages.create({
  //   body: messageContent,
  //   from: 'YOUR_TWILIO_PHONE_NUMBER',
  //   to: `+55${targetPhoneNumber.replace(/\D/g, '')}` // Formato E.164
  // });

  console.log(`[SIMULAÇÃO DE MENSAGEM PARA ${targetPhoneNumber}] ${messageContent}`)

  return { success: true, message: "Mensagem de pedido simulada com sucesso." }
}
