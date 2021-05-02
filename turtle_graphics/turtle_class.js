// -------------------------------------------------------------------------------
// -------------------------  RUN BELOW CODE OR SIMILAR  -------------------------
// -------------------------------------------------------------------------------

//  $ node turtle.js new_turtle.txt t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5-p
//  $ node turtle.js new_turtle.txt t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5-a
//  $ node turtle.js --output=drawing.txt f10-r-f10-r-f10-r-f10
// -------------------------------------------------------------------------------
// ---------------------------  END OF SUGGESTED CODE  ---------------------------
// -------------------------------------------------------------------------------


class Turtle {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.arr = [[x,y]];
        this.xy = true;
        this.pm = [1, 1, -1, -1];   // This is not the easiest way, but it works and is probably
    }                               // just too difficultfor mere mortals to understand.

    forward(n) { 
        if (this.xy === true) {
            this.x += this.pm[0];
        }
        else {
            this.y += this.pm[0];
        }
        if(n <= 1) 
        {return this.arr.push([this.x,this.y])}
        else {
            this.arr.push([this.x,this.y])
            n--;
            this.forward(n);
            return this;
    }}

    right() {
        this.xy = this.xy === false;
        let directionValue2 = this.pm.shift();
        this.pm.push(directionValue2);
        return this;
    }

    left() {
        this.xy = this.xy === false;
        let directionValue2 = this.pm.pop();
        this.pm.unshift(directionValue2);
        return this;
    }

    allPoints() {
        return this.arr
    }

    print() {
        let result = '';
        let blankSqr = '☐';
        let mvmtSqr = '✘';
        let xStart = 0;
        let xFinish = 0;
        let yStart = 0;
        let yFinish = 0;
        // (x and y)ToZero are used for filling white spice on the map if the minimum value is 
        // above 0 or max value is below zero.

        // lineArrs is the map itself, where each line will be a sub array within.
        let xToZero;
        let yToZero;
        let lineArrs = [];

        // the bellow loop is to find the min and max x and y locations the turtle visited.

        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i][0] < xStart) {
                xStart = this.arr[i][0];
            }
            if (this.arr[i][0] > xFinish) {
                xFinish = this.arr[i][0];
            }
            if (this.arr[i][1] < yStart) {
                yStart = this.arr[i][1];
            }
            if (this.arr[i][1] > yFinish) {
                yFinish = this.arr[i][1];
            }
        }

        // bellow are if and else statments to find the min value's distance to to zero. 
        // this is to create an imaginary map for turtle movements positioning purposes. 

        if (xStart < 0) {
            xToZero = Math.abs(xStart);
            xStart += xToZero;
            xFinish += xToZero;
        }
        else {
            xToZero = 0;
            xStart = 0;
        }
        if (yStart < 0) {
            yToZero = Math.abs(yStart);
            yStart += yToZero;
            yFinish += yToZero;
        }
        else {
            yToZero = 0;
            yStart = 0;
        }

        // below for loop fills in the map with all empty spaces.

        for (let y = yStart; y <= yFinish; y++) {
            let lineArr = [];
            for (let x = xStart; x <= xFinish; x++) {
                if (x - xToZero === 0 && y - yToZero === 0) {
                    lineArr.push('+');
                } 
                else if (y - yToZero === 0) {
                    lineArr.push('–');
                }
                else if (x - xToZero === 0) {
                    lineArr.push('❘');
                }
                else {
                    lineArr.push(blankSqr);
                }
            }
            lineArrs.push(lineArr)
        }
     
        // bellow for loop finds the x and y values within Turtle.arr which is an
        // array of the turlte's movments. Each  x and y value + (x and y)ToZero is then used 
        // to find that location within the map(lineArrs) and place a movment symbol.
        // Doing it this way I was able to skip creating a sub loop.

        for (let i = 0; i < this.arr.length; i++) {
            let x = this.arr[i][0];
            let y = this.arr[i][1];
            lineArrs[y + yToZero][x + xToZero] = mvmtSqr;
        }
     
        // Below for loop joins map(lineArrs) into a single string
        for (let y = yStart; y <= yFinish; y++) {
           result += lineArrs[Math.abs(y)].join('') + `\n`;
        }
        return result;
    }
    
};

module.exports = Turtle;

// -------------------------------------------------------------------------------
// -------------------------  RUN BELOW CODE OR SIMILAR  -------------------------
// -------------------------------------------------------------------------------

//  $ node turtle.js new_turtle.txt t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5-p
//  $ node turtle.js new_turtle.txt t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5-a
//  $ node turtle.js --output=drawing.txt f10-r-f10-r-f10-r-f10
// -------------------------------------------------------------------------------
// ---------------------------  END OF SUGGESTED CODE  ---------------------------
// -------------------------------------------------------------------------------









