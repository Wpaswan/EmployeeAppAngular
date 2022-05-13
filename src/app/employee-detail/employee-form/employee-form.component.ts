import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(public empService:EmployeeService,public toast:ToastrService) { }
  @ViewChild('checkbox1')checkBox:any
  isSlide:string='off'
  ngOnInit(): void {
    this.empService.getDesignations().subscribe(data=>{
      this.empService.listDesignation=data
      console.log(data)
    })
  }
  submit(form:NgForm)
  {
    this.empService.employeeData.isMarried=form.value.isMarried==true?1:0
    this.empService.employeeData.isActive=form.value.isActive==true?1:0
    if(this.empService.employeeData.id==0)
    this.insertEmployee(form)
    else
    this.updateEmployee(form)
    console.log("form submitted")
  }
  insertEmployee(myform:NgForm)
  {
    this.empService.saveEmployee().subscribe(data=>{
      this.resetForm(myform)
      this.refreshData()
      this.toast.success('Successfully',"New Employee inserted")
      
      
    })
  }
  updateEmployee(myform:NgForm)
  {
    this.empService.updateEmployee().subscribe(data=>{
      this.resetForm(myform)
      this.refreshData()
      this.toast.warning('Successfully',"Record Updated")
      
    })

  }
  resetForm(myform:NgForm)
  {
    myform.form.reset()
    this.empService.employeeData=new Employee()
    this.hideShowSlide()
    
  }
  refreshData()
  {
    this.empService.getEmployees().subscribe(res=>{
      this.empService.listEmployee=res
    })

  }
  hideShowSlide()
  {
    if(this.checkBox.nativeElement.checked)
    {
      this.checkBox.nativeElement.checked=false
      this.isSlide='off'
    }
    else{
      this.checkBox.nativeElement.checked=true
      this.isSlide='on'
    }
  }

}
