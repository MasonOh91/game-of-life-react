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

  drawCanvasGrid(nextProps: GameGridProps) {
    const canvasContext = this.lifeCanvas.getContext && this.lifeCanvas.getContext('2d');
    canvasContext.clearRect(0, 0, this.lifeCanvas.width, this.lifeCanvas.height);
    const cellSize = 10;
    const cellTotalSize = nextProps.cellWidth * cellSize;

    canvasContext.lineWidth = 1;
    canvasContext.strokeStyle = 'rgba(0, 0, 0, 1)';

    // draw the grid
    canvasContext.beginPath();
    for (let i = 0; i <= nextProps.cells.length; i++) {
      canvasContext.moveTo(i * cellSize, 0);
      canvasContext.lineTo(i * cellSize, cellTotalSize);
    }
    for (let j = 0; j <= nextProps.cells.length; j++) {
      canvasContext.moveTo(0, j * cellSize);
      canvasContext.lineTo(cellTotalSize, j * cellSize);
    }
    canvasContext.stroke();
  }

  drawGeneration() {
    // TODO: jsfiddle
  }

  componentDidMount() {
    this.drawCanvasGrid(this.props);
  }

  componentWillReceiveProps(nextProps: GameGridProps) {
    if (nextProps !== this.props) {
      this.drawCanvasGrid(nextProps);
    }
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
