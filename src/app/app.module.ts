import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {Routes, RouterModule} from '@angular/router';
import { SrbijaComponent } from './srbija/srbija.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { VisitorsService } from './visitor.service';
import { SideNavService } from './sidenav.service';
import { KoronaService } from './Korona.service';
import { StatistikaService } from './statistika.service';
import { ChartsModule } from 'ng2-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ZemljeFilterPipe } from './zemlje-filter.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UporediComponent } from './uporedi/uporedi.component';
import { DetaljnijeComponent } from './detaljnije/detaljnije.component';
import { FirebaseService } from './firebase.service';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SrbijaComponent,
    ZemljeFilterPipe,
    UporediComponent,
    DetaljnijeComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot([
      {path: '', component:HomeComponent, },
      {path: 'drzava/:country', component:SrbijaComponent},
      {path: 'uporedi', component:UporediComponent},

    ],
      //{path:'covid19', component:DetaljnijeComponent},],    
      {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'},
      
    ),
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    ScrollingModule,
    MatDialogModule,
    MatButtonModule,
    ChartsModule,
    PerfectScrollbarModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  providers: [SideNavService, KoronaService, VisitorsService, StatistikaService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
