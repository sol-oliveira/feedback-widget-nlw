import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenShot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
       
    ) { }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenShot } = request;     

        await this.feedbacksRepository.create({
            type,
            comment,
            screenShot,
        })       
    }
}