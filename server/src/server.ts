import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.DATABASE_USER,
        pass:  process.env.DATABASE_PASSWORD
    }
});

app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenShot } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenShot,
        }
    })

    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Oliveira Sol <sole-oliveira@hotmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color:#111">`,
            `<p>Feedback</p>`,
            `<p>Tipo: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            // `<p>Screenshot: ${screenshot}`,
            `</div>`
        ].join('\n')
    })

    return res.status(201).json({ data: feedback })
})