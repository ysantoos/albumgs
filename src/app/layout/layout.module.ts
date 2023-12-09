import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FeatureModule } from '../feature/feature.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    MaterialModule,
    FeatureModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
