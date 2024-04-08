const { ValidationError } = require("../../helpers");
const { Orders } = require("../../models");
const { ActiveEvents } = require("../../models");
const { Events } = require("../../models");
const { Specialists } = require("../../models");

const nodemailer = require("nodemailer");

const createOrder = async (req, res, next) => {
  const {
    eventId,
    activeEventID,
    date,
    time,
    userName,
    userEmail,
    userPhone,
    bookingSeats,
    priceTotal,
    status,
  } = req.body;

  const newData = {
    eventId,
    activeEventID,
    date,
    time,
    userName,
    userEmail,
    userPhone,
    bookingSeats,
    priceTotal,
    status: status ? status : "new",
  };

  const resEvent = await Events.findOne({ article_event: eventId });
  const resSpecialist = await Specialists.findOne({
    specialistId: resEvent.specialistId,
  });

  const updatedD = await ActiveEvents.find({ article_eventID: activeEventID });
  const updatedData = updatedD[0];
  if (updatedData) {
    updatedData.booking = (+updatedData.booking) + (+newData.bookingSeats);
    updatedData.vacancies =  (+updatedData.seats) - (+updatedData.booking);
  }
  if (updatedData.vacancies < 0) {
    updatedData.vacancies = 0;
  }

  // console.log("CREATE OREDER:", newData);
  console.log("updatedData:", updatedData);

  
  try {
    const resCreate = await Orders.create(newData);
    if (resCreate) {
      await ActiveEvents.findOneAndUpdate(
        { article_eventID: activeEventID },
        updatedData,
        {
          new: true,
        }
      );

      // відправка повідомлень

      const nameActiveEvent =
        resEvent[`${updatedData.language.toLowerCase()}`]["name"];
      const timectiveEvent = newData?.time;
      const datectiveEvent = `${new Date(newData?.date).getDate()}/${
        new Date(newData?.date).getMonth() + 1
      }/${new Date(newData?.date).getFullYear()}`;

      let textLetterContext = `Cher expert, Une nouvelle demande pour votre événement ${nameActiveEvent} le ${datectiveEvent} ${timectiveEvent} a été reçue.  Voici les détails: Nombre de places: ${newData?.bookingSeats}, Nom: ${newData?.userName}, E-mail: ${newData?.userEmail}, Téléphone: ${newData?.userPhone}. Vous pouvez contacter directement la personne qui a fait la demande. Merci`;

      let htmlLetterContext = `<h3>Cher expert,</h3> <p>Une nouvelle demande pour votre événement ${nameActiveEvent} le ${datectiveEvent} ${timectiveEvent} a été reçue.</p><p>Voici les détails: <br/>Nombre de places: ${newData?.bookingSeats}, <br/>Nom: ${newData?.userName}, <br/>E-mail: ${newData?.userEmail}, <br/>Téléphone: ${newData?.userPhone}.</p><p>Vous pouvez contacter directement la personne qui a fait la demande</p>. <p>Merci</p>`;
      if ((updatedData.language === "Ua")) {
        textLetterContext = `Шановний спеціаліст, Ми отримали новий запит на реєстрацію на Ваш захід ${nameActiveEvent} ${datectiveEvent} ${timectiveEvent}. Деталі запиту: Кількість місць: ${newData.bookingSeats}, Ім'я: ${newData.userName}, E-mail: ${newData.userEmail}, Телефон: ${newData.userPhone}.Ви можете напряму зв'язатись з тим, хто надіслав запит. Дякуємо`;
        htmlLetterContext = `<h3>Шановний спеціаліст,</h3> <p>Ми отримали новий запит на реєстрацію на Ваш захід ${nameActiveEvent} ${datectiveEvent} ${timectiveEvent}.</p> <p>Деталі запиту: <br/>Кількість місць: ${newData.bookingSeats},<br/> Ім'я: ${newData.userName},<br/> E-mail: ${newData.userEmail},<br/> Телефон: ${newData.userPhone}.</p>
        <p>Ви можете напряму зв'язатись з тим, хто надіслав запит.</p><p>Дякуємо</p> `;
      }
      if ((updatedData.language === "Ru")) {
        textLetterContext = `Дорогой специалист, Мы получили новый запрос на регистрацию на Ваше мероприятие ${nameActiveEvent} ${datectiveEvent} ${timectiveEvent}. Детали запроса: Количество мест: ${newData.bookingSeats}, Имя: ${newData.userName}, E-mail: ${newData.userEmail},    Телефон: ${newData.userPhone}.
        Вы можете напрямую связаться с тем, кто отправил запрос. Спасибо`;
        htmlLetterContext = `<h3>Дорогой специалист,</h3><p>Мы получили новый запрос на регистрацию на Ваше мероприятие ${nameActiveEvent} ${datectiveEvent} ${timectiveEvent}.</p><p>Детали запроса: <br/>Количество мест: ${newData.bookingSeats},<br/> Имя: ${newData.userName},<br/> E-mail: ${newData.userEmail},<br/>Телефон: ${newData.userPhone}.<p/><p>Вы можете напрямую связаться с тем, кто отправил запрос.<p/><p>Спасибо<p/>`;
      }

      // лист замовнику, який зробив броньування квитків на івент

      let textUserContext = `Cher(e) participant(e),
      Nous vous remercions de votre intérêt pour notre événement. Votre inscription à ${nameActiveEvent} le ${datectiveEvent} à ${timectiveEvent} a été enregistrée avec succès. La veille de l'événement, vous recevrez un rappel de la rencontre avec l'adresse de la réunion. L'équipe de BloomSkill`;
      let htmlUserContext = `<h3>Cher(e) participant(e),</h3> <p>Nous vous remercions de votre intérêt pour notre événement.</p><p>Votre inscription à ${nameActiveEvent} le ${datectiveEvent} à ${timectiveEvent} a été enregistrée avec succès.</p><p>La veille de l'événement, vous recevrez un rappel de la rencontre avec l'adresse de la réunion.</p><p>L'équipe de BloomSkill</p>`;
      if ((updatedData.language === "Ua")) {
        textUserContext = `Шановний учасник, Дякуємо за зацікавленість до нашої події. Ваша заявка на участь у ${nameActiveEvent} ${datectiveEvent} о ${timectiveEvent} успішно зареєстрована. За день до події ви отримаєте нагадування про зустріч із адресою, за якою відбудеться зустріч. Команда BloomSkill`;
        htmlUserContext = `<h3>Шановний учасник,</h3> <p>Дякуємо за зацікавленість до нашої події.</p><p>Ваша заявка на участь у ${nameActiveEvent} ${datectiveEvent} о ${timectiveEvent} успішно зареєстрована.</p> <p>За день до події ви отримаєте нагадування про зустріч із адресою, за якою відбудеться зустріч.</p><p>Команда BloomSkill</p> `;
      }
      if ((updatedData.language === "Ru")) {
        textUserContext = `Дорогой участник, Спасибо за интерес к нашему мероприятию. Ваша заявка на участие в ${nameActiveEvent} ${datectiveEvent} в  ${timectiveEvent} была успешно зарегистрирована.
        За день до мероприятия Вы получите напоминание о встрече с адресом, по которому состоится встреча. Команда BloomSkill`;
        htmlUserContext = `<h3>Дорогой участник, </h3><p>Спасибо за интерес к нашему мероприятию.</p><p>Ваша заявка на участие в ${nameActiveEvent} ${datectiveEvent} в  ${timectiveEvent} была успешно зарегистрирована.</p><p>За день до мероприятия Вы получите напоминание о встрече с адресом, по которому состоится встреча.</p><p>Команда BloomSkill</p>`;
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_SEND,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const from = "BloomSkill Event <bloomskill.fr@gmail.com>";
      const to = `bloomskill.fr@gmail.com, ${resSpecialist?.email}`; // list of receivers
      const toUser = `bloomskill.fr@gmail.com, ${userEmail}`;

      transporter.sendMail(
        {
          from,
          to,
          subject: "BloomSkill événements - nouvelle demande",
          text: textLetterContext,
          html: htmlLetterContext,
        },
        (err, data) => {
          if (err) {
            console.error("Error sending:", err);
          } else {
            console.log("Letter sent");
          }
        }
      );

      transporter.sendMail(
        {
          from,
          to: toUser,
          subject: "BloomSkill événements - nouvelle demande",
          text: textUserContext,
          html: htmlUserContext,
        },
        (err, data) => {
          if (err) {
            console.error("Error sending:", err);
          } else {
            console.log("Letter sent");
          }
        }
      );
    }
    return res.status(201).json(resCreate);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = createOrder;
