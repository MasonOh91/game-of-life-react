/* @flow */
import React, { Component } from 'react';
import styles from 'components/GameGrid/GameGrid.scss';

type GameGridProps = {
  cells: Array<Array<number>>,
  cellWidth: number
}

export default class GameGrid extends Component<void, GameGridProps, void> {
  static displayName = 'GameGrid';

  constructor(props: GameGridProps) {
    super(props);
  }

  lifeCanvas: any;
  canvasContext: any;

  drawCell(alive: boolean, xpos: number, ypos: number, cellSize: number) {
    const startX = xpos * cellSize;
    const startY = ypos * cellSize;

    this.canvasContext.fillStyle = 'rgba(255, 0, 0, 1)';
    if (alive) {
      this.canvasContext.fillRect(startX, startY, cellSize, cellSize);
    } else {
      this.canvasContext.clearRect(startX, startY, cellSize, cellSize);
    }
  }

  drawCells(nextProps: GameGridProps, cellSize: number) {
    for (let i = 0; i < nextProps.cells.length; i++) {
      for (let j = 0; j < nextProps.cells.length; j++) {
        this.drawCell((nextProps.cells[j][i] === 1), i, j, cellSize);
      }
    }
  }

  drawCanvasGrid(nextProps: GameGridProps) {
    const cellSize = 10;
    const cellTotalSize = nextProps.cellWidth * cellSize;

    this.lifeCanvas.width = cellTotalSize;
    this.lifeCanvas.height = cellTotalSize;
    this.canvasContext = this.lifeCanvas.getContext && this.lifeCanvas.getContext('2d');
    this.canvasContext.clearRect(0, 0, this.lifeCanvas.width, this.lifeCanvas.height);

    this.canvasContext.lineWidth = 1;
    this.canvasContext.strokeStyle = 'rgba(200, 200, 200, 1)';

    // draw the grid
    this.canvasContext.beginPath();
    for (let i = 0; i <= nextProps.cells.length; i++) {
      this.canvasContext.moveTo(i * cellSize, 0);
      this.canvasContext.lineTo(i * cellSize, cellTotalSize);
    }
    for (let j = 0; j <= nextProps.cells.length; j++) {
      this.canvasContext.moveTo(0, j * cellSize);
      this.canvasContext.lineTo(cellTotalSize, j * cellSize);
    }
    this.drawCells(nextProps, cellSize);
    this.canvasContext.stroke();
  }

  componentDidMount() {
    this.drawCanvasGrid(this.props);
  }

  componentWillReceiveProps(nextProps: GameGridProps) {
    if (nextProps !== this.props) {
      this.drawCanvasGrid(nextProps);
    }
  }

  /**
   * a bit of an anti pattern, but we don't need to
   * rerender the canvas, just redraw on it. TODO: investigate
   * faster ways to render canvas in react.
   * @return {[type]} [description]
   */
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={styles.gameGrid}>
        <canvas id="lifeGrid"
          className={styles.lifeGrid}
          ref={(ref) => {
            if (!this.lifeCanvas) {
              this.lifeCanvas = ref;
            }
          }}
        >
          Use Chrome, man!
        </canvas>
      </div>
    );
  }
}
