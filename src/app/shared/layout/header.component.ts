import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  route: String;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {

  }
  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        this.route = this.router.url;
        if (!this.router.url) {
          return;
        }
        else if (this.router.url === '/') {
          this.route = 'home';
        } else if (this.router.url.indexOf('/login') === 0) {
          this.route = 'admin';
        } else if (this.router.url === '/about') {
          this.route = 'about';
        } else if (this.router.url === '/contact') {
          this.route = 'contact';
        } else if (this.router.url.indexOf('/admin') === 0) {
          this.route = 'admin';
        } 
      });
  }
}
