import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service'
import { NgForm } from '@angular/forms';
import { User } from '../service/user'
declare var M: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  count
  totalcount:number
  remaining
  constructor(public userservice: UserService) { }
  ngOnInit(): void {
    this.refreshuserlist()
    this.resetForm()
   
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset()
      this.userservice.selectedUser = {
        _id: "",
        name: "",
        from: "",
        to: "",
        phone: null
      }
    }
  }
  onSubmit(form: NgForm) {

    if (form.value._id == "") {
        console.log(this.count)
      this.userservice.postUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshuserlist()
        this.usercount()
        M.toast({ html: "Booking sucessfully", classes: "rounded" })
      })
    
  }
    else {
      this.userservice.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshuserlist()
        M.toast({ html: "Booking Update sucessfully", classes: "rounded" })
      })
    }
  }
  refreshuserlist() {
    this.userservice.getuserList().subscribe((res) => {
      this.userservice.user = res as User[]
    })
  }
 

  onEdit(user: User) {
    this.userservice.selectedUser = user;
  }

  onCancel(_id:string, form:NgForm){
    if(confirm('Are you sure to Cancel the Booking ?')== true){
      this.userservice.deleteUser(_id).subscribe((res)=>{
        this.refreshuserlist();
        this.resetForm(form);
        this.getremainingCount()
        M.toast({ html: "Cancel Booking sucessfully", classes: "rounded" })
      })
    }
  }

  usercount(){
    this.count =this.userservice.getCount()
    this.totalcount=parseInt(this.count)
    
  }
  
  getremainingCount(){
   this.remaining =10-this.totalcount
  }

}


