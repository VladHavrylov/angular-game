import {Component, OnDestroy} from '@angular/core';
import {Subject, Subscription, take, takeUntil, timer} from 'rxjs';
import {CongratulationModalComponent} from "../congratulation-modal/congratulation-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy{
  grid: { id: string, color: string }[][] = [];
  playerScore: number = 0;
  computerScore: number = 0;
  currentCellId: string | null = null;
  gameActive: boolean = false;
  // @ts-ignore
  timeLimit: number;
  destroy$ = new Subject<any>();

  constructor(public dialog: MatDialog) {
    this.initializeGrid();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  initializeGrid() {
    this.grid = [];
    for (let row = 0; row < 10; row++) {
      const rowData = [];
      for (let col = 0; col < 10; col++) {
        rowData.push({ id: `${row}-${col}`, color: 'blue' });
      }
      this.grid.push(rowData);
    }
  }

  startGame() {
    this.gameActive = true;
    this.resetScores();
    this.startRound();
  }

  startRound() {
    if (this.playerScore < 10 && this.computerScore < 10) {
      this.highlightRandomCell();
    } else {
      this.endGame();
    }
  }

  highlightRandomCell() {
    this.resetCurrentCell();
    let selectedCell: { id: string, color: string };
    let selectedRowCol: {row: number, col: number}

    do {
      selectedRowCol = this.setRandomCell();
      selectedCell = this.grid[selectedRowCol.row][selectedRowCol.col];
    } while (selectedCell.color !== 'blue');
    this.currentCellId = selectedCell.id;
    selectedCell.color = 'yellow';

    timer(this.timeLimit).pipe(take(1)).subscribe(() => {
      if (this.grid[selectedRowCol.row][selectedRowCol.col].color === 'yellow') {
        this.grid[selectedRowCol.row][selectedRowCol.col].color = 'red';
        this.computerScore++;
        this.startRound();
      }
    });
  }

  setRandomCell(): {row: number, col: number} {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    return  {
      row: row,
      col: col
    }
  }

  resetCurrentCell() {
    if (this.currentCellId) {
      const [row, col] = this.currentCellId.split('-').map(Number);
      if (this.grid[row][col].color === 'yellow') {
        this.grid[row][col].color = 'blue';
      }
    }
  }

  onCellClick(row: number, col: number) {
    if (this.grid[row][col].color === 'yellow') {
      this.grid[row][col].color = 'green';
      this.playerScore++;
      this.startRound();
    }
  }

  resetScores() {
    this.playerScore = 0;
    this.computerScore = 0;
  }

  endGame() {
    setTimeout(() => {
      this.showModal();
    }, 100);
  }

  showModal() {
    let message: string = '';
    if(this.playerScore === 10) {
      message = 'CHIKEN DINNER Human winner'
    }
    if (this.computerScore === 10) {
      message = 'It so close, computer - win'
    }
    const dialogRef = this.dialog.open(
      CongratulationModalComponent,
      {
        data: {
          message: message,
        },
        backdropClass: 'confirmDialogComponent',
        panelClass: 'modal-result',
        hasBackdrop: true,
        height: '200px',
        width: '400px'
      }
    );

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.onDialogClose();
    });

  }

  onDialogClose(): void {
    this.initializeGrid()
    this.gameActive = false;
    this.playerScore = 0;
    this.computerScore = 0;
  }

}
