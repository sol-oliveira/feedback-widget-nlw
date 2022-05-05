import { prisma } from '../../prisma';
import { FeedbackCreateData, FeedbacksRepository } from '../feedbacks-repository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({ type, comment, screenShot }: FeedbackCreateData) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenShot,
            }
        });
    }
}