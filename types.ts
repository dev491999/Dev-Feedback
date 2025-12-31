
export interface FeedbackSubmission {
  message: string;
  timestamp: string;
}

export enum AppView {
  FORM = 'FORM',
  SUCCESS = 'SUCCESS',
  ADMIN = 'ADMIN'
}
