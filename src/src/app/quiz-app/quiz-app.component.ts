import { Component, OnInit } from '@angular/core';
import { QuizQuestion } from '../models/quizQuestion';

@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: ['./quiz-app.component.css']
})
export class QuizAppComponent implements OnInit {

  QuizQuestions: QuizQuestion[];
  AnswerShown: boolean = false;
  CurrentQuestionIndex: number = 0;
  score: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.QuizQuestions = [{
      Question: "First Question",
      Answer: "Answer for the first question"
    },
    {
      Question: "Second Question",
      Answer: "Answer for the second question"
    }
  ];
  }

  showAnswer() {
    this.AnswerShown = true;
  }

  checkAnswer(correct: boolean) {
    if (correct) {
      this.score++;
    }

    this.showNextQuestion();

  }

  showNextQuestion() {
    this.AnswerShown = false;
    this.CurrentQuestionIndex++;
  }
}
