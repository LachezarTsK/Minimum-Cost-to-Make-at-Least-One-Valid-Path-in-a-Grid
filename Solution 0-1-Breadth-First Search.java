
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class Solution {

    private record Point(int row, int column, int costFromStart) {}

    private static final int RIGHT_SIGN = 1;
    private static final int LEFT_SIGN = 2;
    private static final int UP_SIGN = 3;
    private static final int DOWN_SIGN = 4;
    private static final int COST_FOR_CHANGING_VALUE_OF_SIGN = 1;
    private static final int[][] MOVES = {{0, 1, RIGHT_SIGN}, {0, -1, LEFT_SIGN}, {1, 0, UP_SIGN}, {-1, 0, DOWN_SIGN}};

    private int rows;
    private int columns;

    public int minCost(int[][] grid) {
        rows = grid.length;
        columns = grid[0].length;
        return _0_1_BreadthFirstSearchForMinCostPath(grid);
    }

    private int _0_1_BreadthFirstSearchForMinCostPath(int[][] grid) {

        Deque<Point> deque = new ArrayDeque<>();
        int[][] minCostPath = new int[rows][columns];
        initializeMinCostPath(minCostPath);

        minCostPath[0][0] = 0;
        deque.offer(new Point(0, 0, 0));

        while (!deque.isEmpty()) {
            Point point = deque.pollFirst();

            for (int[] move : MOVES) {
                int nextRow = point.row + move[0];
                int nextColumn = point.column + move[1];

                if (pointIsInGrid(nextRow, nextColumn)) {
                    int costFromCurrentToNextPoint = grid[point.row][point.column] != move[2] ? COST_FOR_CHANGING_VALUE_OF_SIGN : 0;
                    int costFromStartToNextPoint = minCostPath[point.row][point.column] + costFromCurrentToNextPoint;

                    if (costFromStartToNextPoint < minCostPath[nextRow][nextColumn]) {
                        minCostPath[nextRow][nextColumn] = costFromStartToNextPoint;

                        if (costFromCurrentToNextPoint == 0) {
                            deque.addFirst(new Point(nextRow, nextColumn, costFromStartToNextPoint));
                        } else {
                            deque.addLast(new Point(nextRow, nextColumn, costFromStartToNextPoint));
                        }
                    }
                }
            }
        }
        return minCostPath[rows - 1][columns - 1];
    }

    private void initializeMinCostPath(int[][] minCostPath) {
        for (int row = 0; row < rows; ++row) {
            Arrays.fill(minCostPath[row], Integer.MAX_VALUE);
        }
    }

    private boolean pointIsInGrid(int row, int column) {
        return row < rows && row >= 0 && column < columns && column >= 0;
    }
}
