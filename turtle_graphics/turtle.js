let arr = process.argv.slice(2);
const fs = require('fs');

const Turtle = require('./turtle_class')

// -------------------------------------------------------------------------------
// -------------------------  RUN BELOW CODE OR SIMILAR  -------------------------
// -------------------------------------------------------------------------------

//  $ node turtle.js new_turtle.txt t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5-p
//  $ node turtle.js new_turtle.txt t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5-a
//  $ node turtle.js --output=drawing.txt f10-r-f10-r-f10-r-f10
// -------------------------------------------------------------------------------
// ---------------------------  END OF SUGGESTED CODE  ---------------------------
// -------------------------------------------------------------------------------

console.log(`line 17, arr: \"${arr}\"`)
let fileName;
if (arr[1]) {
    console.log(`line 20, arr[1]: \"${arr[1]}\"`)
    console.log(`line 21, arr[0]: \"${arr[0]}\"`)
    let newArr = arr[0].split('=')
    console.log(`line 23, newArr: \"${newArr}\"`)
    fileName = newArr[1] ? newArr[1] : newArr[0] 
    if(newArr[1]) {arr[1] += '-p'}
    arr.shift();
}
console.log(`line 28, fileName: \"${fileName}\"`)

if (arr.length > 0) {
    directionsStr = arr[0];
    console.log(`line 32, directionsStr : \"${directionsStr}\"`)
    const runTurtle = (directionsStr) => {
        let directionsArr = directionsStr.split('-');
        console.log(`line 35, directionsArr: \"${directionsArr}\"`)
        let tom;
        if (directionsArr[0].length > 2) {
            let nums = directionsArr[0].replace(/\D/g, '');
            let arrXY = nums.split('');
            arrXY[0] = parseInt(arrXY[0]);
            arrXY[1] = parseInt(arrXY[1]);
            tom = new Turtle(arrXY[0],arrXY[1]);
            directionsArr.shift()
            console.log(`line 44, directionsArr: \"${directionsArr}\"`)
        }
        else {
            tom = new Turtle(0,0);
        }

        // directionsArr is now be an array with sub arrays of [letter(-number)].
        // the bellow for loop will now iterate through them, splitting them up
        // by letter and number. letters will be compared to functions which will 
        // then be called. if 'f' the number will be used as the argument.
        
        for (let i = 0; i < directionsArr.length; i++) {
            
            let currentLetter = directionsArr[i].slice().replace(/\d/g, '');
            console.log(`line 58, currentLetter: \"${currentLetter}\"`)
            let currentNumber = parseInt(directionsArr[i].slice().replace(/\D/g, ''));
            console.log(`line 60, currentNumber: \"${currentNumber}\"`)
            let funcArr = !isNaN(currentNumber) ? [currentLetter, currentNumber] : [currentLetter]; // changed this line from let funcArr = [currentLetter, currentNumber];
            console.log(`line 62, funcArr: \"${funcArr}\"`)
            // let funcArr = directionsArr[i].split('');
            // funcArr[0] = funcArr[0].toLowerCase();
            if (funcArr[0] === 'f') {
                funcArr.shift();
                tom.forward(parseInt(funcArr.join('')));
                // console.log(`line 54, tom.forward: \"${tom.forward}\"`)
            }
            else if (funcArr[0] === 'r') {
                tom.right();
            }
            else if (funcArr[0] === 'l') {
                tom.left();
            }
            else if (funcArr[0] === 'a') {
                console.log(`line 77, funcArr[0]: \"${funcArr[0]}\"`)
                console.log(`line 78, fileName: \"${fileName}\"`)
                if (fileName) {
                    fs.writeFile(`./${fileName}`, `${tom.allPoints()}`, function(err) {
                        console.log(`line 81, tom.allPoints(): \"${tom.allPoints()}\"`)
                        if(err) {
                            console.log(`line 83, writeFile err: \"${err}\"`)
                            return console.log(err);
                        }
                        console.log(`Drawing written to ${fileName}`)
                    });
                }
                else {
                    console.log(`line 90, else tom.allPoints()`)
                    console.log(tom.allPoints());
                }
            }
            else if (funcArr[0] === 'p') {
                console.log(`line 95, funcArr[0]: \"${funcArr[0]}\"`)
                if (fileName) {
                    console.log(`line 97, fileName: \"${fileName}\"`)
                    fs.writeFile(`./${fileName}`, tom.print(), function(err) {
                        console.log(`line 99, tom.print(): \"${tom.print()}\"`)
                        if(err) {
                            console.log(`101, writeFile err: \"${err}\"`)
                            return console.log(err);
                        }
                        console.log(`Drawing written to ${fileName}`)
                    });
                }
                else {
                    console.log(`line 108`)
                    console.log(tom.print());
                }
            }
        }
    };
    console.log(`line 114, directionsStr: \"${directionsStr}\"`)
    console.log(runTurtle(directionsStr))
}
else {
    console.log(`line 118`)
    const tom = new Turtle(3,3);
    console.log(tom.forward(5).right().forward(8).right().forward(3).left().forward(4).print());
}

