import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { MultiSelectModule } from 'primeng/multiselect';

import { ButtonModule } from 'primeng/button';

import { AutoCompleteModule } from 'primeng/autocomplete';

import { IonicSelectableComponent } from 'ionic-selectable';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    MultiSelectModule,
    ButtonModule,
    AutoCompleteModule,
    IonicSelectableComponent
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
