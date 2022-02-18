import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
  
})
export class CalculatorComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    
  }

    resultfound: boolean = false;
    public errorApi = false;
    calculate!: Data;
    question1 = new FormControl('');
    calculateForm = this.formBuilder.group({
      question1: '',
      question2: ''
    }); 
    ngOnInit() {
    }
    onSubmit(): void {
      // Process checkout data here

      console.log('Your request has been submitted', this.calculateForm.value);

      this.calculateFormula();
    }
    calculateFormula(){
  
     this.resultfound=false
    const body = JSON.stringify(this.calculateForm.value);
     this.getResults(body).subscribe(response => {
     console.log(JSON.stringify(response));
     if(response == null) {
      this.errorApi = true
     } else {
     this.calculate = response;
     this.resultfound = true
     }
     console.log(this.errorApi)
     });
    
     console.log(JSON.stringify(this.resultfound))
  
    }

    getResults(request: string) : Observable<Data> {
     const url ="http://localhost:8080/calculator/calculate"
      return this.http.post<Data>(url, request);
    }
  }
  
  interface Data {
    question1: string;
    question2: string;
    result1: number;
    result2: number;
  }

