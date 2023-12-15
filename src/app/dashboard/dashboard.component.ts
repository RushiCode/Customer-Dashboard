import { Component } from '@angular/core';

import { CommonService } from '../services/comman.service';

import { AddEditCustomerComponent } from './add-edit-customer/add-edit-customer.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private commonservice: CommonService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {}
  captionmap = new Map();
  public modalOption: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
  };
  newUsers: any = [];
  ngOnInit(): void {
    this.getcustomer();

    console.log(this.newUsers);
    debugger;
    this.commonservice.reset$.subscribe((ele) => {
      if (ele == true) {
        this.getcustomer();
      }
    });
  }

  getcustomer(pageno = 1, isReload = false) {
    this.commonservice.customerList().subscribe((ele: any) => {
      this.newUsers = ele;
    });
  }

  addCustomer() {
    this.modalOption.size = 'md';
    const modalRef = this.modalService.open(
      AddEditCustomerComponent,
      this.modalOption
    );
    modalRef.componentInstance.captiondata = this.captionmap;
    modalRef.componentInstance.onChangeId.subscribe((data: any) => {
      this.getcustomer(1, true);
    });
  }

  editCustomer(id: any) {
    this.commonservice.getCustomerById(id).subscribe((data) => {
      this.modalOption.size = 'md ';
      const modalRef = this.modalService.open(
        AddEditCustomerComponent,
        this.modalOption
      );
      modalRef.componentInstance.data = data;
      modalRef.componentInstance.isEdit = true;
      modalRef.componentInstance.captiondata = this.captionmap;

      modalRef.componentInstance.onChangeId.subscribe((data: any) => {
        this.getcustomer(1, true);
      });
    });
  }

  deleteCustomerid(value:any) {
    this.modalOption.size = "md";
    const modalRef = this.modalService.open(ConfirmComponent, this.modalOption);
    let dataToForm = {
      message: 'Are you sure you want to delete ?',
      title: 'Delete',
    };
    modalRef.componentInstance.popupType = dataToForm;
    modalRef.componentInstance.isConfirmation = true;
    modalRef.result.then((receivedEntry) => {
      if (receivedEntry == "yes") {
      
        this.commonservice.deleteCustomer(value).subscribe(
          (data) => {
            this.toastr.success('deleted successfully');
            this.getcustomer(1, true);
          },
        
        );
      }
    });
  }

  logout() {
    this.modalOption.size = "md";
    const modalRef = this.modalService.open(ConfirmComponent, this.modalOption);
    let dataToForm = {
      message: 'Are you sure you want to log out of your account ?',
      title: 'Logout',
    };
    modalRef.componentInstance.popupType = dataToForm;
    modalRef.componentInstance.isConfirmation = true;
    modalRef.result.then((receivedEntry) => {
      if (receivedEntry == "yes") {
      
        this.router.navigate(['/login']);
      }
    });
  }



}
