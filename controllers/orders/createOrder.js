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
  if (updatedData.booking) {
    updatedData.booking = +updatedData.booking + newData.bookingSeats;
  }
  if (updatedData.vacancies) {
    updatedData.vacancies = +updatedData.vacancies - newData.bookingSeats;
  }
  if (updatedData.vacancies < 0) {
    updatedData.vacancies = 0;
  }

  console.log("CREATE OREDER:", newData);
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
      if ((updatedData.language = "Uk")) {
        textLetterContext = `Шановний спеціаліст, Ми отримали новий запит на реєстрацію на Ваш захід ${nameActiveEvent} ${datectiveEvent} ${timectiveEvent}. Деталі запиту: Кількість місць: ${newData.bookingSeats}, Ім'я: ${newData.userName}, E-mail: ${newData.userEmail}, Телефон: ${newData.userPhone}.Ви можете напряму зв'язатись з тим, хто надіслав запит. Дякуємо`;
        htmlLetterContext = `<h3>Шановний спеціаліст,</h3> <p>Ми отримали новий запит на реєстрацію на Ваш захід ${nameActiveEvent} ${datectiveEvent} ${timectiveEvent}.</p> <p>Деталі запиту: <br/>Кількість місць: ${newData.bookingSeats},<br/> Ім'я: ${newData.userName},<br/> E-mail: ${newData.userEmail},<br/> Телефон: ${newData.userPhone}.</p>
        <p>Ви можете напряму зв'язатись з тим, хто надіслав запит.</p><p>Дякуємо</p> `;
      }
      if ((updatedData.language = "Ru")) {
        textLetterContext = `Дорогой специалист, Мы получили новый запрос на регистрацию на Ваше мероприятие ${nameActiveEvent} ${datectiveEvent} ${timectiveEvent}. Детали запроса: Количество мест${newData.bookingSeats}, Имя: ${newData.userName}, E-mail: ${newData.userEmail},    Телефон: ${newData.userPhone}.
        Вы можете напрямую связаться с тем, кто отправил запрос. Спасибо`;
        htmlLetterContext = `<h3>Дорогой специалист,</h3><p>Мы получили новый запрос на регистрацию на Ваше мероприятие ${nameActiveEvent} ${datectiveEvent} ${timectiveEvent}.</p><p>Детали запроса: <br/>Количество мест${newData.bookingSeats},<br/> Имя: ${newData.userName},<br/> E-mail: ${newData.userEmail},<br/>Телефон: ${newData.userPhone}.<p/><p>Вы можете напрямую связаться с тем, кто отправил запрос.<p/><p>Спасибо<p/>`;
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
      const to = `olgas.rudakova@gmail.com, ${resSpecialist?.email}`; // list of receivers

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
    }
    return res.status(201).json(resCreate);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = createOrder;
