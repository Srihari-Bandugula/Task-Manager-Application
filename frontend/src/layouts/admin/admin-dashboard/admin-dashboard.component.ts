import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router } from '@angular/router';
import { DashboardService } from '../../../app/shared/services/dashboard.service';
import { UserContextService } from '../../../app/shared/services/user-context.service';
import { DatePipe } from '@angular/common';
import { CustomPiechartComponent } from '../../../app/shared/components/custom-piechart/custom-piechart.component';
import { CustomBarchartComponent } from '../../../app/shared/components/custom-barchart/custom-barchart.component';
import { TaskListComponent } from '../../../app/shared/components/task-list/task-list.component';
import { MatIcon } from '@angular/material/icon';
import { InfoCardComponent } from '../../../app/shared/components/cards/info-card/info-card.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule,InfoCardComponent,CustomPiechartComponent,CustomBarchartComponent,TaskListComponent,MatIcon],
  providers: [DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  user: any; // To hold user information
  dashboardData: any = null;
  pieChartData: any[] = [];
  barChartData: any[] = [];
  greeting: string = '';

  constructor(
    private dashboardService: DashboardService,
    private userContextService: UserContextService,
    private router: Router,private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.user = this.userContextService.getUser();
    this.getDashboardData();
    this.greeting= this.dashboardService.getGreeting();
  }
  getDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe(
      (response) => {
        if (response) {
          this.dashboardData = response;
          this.prepareChartData(response?.charts || null);
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }

  prepareChartData(data: any): void {
    const taskDistribution = data?.taskDistribution || {}; // Ensure taskDistribution is an object
    const taskPriorityLevels = data?.taskPriorityLevels || {}; // Ensure taskPriorityLevels is an object

    // Ensure all values are numbers and fallback to 0 if undefined or null
    this.pieChartData = [
  { name: 'Pending', value: Number(taskDistribution?.Pending) || 0 },
  { name: 'InProgress', value: Number(taskDistribution?.InProgress) || 0 },
  { name: 'Completed', value: Number(taskDistribution?.Completed) || 0 },
  { name: 'All', value: Number(taskDistribution?.All) || 0 } 
];
let formattedString = '[' + this.pieChartData
  .map(item => `{name:'${item.name}',value:${item.value}}`)
  .join(',') + ']';

    this.barChartData = [
      { name: "Low", value: Number(taskPriorityLevels?.Low) || 0 },
      { name: "Medium", value: Number(taskPriorityLevels?.Medium) || 0 },
      { name: "High", value: Number(taskPriorityLevels?.High) || 0 }
    ];
  }
  

  onSeeMore(): void {
    this.router.navigate(['/admin/manage-tasks']);
  }

  formatDate(): string {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'd MMMM yyyy') || '';
  }
  

  addThousandsSeperator(num: number): string {
    // Ensure that num is a valid number before calling toLocaleString
    if (isNaN(num)) {
      return '0'; // Return '0' or any default value when the input is not a valid number
    }
    return num.toLocaleString(); // Properly format the number
  }
  formatNumber(value: number): string {
    return this.addThousandsSeperator(value || 0); // Ensure the value passed is valid
  }
}