// -------------------------------------------------------------------------------
// -------------------------  RUN BELOW CODE OR SIMILAR  -------------------------
// -------------------------------------------------------------------------------

//  $ node turtle.js new_turtle.txt t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5-p
//  $ node turtle.js new_turtle.txt t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5-a
//  $ node turtle.js --output=drawing.txt f10-r-f10-r-f10-r-f10
// -------------------------------------------------------------------------------
// ---------------------------  END OF SUGGESTED CODE  ---------------------------
// -------------------------------------------------------------------------------










// [Homework] Turtle Graphics - Week 2
// Drawing Turtle Graphics Style

// In this homework, you will create a simple drawing program inspired by Turtle Graphics. It will 
// be a much simpler implementation that will only accept right angles (90 degrees). Here's an 
// example of what your program should be able to do by the end:
//  new Turtle(0, 0)
//     .forward(5)
//     .right()
//     .forward(5)
//     .right()
//     .forward(5)
//     .right()
//     .forward(5)
//     .print()

// The above would log the following to the screen:
//   ••••••
//   •       •
//   •       •
//   •       •
//   •       •
//   ••••••

// The above drew a 5 by 5 square.
// Breaking It Down

// Before beginning, you should read all instructions.
// The Turtle

// To begin drawing, your program needs to know where it should begin. Create a Turtle class whose 
// constructor will take two arguments (in order): x & y coordinates. Here are some examples:
// // This turtle begins at position (0, 0) on our fictional 5 by 5 grid.

// new Turtle(0, 0);

// // This is an illustration that is part of the explanation.
// // Your program should not draw it.
// //
// //  0 1 2 3 4
// // 0•─┼─┼─┼─┼
// // 1┼─┼─┼─┼─┼
// // 2┼─┼─┼─┼─┼
// // 3┼─┼─┼─┼─┼
// // 4┼─┼─┼─┼─┼

// // This turtle begins at position (2, 3) on our fictional 5 by 5 grid.

// new Turtle(2, 3);

// //  0 1 2 3 4
// // 0┼─┼─┼─┼─┼
// // 1┼─┼─┼─┼─┼
// // 2┼─┼─┼─┼─┼
// // 3┼─┼─•─┼─┼
// // 4┼─┼─┼─┼─┼
// Moving The Turtle

// Create a forward method that takes a number of steps then updates the Turtle instance with 
// its new position after moving that many steps. Keep track of every movement the turtle makes 
// including the first one.

// For Example:
// // This turtle begins at position (0, 0) on our fictional 5 by 5 grid, then
// // moves forward 3 steps positioning itself at (3, 0) indicated by the `*`
// // on the grid. You should record these 2 positions.

// new Turtle(0, 0).forward(3);

// // Figure of turtle's movement on a grid.
// // LEGEND
// // • – Starting Location
// // * – End Location
// //
// //  0 1 2 3 4
// // 0•---------*─┼
// // 1┼─┼─┼─┼─┼
// // 2┼─┼─┼─┼─┼
// // 3┼─┼─┼─┼─┼
// // 4┼─┼─┼─┼─┼
// Turning The Turtle

// Create a right method that takes zero arguments. When right is called, update the Turtle instance 
// to rotate its facing to the right. A turtle should begin facing east.

// For Example:
// // This turtle begins at position (0, 0), then moves forward 3 steps to (3, 0),
// // then turns right (facing south), then moves 2 steps to (3, 2).

// new Turtle(0, 0).forward(3).right().forward(2);

// // Figure of turtle's movement on a grid.
// // LEGEND
// // • – Starting or in-between locations
// // * – End locations
// //
// //  0 1 2 3 4
// // 0•---------•─┼
// // 1┼─┼─┼─|─┼
// // 2┼─┼─┼─*─┼
// // 3┼─┼─┼─┼─┼
// // 4┼─┼─┼─┼─┼

