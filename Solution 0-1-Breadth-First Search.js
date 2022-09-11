
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minCost = function (grid) {
    this.RIGHT_SIGN = 1;
    this.LEFT_SIGN = 2;
    this.UP_SIGN = 3;
    this.DOWN_SIGN = 4;
    this.COST_FOR_CHANGING_VALUE_OF_SIGN = 1;
    this.MOVES = [[0, 1, RIGHT_SIGN], [0, -1, LEFT_SIGN], [1, 0, UP_SIGN], [-1, 0, DOWN_SIGN]];

    this.rows = grid.length;
    this.columns = grid[0].length;

    return _0_1_BreadthFirstSearchForMinCostPath(grid);
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
function _0_1_BreadthFirstSearchForMinCostPath(grid) {

    const deque = new DoubleEndedQueue();//DoubleEndedQueue<Point>
    const minCostPath = Array.from(new Array(this.rows), () => new Array(this.columns).fill(Number.MAX_SAFE_INTEGER));

    minCostPath[0][0] = 0;
    deque.addFront(new Point(0, 0, 0));

    while (!deque.isEmpty()) {
        const point = deque.removeFront();

        for (let move of this.MOVES) {
            let nextRow = point.row + move[0];
            let nextColumn = point.column + move[1];

            if (pointIsInGrid(nextRow, nextColumn)) {
                let costFromCurrentToNextPoint = grid[point.row][point.column] !== move[2] ? this.COST_FOR_CHANGING_VALUE_OF_SIGN : 0;
                let costFromStartToNextPoint = minCostPath[point.row][point.column] + costFromCurrentToNextPoint;

                if (costFromStartToNextPoint < minCostPath[nextRow][nextColumn]) {
                    minCostPath[nextRow][nextColumn] = costFromStartToNextPoint;

                    if (costFromCurrentToNextPoint === 0) {
                        deque.addFront(new Point(nextRow, nextColumn, costFromStartToNextPoint));
                    } else {
                        deque.addBack(new Point(nextRow, nextColumn, costFromStartToNextPoint));
                    }
                }
            }
        }
    }
    return minCostPath[this.rows - 1][this.columns - 1];
}

/**
 * @param {number} row
 * @param {number} column
 * @param {number} costFromStart
 */
function Point(row, column, costFromStart) {
    this.row = row;
    this.column = column;
    this.costFromStart = costFromStart;
}

/**
 * @param {number} row
 * @param {number} column
 * @return {number} 
 */
function pointIsInGrid(row, column) {
    return row < this.rows && row >= 0 && column < this.columns && column >= 0;
}

function QueueNode(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
}

class DoubleEndedQueue {

    constructor() {
        this.size = 0;
        this.front = null;
        this.back = null;
    }

    addFront(value) {
        let node = new QueueNode(value);

        if (this.size === 0) {
            this.front = node;
            this.back = this.front;
        } else {
            this.front.previous = node;
            node.next = this.front;
            this.front = node;
        }
        ++this.size;
    }

    addBack(value) {
        let node = new QueueNode(value);

        if (this.size === 0) {
            this.back = node;
            this.front = this.back;
        } else {
            this.back.next = node;
            node.previous = this.back;
            this.back = node;
        }
        ++this.size;
    }

    removeFront() {
        if (this.size === 0) {
            throw "Container is empty";
        }

        let storeFront = this.front;
        if (--this.size > 0) {
            this.front = this.front.next;
            this.front.previous = null;
        } else {
            this.front = null;
            this.back = null;
        }
        return storeFront.value;
    }

    removeBack() {
        if (this.size === 0) {
            throw "Container is empty";
        }

        let storeBack = this.back;
        if (--this.size > 0) {
            this.back = this.back.previous;
            this.back.next = null;
        } else {
            this.front = null;
            this.back = null;
        }
        return storeBack.value;
    }

    isEmpty() {
        return this.size === 0;
    }
}
