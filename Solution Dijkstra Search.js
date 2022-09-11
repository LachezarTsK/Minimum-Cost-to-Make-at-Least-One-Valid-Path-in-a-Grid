
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

    return dijkstraSearchForMinCostPath(grid);
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
function dijkstraSearchForMinCostPath(grid) {
    const {PriorityQueue} = require('@datastructures-js/priority-queue');
    const minHeap = new MinPriorityQueue({compare: (x, y) => x.costFromStart - y.costFromStart});//MinPriorityQueue<Point>
    const minCostPath = Array.from(new Array(this.rows), () => new Array(this.columns).fill(Number.MAX_SAFE_INTEGER));

    minCostPath[0][0] = 0;
    minHeap.enqueue(new Point(0, 0, 0));

    while (!minHeap.isEmpty()) {
        const point = minHeap.dequeue();

        for (let move of this.MOVES) {
            let nextRow = point.row + move[0];
            let nextColumn = point.column + move[1];

            if (pointIsInGrid(nextRow, nextColumn)) {
                let costFromCurrentToNextPoint = grid[point.row][point.column] !== move[2] ? this.COST_FOR_CHANGING_VALUE_OF_SIGN : 0;
                let costFromStartToNextPoint = minCostPath[point.row][point.column] + costFromCurrentToNextPoint;

                if (costFromStartToNextPoint < minCostPath[nextRow][nextColumn]) {
                    minCostPath[nextRow][nextColumn] = costFromStartToNextPoint;
                    minHeap.enqueue(new Point(nextRow, nextColumn, costFromStartToNextPoint));
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
