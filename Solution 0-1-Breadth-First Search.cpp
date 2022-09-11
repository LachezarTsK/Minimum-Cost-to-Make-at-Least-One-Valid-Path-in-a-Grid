
#include <array>
#include <queue>
#include <vector>
using namespace std;

class Solution {

    struct Point {
        int row;
        int column;
        int costFromStart;
        Point(int row, int column, int costFromStart) : row{row}, column{column}, costFromStart{costFromStart}{}
    };

    inline static const int RIGHT_SIGN = 1;
    inline static const int LEFT_SIGN = 2;
    inline static const int UP_SIGN = 3;
    inline static const int DOWN_SIGN = 4;
    inline static const int COST_FOR_CHANGING_VALUE_OF_SIGN = 1;
    inline static const array<array<int, 3>, 4> MOVES{{{0, 1, RIGHT_SIGN}, {0, -1, LEFT_SIGN}, {1, 0, UP_SIGN}, {-1, 0, DOWN_SIGN}}};

    int rows;
    int columns;

public:
    int minCost(vector<vector<int>>& grid) {
        rows = grid.size();
        columns = grid[0].size();
        return dijkstraSearchForMinCostPath(grid);
    }

private:
    int dijkstraSearchForMinCostPath(const vector<vector<int>>& grid) {

        deque<Point> deque;
        vector<vector<int>> minCostPath(rows, vector<int>(columns, INT_MAX));

        minCostPath[0][0] = 0;
        deque.push_back(Point(0, 0, 0));

        while (!deque.empty()) {
            Point point = deque.front();
            deque.pop_front();

            for (const auto& move : MOVES) {
                int nextRow = point.row + move[0];
                int nextColumn = point.column + move[1];

                if (pointIsInGrid(nextRow, nextColumn)) {
                    int costFromCurrentToNextPoint = grid[point.row][point.column] != move[2] ? COST_FOR_CHANGING_VALUE_OF_SIGN : 0;
                    int costFromStartToNextPoint = minCostPath[point.row][point.column] + costFromCurrentToNextPoint;

                    if (costFromStartToNextPoint < minCostPath[nextRow][nextColumn]) {
                        minCostPath[nextRow][nextColumn] = costFromStartToNextPoint;

                        if (costFromCurrentToNextPoint == 0) {
                            deque.push_front(Point(nextRow, nextColumn, costFromStartToNextPoint));
                        } else {
                            deque.push_back(Point(nextRow, nextColumn, costFromStartToNextPoint));
                        }
                    }
                }
            }
        }
        return minCostPath[rows - 1][columns - 1];
    }

    int pointIsInGrid(int row, int column) const {
        return row < rows && row >= 0 && column < columns && column >= 0;
    }
};
