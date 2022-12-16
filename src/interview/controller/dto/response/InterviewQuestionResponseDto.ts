import { ObjectID } from 'bson';

export class InterviewQuestionResponseDto {
  readonly practiceId: ObjectID;
  readonly questionTitle: string;
  readonly answer: string;
  readonly audioUrl: string;
  readonly correct: boolean;

  constructor(
    practiceId: string,
    questionTitle: string,
    answer: string,
    audioUrl: string,
    correct: boolean,
  ) {
    this.practiceId = new ObjectID(practiceId);
    this.questionTitle = questionTitle;
    this.answer = answer;
    this.audioUrl = audioUrl;
    this.correct = correct;
  }
}
