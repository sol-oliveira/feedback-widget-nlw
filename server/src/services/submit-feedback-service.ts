import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenShot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
       
    ) { }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenShot } = request;     

        await this.feedbacksRepository.create({
            type,
            comment,
            screenShot,
        });
        
        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color:#111">`,
                `<p>Feedback</p>`,
                `<p>Tipo: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                // `<p>Screenshot: ${screenshot}`,
                `</div>`
            ].join('\n')
        })
    }  
}