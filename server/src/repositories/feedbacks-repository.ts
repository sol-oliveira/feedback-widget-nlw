export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenShot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}