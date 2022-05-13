import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EmployeeFormComponent } from './employee-form/employee-form.component';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  constructor(public empService:EmployeeService,public datepipe:DatePipe,public toast:ToastrService) { }
 @ViewChild(EmployeeDetailComponent)emp:EmployeeFormComponent | undefined 
  ngOnInit(): void {
    this.empService.getEmployees().subscribe(data =>{
      this.empService.listEmployee=data
      console.log(data)
    }

    )
   
  }
  populateEmployee(selectedEmployee:Employee)
  {
    console.log(selectedEmployee.doj)
    let df=this.datepipe.transform(selectedEmployee.doj,'yyyy-MM-dd')
    selectedEmployee.doj=df
    console.log('After transform',selectedEmployee.doj)
   this.empService.employeeData=selectedEmployee 
   if(this.emp?.isSlide==='off')
   {
     this.emp.hideShowSlide()
   }
  }
  delete(id:number)
  {
    if(confirm('Are you really want to delete this record?'))
    {
      this.empService.deleteEmployee(id).subscribe(data =>{
        console.log('Record deleted...')
        this.empService.getEmployees().subscribe(data =>{
          this.empService.listEmployee=data
          this.toast.error('Successfully',"Record deleted!!")
         
        }
    
        )
      },err=>{
        console.log('Record not deleted...')
      }
        )
    }
  }
 
}
