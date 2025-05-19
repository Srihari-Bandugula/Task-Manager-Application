import { Routes } from '@angular/router';
import { SignUpComponent } from '../authentication/sign-up/sign-up.component';
import { LoginComponent } from '../authentication/login/login.component';
import { AdminLayoutComponent } from '../layouts/admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from '../layouts/admin/admin-dashboard/admin-dashboard.component';
import { ManageTasksComponent } from '../layouts/admin/manage-tasks/manage-tasks.component';
import { CreateTaskComponent } from '../layouts/admin/create-task/create-task.component';
import { TeamMembersComponent } from '../layouts/admin/team-members/team-members.component';
import { UserLayoutComponent } from '../layouts/user/user-layout/user-layout.component';
import { UserDashboardComponent } from '../layouts/user/user-dashboard/user-dashboard.component';
import { UserTasksComponent } from '../layouts/user/user-tasks/user-tasks.component';
import { HomeComponent } from './home/home.component';
import { ViewTaskDetailsComponent } from '../layouts/user/view-task-details/view-task-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      {path: 'manage-tasks',component: ManageTasksComponent},
      { path: 'create-task', component: CreateTaskComponent },
      { path: 'create-task/:taskId', component: CreateTaskComponent },
      { path: 'edit-task/:taskId', component: CreateTaskComponent },
      { path: 'team-members', component: TeamMembersComponent },
    ],
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'my-tasks', component: UserTasksComponent },
      { path: 'task-details/:id', component: ViewTaskDetailsComponent },
    ],
  },
];
