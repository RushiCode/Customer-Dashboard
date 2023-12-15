import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/comman.service';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss'],
})
export class AddEditCustomerComponent {
 
  constructor(
    private fb: FormBuilder,

    private commonserv: CommonService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}
  @Input() data: any;
  @Input() isEdit!: boolean;
  CustomerForm!: FormGroup;
  submitted: boolean = false;

  ngOnInit(): void {
    this.buildCustomerForm();
    debugger;
    if (this.isEdit) {
      if (this.data != null) {
        this.CustomerForm.patchValue({
          first: this.data.first,
          last: this.data.last,
          email: this.data.Email,
          phone: this.data.phone,
        });
      }
    }
  }

  get Customer() {
    return this.CustomerForm.controls;
  }

  buildCustomerForm() {
    this.CustomerForm = this.fb.group({
      first: ['', [Validators.required]],
      last: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  onSave() {
    debugger;
    if (this.data != null) {
      var update = {
        id: this.data.id,
        first: this.CustomerForm.value.first,
        last: this.CustomerForm.value.last,
        Email: this.CustomerForm.value.email,
        phone: this.CustomerForm.value.phone,
      };
      this.commonserv.updatecustomer(update).subscribe((data: any) => {
        this.activeModal.close();
        this.toastr.success('Saved successfully');
        this.commonserv.reset$.next(true);
      });
    } else {
      var add = {
        first: this.CustomerForm.value.first,
        last: this.CustomerForm.value.last,
        Email: this.CustomerForm.value.email,
        phone: this.CustomerForm.value.phone,
      };
      this.commonserv.addCustomer(add).subscribe((data: any) => {
        this.activeModal.close();
        this.toastr.success('Created  successfully');
        this.commonserv.reset$.next(true);
      });
    }
  }
}
