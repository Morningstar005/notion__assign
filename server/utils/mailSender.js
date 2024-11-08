const Nodemailer= require("nodemailer")
require("dotenv").config()


const mailSender=async (email,title,body)=>{
   try{
    let transporter = Nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
        logger: true
    });
    
    let info = await transporter.sendMail({
        from: `"StudyNotion - By Hemant Bhatnagar" <${process.env.MAIL_USER}>`,
        to: `${email}`,
        subject: `${title}`,
        html:`${body}`,
    })

    console.log("INFO", info);
    return info;

    
   }catch(err){
    console.log(err.message)
   } 
}

module.exports=mailSender