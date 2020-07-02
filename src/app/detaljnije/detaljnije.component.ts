import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-detaljnije',
  templateUrl: './detaljnije.component.html',
  styleUrls: ['./detaljnije.component.css']
})
export class DetaljnijeComponent implements OnInit {

  constructor(private meta:Meta) {

   }

  ngOnInit() {
    this.meta.addTags([
      {name:'name', content: 'KoronaSrbija - COVID-19 - Detaljnije'},
      {name:'description', content:'Uživo statistika o korona virusu. Pratite broj slučajeva, oporavljenih, umrlih i kritičnih osoba po zemlji ili ukupno u celom svetu. COVID 19.'}
    ])

  }

}
