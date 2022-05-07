import nodemailer from 'nodemailer';
import { env } from 'process';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "3834b1e3af0541",
        pass: "720054fcdc0d90"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {

        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Oliveira Sol <sole-oliveira@hotmail.com>',
            subject,
            html: body,
        })
    };
}

