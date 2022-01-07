import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesuresPage } from './mesures.page';

const routes: Routes = [
  {
    path: '',
    component: MesuresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesuresPageRoutingModule {}
