const nodemailer = require("nodemailer")
const emailInfo = {
    service:"gmail",
    auth:{
        user:"perssagency@gmail.com",
        pass:"press45@@"
    }
}
const sendMyEmail = async (reciverEmail, text, from, sub)=>{
    try{
        const transporter = await nodemailer.createTransport(emailInfo)
        const mailOptions = {
            from:from,
            to: reciverEmail,
            subject:sub,
            html: text
        }
        await transporter.sendMail(mailOptions)
    }
    catch(e){
        console.log(e.message)
    }
}

module.exports = sendMyEmail