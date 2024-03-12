import ElasticEmail from "@elasticemail/elasticemail-client";
import "dotenv/config";

async function sendEmail(recipient, subject, content) {
  try {
    const { ELASTICEMAIL_API_KEY, ELASTICEMAIL_FROM } = process.env;

    const defaultClient = ElasticEmail.ApiClient.instance;
    const { apikey } = defaultClient.authentications;
    apikey.apiKey = ELASTICEMAIL_API_KEY;

    const api = new ElasticEmail.EmailsApi();

    const email = ElasticEmail.EmailMessageData.constructFromObject({
      Recipients: [new ElasticEmail.EmailRecipient(recipient)
      ],
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: "HTML",
            Content: content,
          }),
        ],
        Subject: subject,
        From: ELASTICEMAIL_FROM,
      },
    });

    await api.emailsPost(email);
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
  }
}

export default sendEmail;