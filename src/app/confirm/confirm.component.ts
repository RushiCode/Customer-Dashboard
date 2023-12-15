import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  @Input() popupType: any;

  constructor(public activeModal: NgbActiveModal){}
  onSave(data:any) {
    this.activeModal.close('yes');
  }

}
