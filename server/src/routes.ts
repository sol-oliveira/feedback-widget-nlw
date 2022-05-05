import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackUseCase } from './services/submit-feedback-service';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenShot } = req.body;

    const primaFeedbacksRepository = new PrismaFeedbacksRepository() ;
    const nodemailerMailAdapter = new NodemailerMailAdapter(); 

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        primaFeedbacksRepository,  
        nodemailerMailAdapter      
    );

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenShot,
    });

    return res.status(201).send();
});