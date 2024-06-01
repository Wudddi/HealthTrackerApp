import {Component, inject} from '@angular/core';
import {RecordDalService} from "../../service/record-dal.service";
import {Router} from "@angular/router";
import {Record} from "../../models/record.model";
import {Food} from "../../models/food.model";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-record-page',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './record-page.component.html',
  styleUrl: './record-page.component.css'
})
export class RecordPageComponent {
  dal: RecordDalService = inject(RecordDalService)
  records: Record[] = []
  router = inject(Router)

  showAll() {
    this.dal.selectAll().then((data) => {
      this.records = data
      console.log(this.records)
    }).catch((e) => {
      console.log(e)
      this.records = []
    })
  }

  constructor() {
    this.showAll()
  }

  onModifyClick(record: Record) {
    this.router.navigate([`/recordDetail/${record.id}`])
  }

  onDeleteClick(record: Record) {
    this.dal.delete(record).then((data) => {
      this.showAll()
      alert("record deleted successfully")
    }).catch((e)=>{
      console.log(e)
    })
  }

  protected readonly Record = Record;
}
