import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'nilai',
    loadChildren: () =>
      import('./nilai/nilai.module').then((m) => m.NilaiPageModule),
    canLoad: [AuthGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'siswa',
    loadChildren: () =>
      import('./siswa/siswa.module').then((m) => m.SiswaPageModule),
    canLoad: [AuthGuard],
    data: {
      role: 'siswa'
    }
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad : [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
