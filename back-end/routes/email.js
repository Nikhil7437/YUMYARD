const nodemailer = require("nodemailer");


function sendEmail(message, name, email ,subject) {

console.log("email function to run ho raha hai" , message ,name ,email);
  let mailTransport = nodemailer.createTransport(
    {
      service: 'gmail',
      auth: {
        user: "govindpanthi274@gmail.com",
        pass: 'iucfnbwevbljkrgr'
      }
    }
  )

  let details = {
    from: "govindpanthi274@gmail.com",
    to: "nikhilnamdeo7437@gmail.com",
    subject: email,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Subject:</strong> ${subject}</p>
           <p><strong>Message:</strong> ${message}</p>`
  }


  mailTransport.sendMail(details, (err) => {
    if (err) {

        console.log("email ka error");
      console.log(err);
    }
    else {
      console.log("email has sent");
    }
  })

}


module.exports =  {sendEmail} ;