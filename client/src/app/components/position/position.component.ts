import {Component, OnInit} from '@angular/core';
import {Position} from '../../core/models/position.interface';
import {DataService} from '../../core/services/data.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit {

  public PositionsData: Position[] | undefined;

  public constructor(
    private dataService: DataService,
  ) {
  }

  public ngOnInit() {
    this.dataService.positionsData$.asObservable().subscribe((data) => {
      this.PositionsData = data;
    });
  }

}