// Create a left method like right but turns the turtle's facing to the left.

// For Example:
// // This turtle begins at position (0, 4), then moves forward 3 steps to (3, 4),
// // then turns right (facing north), then moves 3 steps to (3, 1).

// new Turtle(0, 4).forward(3).left().forward(3);

// // Figure of turtle's movement on a grid.
// // LEGEND
// // • – Starting or in-between locations
// // * – End locations
// //
// //  0 1 2 3 4
// // 0┼─┼─┼─┼─┼
// // 1┼─┼─┼─*─┼
// // 2┼─┼─┼─|─┼
// // 3┼─┼─┼─|─┼
// // 4•----------•─┼
// All Points

// Create an allPoints method which returns an array containing all coordinates the turtle has walked over.

// For Example:
// const flash = new Turtle(0, 0).forward(3).left().forward(3);

// // Figure of turtle's movement on a grid.
// // LEGEND
// // • – Starting or in-between locations
// // * – End locations
// //
// //  0 1 2 3 4
// // 0┼─┼─┼─┼─┼
// // 1┼─┼─┼─*─┼
// // 2┼─┼─┼─|─┼
// // 3┼─┼─┼─|─┼
// // 4•----------•─┼
// //
// // Flash, the turtle, has walked around the grid quite bit. She's touched at
// // least 7 coordinates.
// //
// // Looking at the grid above, she walked over (0, 4), (1, 4), (2, 4) and (3, 4).
// // After turning left, she walked over (3, 3), (3, 2) and (3, 1). That's 7
// // coordinates. Using the method allPoints on flash should return all these
// // coordinates in an array in the order she walked over them.

// flash.allPoints()

// // returns [ [0, 4], [1, 4], [2, 4], [3, 4], [3, 3], [3, 2], [3, 1] ]
// Print

// Create a print method that draws the path that the turtle walked over as a string and logs it to 
// the console. You should use the array of coordinates returned by .allPoints() as your starting point.

// For Example:
// const flash = new Turtle(0, 0).forward(3).left().forward(3);
// flash.print();

// // -- BEGIN LOG
// //        •
// //        •
// // ••••
// // -- END LOG

// When implementing print, feel free to choose any character you prefer to represent the turtles 
// path instead of # and feel free to choose another one for the background instead of _>.

// Here is another example with alternate characters:
//  new Turtle(0, 4)
//     .forward(3)
//     .left()
//     .forward(3)
//     .right()
//     .forward(5)
//     .right()
//     .forward(8)
//     .right()
//     .forward(5)
//     .right()
//     .forward(3)
//     .left()
//     .forward(3)
//     .print();

// // -- BEGIN LOG
// // □□□□□□□□□□
// // □□□■■■■■■□
// // □□□■□□□□■□
// // □□□■□□□□■□
// // ■■■■□□□□■□
// // □□□□□□□□■□
// // ■■■■□□□□■□
// // □□□■□□□□■□
// // □□□■□□□□■□
// // □□□■■■■■■□
// // -- END LOG
// */
// Stretch
// As A Script

// Make the turtle graphics program usable as a script. It should take a string as a an argument that 
// is seperated by dashes (i.e. ->). This string will contain all turtle commands in abbreviated form:

//     tX,Y for new Turtle where X & Y are numbers representing the starting x & y coordinates. If 
//     this command is not given, begin the turtle at (0, 0).
//     fN for forward where N is a number representing how many units the turtle moves forward.
//     r for right
//     l for left

// Example usage:
// $ node turtle.js t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5
// •••••••••••
// • • •         •
// • • •         •
// • • •         •
// • • •         •
// •••••••••••
// $ node turtle.js f10-r-r-f10-l-f5-l-f10-r-f5-r-f11
// •••••••••••
// •
// •
// •
// •
// •••••••••••
//                 •
//                 •
//                 •
//                 •
// •••••••••••
// Save To a File

// Have your script accept an option --output=[filename<]/code> where [filename] corresponds to the 
// name of a file. If the option is used, write the turtle drawing to the file using fs.writeFile. 
// Notify the user of that the write was completed.

// Example usage:
// $ node --output=drawing.txt f10-r-f10-r-f10-r-f10
// 🐢 Drawing written to drawing.txt