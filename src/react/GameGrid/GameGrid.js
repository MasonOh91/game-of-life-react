/* @flow */
import React, { Component } from 'react';
import styles from 'components/GameGrid/GameGrid.scss';
import { Menu, MenuItem, Popover, Position } from '@blueprintjs/core';

import type { List } from 'immutable';

type GameGridProps = {
  randomizeGridCells: (size: number) => void,
  initGridCells: (key: string) => void,
  cells: List<List<number>>
}

export default class GameGrid extends Component<void, GameGridProps, void> {
  static displayName = 'GameGrid';

  constructor(props: GameGridProps) {
    super(props);
  }

  componentDidMount() {
    this.drawCanvasGrid(this.props);
  }

  componentWillReceiveProps(nextProps: GameGridProps) {
    if (nextProps !== this.props) {
      this.drawCanvasGrid(nextProps);
    }
  }

  lifeCanvas: any;
  canvasContext: any;

  drawCell(alive: boolean, xpos: number, ypos: number, cellSize: number) {
    const startX = xpos * cellSize;
    const startY = ypos * cellSize;

    if (alive) {
      this.canvasContext.fillStyle = 'rgba(255, 0, 0, 1)';
      this.canvasContext.fillRect(startX, startY, cellSize, cellSize);
    } else {
      this.canvasContext.fillStyle = 'rgba(255, 255, 255, 1)';
      this.canvasContext.fillRect(startX, startY, cellSize, cellSize);
    }
  }

  drawCells(nextProps: GameGridProps, cellSize: number) {
    for (let i = 0; i < nextProps.cells.size; i++) {
      for (let j = 0; j < nextProps.cells.size; j++) {
        this.drawCell((nextProps.cells.getIn([j, i]) === 1), i, j, cellSize);
      }
    }
  }

  drawCanvasGrid(nextProps: GameGridProps) {
    const cellSize = 10;
    const cellTotalSize = nextProps.cells.size * cellSize;

    this.lifeCanvas.width = cellTotalSize;
    this.lifeCanvas.height = cellTotalSize;
    this.canvasContext = this.lifeCanvas.getContext && this.lifeCanvas.getContext('2d');
    this.canvasContext.clearRect(0, 0, this.lifeCanvas.width, this.lifeCanvas.height);

    this.canvasContext.lineWidth = 1;
    this.canvasContext.strokeStyle = 'rgba(200, 200, 200, 1)';

    // draw the grid
    this.canvasContext.beginPath();
    for (let i = 0; i <= nextProps.cells.size; i++) {
      this.canvasContext.moveTo(i * cellSize, 0);
      this.canvasContext.lineTo(i * cellSize, cellTotalSize);
    }
    for (let j = 0; j <= nextProps.cells.size; j++) {
      this.canvasContext.moveTo(0, j * cellSize);
      this.canvasContext.lineTo(cellTotalSize, j * cellSize);
    }
    this.drawCells(nextProps, cellSize);
    this.canvasContext.stroke();
  }

  render() {
    return (
      <div className={styles.gameGrid}>
        <Popover content={
          <Menu>
            <MenuItem
              iconName="pt-icon-grid"
              onClick={() => {
                this.props.initGridCells('akitaExample');
              }}
              text="Akita Example"
            />
            <MenuItem
              iconName="pt-icon-flows"
              onClick={() => {
                this.props.initGridCells('gosperGlider');
              }}
              text="Gosper Gliders"
            />
            <MenuItem
              iconName="pt-icon-help"
              onClick={() => {
                this.props.randomizeGridCells(50);
              }}
              text="Randomize Cells"
            />
          </Menu>
        }
          position={Position.BOTTOM}
        >
          <span className="pt-icon-standard pt-icon-cog" />
        </Popover>

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
