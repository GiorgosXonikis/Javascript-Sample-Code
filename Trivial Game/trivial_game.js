class Trivial {
    constructor() {
        this.questions = [];
        this.players = [];

        // Set player(s)
        this.setPlayer();

    }

    askQuestion = (number) => {
        let answer = window.prompt(`Category: ${this.questions[number].category} \n
            ${this.questions[number].title}
            A: \t ${this.questions[number].choices[0]}
            B: \t ${this.questions[number].choices[1]}
            C: \t ${this.questions[number].choices[2]}`)

        if (answer.toUpperCase() === this.questions[number].correctAnswer) {
            alert('Congratulations! You answered correct!');
            return true;
        } else {
            alert('Sorry wrong answer...');
            return false;
        }
    }

    play = () => {
        if (this.players.length === 1) {
            alert(`Single game it is!!!`);
            alert(`OK ${this.players[0].name}! Press enter to begin!!!`);
            this.playSingle();
        } else {
            alert(`Number of players: ${this.players.length}`);
            alert(`Let's play multi!!!`);
            this.playMulti();
        }

    }


    playSingle = () => {
        let score = 0;
        for (let number = 0; number < this.questions.length; number++) {
            score += this.askQuestion(number);
        }
        alert(`You gave ${score}/${this.questions.length} correct answers `);
    }

    playMulti = () => {
        // variable for players
        let player1 = this.players[0];
        let player2 = this.players[1];
        // store player's score
        let scorePlayer1 = 0;
        let scorePlayer2 = 0;

        // store the answers by category
        let scoreCategory1 = {
            'Geography': 0, 'Sports': 0, 'Tech': 0, 'Politics': 0,
            'History': 0
        }

        let scoreCategory2 = {
            'Geography': 0, 'Sports': 0, 'Tech': 0, 'Politics': 0,
            'History': 0
        }

        // loop to address all the questions in turn 
        for (let number = 0; number < this.questions.length; number += 2) {
            // display the question's category
            alert(`Category: ${this.questions[number].category}`)
            
            // question for player 1
            alert(`Question for ${player1.name}`)
            if (this.askQuestion(number)) {
                scorePlayer1 += 1;
                scoreCategory1[this.questions[number].category] += 1;
            }

            // question for player 2
            alert(`Question for ${player2.name}`)
            if (this.askQuestion(number + 1)) {
                scorePlayer2 += 1;
                scoreCategory2[this.questions[number].category] += 1;
            }
        }

        alert(`${player1.name}, you gave ${scorePlayer1}/${this.questions.length / 2} correct answers `);
        alert('Answers by category \n' + JSON.stringify(scoreCategory1))
        alert(`${player2.name}, you gave ${scorePlayer2}/${this.questions.length / 2} correct answers`);
        alert('Answers by category \n' + JSON.stringify(scoreCategory2))

        if (scorePlayer1 > scorePlayer2) {
            alert(`The winner is ${player1.name}!!!!`)
        } else if (scorePlayer1 === scorePlayer2) {
            alert('We have a tie!!!')
        } else {
            alert(`The winner is ${player2.name}!!!!`)
        }

    }


    addQuestion = (question) => {
        this.questions.push(question)
    };


    addPlayer = (player) => {
        this.players.push(player)
    }

    setPlayer() {
        let numberOfPlayers = prompt(`Type number of players: 1 or 2`);

        if (numberOfPlayers === 1) {
            let player1 = prompt(`Type your name and press Enter`);
            this.addPlayer(new Player(player1));
        } else {
            for (let i = 1; i <= numberOfPlayers; i++) {
                let player = prompt(`Player ${i}, type your name and press Enter`);
                this.addPlayer(new Player(player));
            }

        }
    }



}


class Question {
    constructor(title, choices, correctAnswer, category) {
        this.title = title;
        this.choices = choices;
        this.correctAnswer = correctAnswer;
        this.category = category;
    }
}


class Player {
    constructor(name) {
        this.name = name;
        this.playerId = Player.setID();
    }

    static setID() {
        if (!this.playerId) {
            this.playerId = 1;
        } else {
            this.playerId++;
        }
        return this.playerId;
    }

}

// Game instance
const trivial = new Trivial();

// Questions instances
const q1 = new Question('Which is the capital of Greece?', ['Athens', 'Thessaloniki', 'Zurich'], 'A', 'Geography');
const q2 = new Question('Which is the biggest country in the world?', ['Russia', 'China', 'USA'], 'A', 'Geography')
const q3 = new Question('Which team won the 2018 nba title?', ['Lakers', 'Knicks', 'Warriors'], 'C', 'Sports')
const q4 = new Question('Which city will host the next Olympic Games?', ['London', 'Rome', 'Tokyo'], 'C', 'Sports')
const q5 = new Question('What is Google Chrome?', ['Chocolate', 'Web Browser', 'PC Game'], 'B', 'Tech')
const q6 = new Question('Who is the CEO of Apple?', ['Tim Cook', 'Barrack Obama', 'Sundar Pichai'], 'A', 'Tech')
const q7 = new Question('Which is the president of the USA?', ['Bill Clinton', 'Donald Trump', 'Donald Duck'], 'B', 'Politics')
const q8 = new Question('How many US Presidents were involved in the Vietnam war?', [5, 1, 3], 'A', 'Politics')
const q9 = new Question('Where is the Parthenon located', ['Washington', 'Athens', 'London'], 'B', 'History')
const q10 = new Question('What year the WW2 began?', [1939, 1940, 1941], 'A', 'History')


// Add questions to trivial
trivial.addQuestion(q1);
trivial.addQuestion(q2);
trivial.addQuestion(q3);
trivial.addQuestion(q4);
trivial.addQuestion(q5);
trivial.addQuestion(q6);
trivial.addQuestion(q7);
trivial.addQuestion(q8);
trivial.addQuestion(q9);
trivial.addQuestion(q10);

// Start the game
trivial.play();





