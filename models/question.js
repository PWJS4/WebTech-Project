// This class provides all the information for a given question
class Question {
    constructor(question, option_1, option_2, option_3, answer, hint) {
        this.question = question;
        this.option_1 = option_1;
        this.option_2 = option_2;
        this.option_3 = option_3;
        this.answer = answer;
        this.hint = hint;
    }
}