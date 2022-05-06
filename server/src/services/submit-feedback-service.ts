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
        
        this.handleTest(request);

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
                screenShot ? `<img src="${screenShot}" /> ` : ``,
                
                `</div>`
            ].join('\n')
        })
    }  

     handleTest(request: SubmitFeedbackUseCaseRequest) {

        const { type, comment, screenShot } = request;  

        if (!type) {
            throw new Error('Type is required.');
        }

        if (!comment) {
            throw new Error('Comment is required.');
        }

        if (screenShot && !screenShot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.');
        }
        
    }
}