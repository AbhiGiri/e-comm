import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesService } from '@e-comm/products';
import { JwtInterceptor, UsersModule } from '@e-comm/users';


import { CardModule} from 'primeng/card';
import { ToolbarModule} from 'primeng/toolbar';
import { ButtonModule} from 'primeng/button';
import { TableModule} from 'primeng/table';
import { InputTextModule} from 'primeng/inputtext';
import { ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService} from 'primeng/api';
import { ColorPickerModule} from 'primeng/colorpicker';
import { InputNumberModule} from 'primeng/inputnumber';
import { InputTextareaModule} from 'primeng/inputtextarea';
import { DropdownModule} from 'primeng/dropdown';
import { EditorModule} from 'primeng/editor';
import { PaginatorModule} from 'primeng/paginator';
import { TagModule} from 'primeng/tag';
import { InputMaskModule} from 'primeng/inputmask';
import { InputSwitchModule} from 'primeng/inputswitch';
import { FieldsetModule} from 'primeng/fieldset';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

const UX_MODULES = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  DropdownModule,
  EditorModule,
  PaginatorModule,
  TagModule,
  InputMaskModule,
  InputSwitchModule,
  FieldsetModule
];

@NgModule({
  declarations: [AppComponent, CategoriesFormComponent, CategoriesListComponent, DashboardComponent, OrdersDetailComponent, OrdersListComponent, ProductsFormComponent, ProductsListComponent, UsersFormComponent, UsersListComponent, ShellComponent, SidebarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UsersModule,
    ...UX_MODULES
  ],
  providers: [
    CategoriesService, 
    MessageService, 
    ConfirmationService, 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
