import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesuresPageRoutingModule } from './mesures-routing.module';

import { MesuresPage } from './mesures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesuresPageRoutingModule
  ],
  declarations: [MesuresPage]
})
export class MesuresPageModule {}
