const fs = require('fs');
const readline = require('readline');

let rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});
   

let obj = {
    listArr: [], // all to do tasks will be saved in listArr.
    checkMark: '✔', // storing the checkmark as a key/value.
    welcome: '\nWelcome to Todo CLI!\n\n--------------------\n', // greeting on start of todolist program.
    menu: '(v) View • ( n ) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n', // menu will be used every entry 
    currentItem: '', // value of current list entry
    currentMessage: '', // message relative to entry to be outputted every on each entry
    l: '', // letter entered for menu selection
    n: '', // number entered for list index
    // greeting: function() { // 
    //     return `${this.welcome}`;        // if (tempArr[1]) {e();

    // },
    splitInput: function(input) { // this will split up the input into the appropriate keys.
        let tempArr = input.split('')   
        let numArr = []; // if numbers are entered they will be pushed into here.
        this.l = tempArr[0].toLowerCase(); // if valid input then index 0 of tempArr will be a letter.
        if (!isNaN(tempArr.slice(-1))) {         // if last index is a number then push all numbers into numArr
            for (i = 0; i < tempArr.length; i++) {
                if (!isNaN(tempArr[i])) { // 
                    numArr.push(tempArr[i])
                }
            }
        };
        this.n = parseInt(numArr.join('')); // assigning n the value of joined numArr.        
        if (this.l === 'd' || this.l === 'c') { // if delete or complete and second input is incorrect then prompt new input
            if (isNaN(this.n) || this.n > this.listArr.length -1) {
                console.log(`\nIncorrect input.`);
                return this.questionFunc();
            }
        }
        return
    },
    returnMessageFunc: function() { // message given after menu choice input
        if(this.l === 'c' || this.l === 'd') { // kicks in only for delete and create
            let tempStr = this.listArr.slice(this.n, this.n + 1).join('') // assigns the value of line to be created or deleted
            tempStr = tempStr.replace('\n', '');                        // to tempStr
            let tempArr = tempStr.split('] ').slice(-1);
            tempArr = tempArr[0].split('')
            tempArr.pop();
            this.currentItem = tempArr.join('');
        }
        return `\n${this.currentMessage} \"${this.currentItem}\"\n`; // message outputting what has happened
    },
    letterToFunc: function(l, n) { // finds the appropriate function to use for selected minue item
        l = l.toLowerCase();
        if (l === 'v') {
            return this.viewFunc();
        }
        else if (l.startsWith('n')) {
            this.currentMessage = 'Added';
            return this.newFunc();
        }
        else if (l.startsWith('c')) {
            if (this.n === 0 || (this.n >= 0 &&  this.n < this.listArr.length)) {
                // if statement makes sure n is a number and it's not higher than index of listArr
                this.currentMessage = 'Completed'
                return this.completeFunc(n);
            }
            // else {
                // console.log(`\nIncorrect format\n`)
                return // this.questionFunc(n)
            // }
        }
        else if (l.startsWith('d')) {
            if (this.n === 0 || (this.n >= 0 && this.n < this.listArr.length)) {
                // if statement makes sure n is a number and it's not higher than index of listArr
                this.currentMessage = 'Deleted'
                // this.n--
                this.deleteFunc(n)
                return
            }
            // else {
                // console.log(`\nIncorrect format\n`)
                return // this.questionFunc(n)
            // }
        }
        else if (l.startsWith('s')) {
            return this.saveFunc();
        }
        else if (l.startsWith('q')) {
            return this.quitFunc();
        }
        else {
            // this only kicks in if the input is not a valid option
            let result; 
            rl.question(`\nIncorrect input\n\nPlease try again.\n${this.menu}\n`, input => {
                obj.splitInput(input);
                result = obj.letterToFunc(obj.l, obj.n);
            }) 
            return result; // result now hase letterToFunc with correct arguments obtained from user input
        }
    },
    viewFunc: function() {
        if (this.listArr.length === 0) { // kicks in if nothing is entered
            console.log(`\nNothing in your to do list so far.\n`);
            return this.questionFunc();
        }
        else {
            console.log(`\n${this.listArr.join('')}`); // displays existing to do list
            return this.questionFunc();
        }
    },
    newFunc: function() {
        rl.question(`\nWhat would you like to add to your toDo List?\n\n`, input => {
            if (!input) {
                input = 'Learning how to use a to do list'
            }
            obj.currentItem = input;
            let num = obj.listArr.length; // listArr.length before pushing will be the index of input after pushing input
            let itemStr = `\n${num} [] ${input}\n`; // value to be added to listArr
            obj.listArr.push(itemStr);
            console.log(this.returnMessageFunc());
            return this.questionFunc();  
        })
    },
    completeFunc: function(n) {
        let arr = this.listArr[n].split('[]'); // split at brackets so new bracket and check mark can be added
        this.listArr[n] = arr.join(`[${this.checkMark}]`);
        console.log(this.returnMessageFunc());
        return this.questionFunc();
    },
    deleteFunc: function(n) {
        let deletedMessage = this.returnMessageFunc();
        // called returnMessageFunc early so value of list item can be pulled
        // before index gets altered from deleting line item.

        let newToDoListArr = [];                                // creating a new listArr. This is needed to keep the 
        for (let i = 0; i < this.listArr.length; i++) {         // current line number in list after a line at n 
            if (i !== n) {                                      // position is deleted.
                if (i > n) {
                    let tempArr = this.listArr[i].split(' ');
                    tempArr.shift(); // removes old line number from beginning of tempArr 
                    tempArr.unshift(`\n${i - 1}`) // adds new line number to beginning of tempArr
                    newToDoListArr.push(tempArr.join(' '))    
                }
                else {
                    newToDoListArr.push(this.listArr[i]); // pushes lines before n into newToDoListArr unchanged
                }
            }
        }
        this.listArr = newToDoListArr; // listArr is now the value of old listArr but minus old line n
        console.log(deletedMessage);
        return this.questionFunc();
    },
    quitFunc: function() {
        console.log(`\nSee you soon! 😄\n`);
        return rl.close(); // closes out of terminal prompting
    },
    saveFunc: function() {
        let message = `\nWhat file name would you like your ToDo List saved under?\n`;
        message += `If no name is given the default of \"myToDos.json\" will be used.\n\n`;
        rl.question(message, (fileName) => { // prompts user for the name of a file to save to do list under
            if (!fileName) {
                fileName = 'myToDos.json'; // if no filename is given then assigns 'myToDos.json' to fileName
            };
            fs.writeFile(`./${fileName}`, this.listArr.join(''), (err) => { // writes stringafied listArr under fileName
                if (err) {
                    console.log(err);
                    this.questionFunc(); // prompts user to choose from menue again after displaying error message
                }
                console.log(`\nList saved to ${fileName}\n`);
                return this.questionFunc();
            });
        });
    },
    questionFunc: function() {
        rl.question(`${this.menu}\nPlease choose an option.\n\n`, function(option) {
            if (!option) {
                console.log(`Nothing was endered. I will choose "New" for you`)
                option = 'n';
            }
            obj.splitInput(option);
            obj.letterToFunc(obj.l, obj.n);      
        });
    },
    toDoList: function() {
        console.log(this.welcome); // displays welcome message once on startup
        return this.questionFunc(); // calls questionFunc once one startup
    }
};


obj.toDoList();


