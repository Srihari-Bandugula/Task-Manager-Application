import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../../app/shared/services/dashboard.service';

import { CustomBarchartComponent } from '../../../app/shared/components/custom-barchart/custom-barchart.component';
import { CustomPiechartComponent } from '../../../app/shared/components/custom-piechart/custom-piechart.component';
import { TaskListComponent } from '../../../app/shared/components/task-list/task-list.component';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../../authentication/auth-service/auth.service';
import { InfoCardComponent } from '../../../app/shared/components/cards/info-card/info-card.component';

@Component({
  selector: 'app-user-dashboard',
  imports: [
    InfoCardComponent,
    CustomPiechartComponent,
    CustomBarchartComponent,
    TaskListComponent,
    DatePipe,CommonModule
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit {
  user: any = null;
  dashboardData: any = null;
  pieChartData: any[] = [];
  barChartData: any[] = [];
  COLORS = ['#8D51FF', '#00B8D8', '#7BCE00'];
  today = new Date();
  greeting: string = '';

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.greeting= this.dashboardService.getGreeting();
    // Fetch user profile when the component initializes
    this.authService.getUserProfile().subscribe(
      (userData) => {
        this.user = userData; // Assign user data to the user variable


        // Once user data is fetched, fetch dashboard data
        this.dashboardService.getUserDashboardData().subscribe((data) => {
          this.dashboardData = data;
          this.prepareChartData(data.charts);
        });
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        // You can handle the error here (e.g., redirect to login if user data is not available)
        this.router.navigate(['/login']);
      }
    );
  }

 prepareChartData(data: any): void {
  this.pieChartData = [
    { name: 'Pending', value: data?.taskDistribution?.Pending || 0 },
    { name: 'InProgress', value: data?.taskDistribution?.InProgress || 0 },
    { name: 'Completed', value: data?.taskDistribution?.Completed || 0 },
    
  ];

  this.barChartData = [
    { name: 'Low', value: data?.taskPriorityLevels?.Low || 0 },
    { name: 'Medium', value: data?.taskPriorityLevels?.Medium || 0 },
    { name: 'High', value: data?.taskPriorityLevels?.High || 0 }
  ];
}

  onSeeMore(): void {
    this.router.navigate(['/admin/tasks']);
  }
}
