'use strict';

class Cell {
  constructor(cell, row, column) {
    this.cell = cell;
    this.row = row;
    this.column = column;
  }

  clearElement() {
    this.cell.innerText = '';
  }
}

class GameField {
  constructor(cellsField, rQuantity, cQuantity) {
    this.cells = cellsField;
    this.rowsQuantity = rQuantity;
    this.columnsQuantity = cQuantity;
  }

  deleteGroup(target) {
    const currentCell = this.cells.find(item => item.cell === target);
    const group = [currentCell];

    const addCell = (cell) => {
      if (cell.column !== 0) {
        const findedCell = cells.find(
          item => item.column === cell.column - 1 && item.row === cell.row
        );

        add(cell, findedCell);
      }

      if (cell.row !== 0) {
        const findedCell = cells.find(
          item => item.row === cell.row - 1 && item.column === cell.column
        );

        add(cell, findedCell);
      }

      if (cell.column < this.columnsQuantity - 1) {
        const findedCell = cells.find(
          item => item.column === cell.column + 1 && item.row === cell.row
        );

        add(cell, findedCell);
      }

      if (cell.row < this.rowsQuantity - 1) {
        const findedCell = cells.find(
          item => item.row === cell.row + 1 && item.column === cell.column
        );

        add(cell, findedCell);
      }
    };

    function add(current, findedCell) {
      if (findedCell
        && findedCell.cell.innerText === current.cell.innerText
        && !group.includes(findedCell)) {
        group.push(findedCell);
        addCell(findedCell);
      }
    };

    addCell(currentCell);
    group.forEach(item => item.clearElement());
  }
}

const rows = document.querySelectorAll('.field-row');
const cells = [];
const rowsQuantity = rows.length;
const columnsQuantity = rows[0].cells.length;

for (const row of rows) {
  for (const cell of row.cells) {
    const current = new Cell(cell, row.sectionRowIndex, cell.cellIndex);

    cells.push(current);
  }
}

const field = new GameField(cells, rowsQuantity, columnsQuantity);

const deleteHandler = (e) => {
  field.deleteGroup(e.target);
};

document.addEventListener('click', deleteHandler);
