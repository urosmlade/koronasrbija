import { Component, OnInit, ViewChild, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { SideNavService } from '../sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { KoronaService } from '../Korona.service';
import { VisitorsService } from '../visitor.service';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Title, Meta } from '@angular/platform-browser';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-srbija',
  templateUrl: './srbija.component.html',
  styleUrls: ['./srbija.component.css']
})
export class SrbijaComponent implements OnInit {

  constructor(public sideNavService: SideNavService,
              private service: KoronaService,
              private visitorsService: VisitorsService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private router: Router,
              private zone: NgZone,
              private route: ActivatedRoute,
              private title: Title,
              private meta: Meta) {}



  opened:boolean;
  virus:any;
  country_name:string ='';
  ipaddress:string = '';
  poslednjeUcitavanje:string;

  ukupno:string;
  novihslucajeva:string;
  ukupnoumrlih:string;
  ukupnooporavljenih:string;
  aktivni:string;
  kriticnih:string;
  vreme:any[];
  aplauzsat:number;
  aplauzmin:number;
  aplauztekst:string;
  zemlja:any;
  b:boolean = false;
  novoumrlih:string;
  ukupnoService:any;
  private lineChart: am4charts.XYChart;

  timeLine:any;
  timeLinetotal:any;

  nazivDrzave:string;
  ngOnInit() {


    this.nazivDrzave = this.route.snapshot.paramMap.get("country").toLowerCase();

    if (isPlatformBrowser(this.platformId)) {

      //this.nazivDrzave = localStorage.getItem("drzava");
      this.nazivDrzave = this.route.snapshot.paramMap.get("country").toLowerCase();
      this.ucitajVirus();

      if (this.nazivDrzave.toLowerCase() == "usa") {
        this.nazivDrzave = "us";
      } else if(this.nazivDrzave.toLowerCase() == "taiwan"){
        this.nazivDrzave = "taiwan*";
      } else if(this.nazivDrzave.toLowerCase() == "isle of man"){
        this.nazivDrzave = "united kingdom";
      } else if(this.nazivDrzave.toLowerCase() == "aruba"){
        this.nazivDrzave = "netherlands";
      } else if(this.nazivDrzave.toLowerCase() == "sint maarten"){
        this.nazivDrzave = "netherlands";
      } else if(this.nazivDrzave.toLowerCase() == "st. vincent grenadines"){
        this.nazivDrzave = "saint vincent and the grenadines";
      } else if(this.nazivDrzave.toLowerCase() == "timor-leste"){
        this.nazivDrzave = "East Timor";
      } else if(this.nazivDrzave.toLowerCase() == "montserrat"){
        this.nazivDrzave = "united kingdom";
      } else if(this.nazivDrzave.toLowerCase() == "gambia"){
        this.nazivDrzave = "gambia, the";
      } else if(this.nazivDrzave.toLowerCase() == "cayman islands"){
        this.nazivDrzave = "united kingdom";
      } else if(this.nazivDrzave.toLowerCase() == "bermuda"){
        this.nazivDrzave = "united kingdom";
      } else if(this.nazivDrzave.toLowerCase() == "greenland"){
        this.nazivDrzave = "denmark";
      } else if(this.nazivDrzave.toLowerCase() == "st. barth"){
        this.nazivDrzave = "saint barthelemy";
      } else if(this.nazivDrzave.toLowerCase() == "congo"){
        this.nazivDrzave = "congo (brazzaville)";
      } else if(this.nazivDrzave.toLowerCase() == "saint martin"){
        this.nazivDrzave = "france";
      } else if(this.nazivDrzave.toLowerCase() == "gibraltar"){
        this.nazivDrzave = "united kingdom";
      } else if(this.nazivDrzave.toLowerCase() == "mayotte"){
        this.nazivDrzave = "france";
      } else if(this.nazivDrzave.toLowerCase() == "bahamas"){
        this.nazivDrzave = "bahamas, the";
      } else if(this.nazivDrzave.toLowerCase() == "french guiana"){
        this.nazivDrzave = "france";
      } else if(this.nazivDrzave.toLowerCase() == "u.s. virgin islands"){
        this.nazivDrzave = "us";
      } else if(this.nazivDrzave.toLowerCase() == "curaçao"){
        this.nazivDrzave = "netherlands";
      } else if(this.nazivDrzave.toLowerCase() == "puerto rico"){
        this.nazivDrzave = "us";
      } else if(this.nazivDrzave.toLowerCase() == "french polynesia"){
        this.nazivDrzave = "france";
      } else if(this.nazivDrzave.toLowerCase() == "ivory coast"){
        this.nazivDrzave = "Cote d'Ivoire";
      } else if(this.nazivDrzave.toLowerCase() == "macao"){
        this.nazivDrzave = "china";
      } else if(this.nazivDrzave.toLowerCase() == "drc"){
        this.nazivDrzave = "congo (kinshasa)";
      } else if(this.nazivDrzave.toLowerCase() == "channel islands"){
        this.nazivDrzave = "united kingdom";
      } else if(this.nazivDrzave.toLowerCase() == "réunion"){
        this.nazivDrzave = "france";
      } else if(this.nazivDrzave.toLowerCase() == "guadeloupe"){
        this.nazivDrzave = "france";
      } else if(this.nazivDrzave.toLowerCase() == "faeroe islands"){
        this.nazivDrzave = "Denmark";
      } else if(this.nazivDrzave.toLowerCase() == "uae"){
        this.nazivDrzave = "United Arab Emirates";
      } else if(this.nazivDrzave.toLowerCase() == "diamond princess"){
        this.nazivDrzave = "australia";
      } else if(this.nazivDrzave.toLowerCase() == "hong kong"){
        this.nazivDrzave = "china";
      } else if(this.nazivDrzave.toLowerCase() == "uk"){
        this.nazivDrzave = "united kingdom";
      } else if(this.nazivDrzave.toLowerCase() == "car"){
        this.nazivDrzave = "central african republic";
      }

    }


    this.service.ucitajTimeline(this.nazivDrzave).subscribe(data=>{
      this.timeLine = data;
    })

    this.service.ucitajTotalTimeline().subscribe(data => {
      this.timeLinetotal = data;
    });


    //this.ucitajVreme();

    this.service.ucitajUkupno().subscribe(data => {
      this.ukupnoService = data;
    })

    setTimeout(() => {
      this.ucitajTimeline();
    }, 2000);

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.lineChart) {
        this.lineChart.dispose();
      }

 
    });
  }

  /*ucitajVreme(){
    this.service.ucitajvreme().subscribe(data=>{
      this.vreme = data;
    });
  }*/


  ucitajVirus(){

    this.service.ucitajDrzavu(this.nazivDrzave).subscribe(data=>{
      this.virus = data;

      setTimeout(() => {
        this.title.setTitle('KoronaSrbija - ' + this.virus.country + ' - Covid19');
        this.meta.addTags([
          {name:'title', content: this.virus.country + " - Koronasrbija.info"},
          {name:'description', content:this.virus.country + 'Uživo statistika o korona virusu. Pratite broj slučajeva, oporavljenih, umrlih i kritičnih osoba po zemlji ili ukupno u celom svetu. COVID 19.'}
        ])
      }, 100);
    });
  }
 
  sacuvajZemlju(zemlja:string){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('zemljaaa',zemlja);
    }
  }



  ucitajZemlju(naziv:any){
    this.zemlja = naziv;
  }


  caseData:any = [];
  ucitajTimeline() {
    //console.log(this.timeLine)

    this.caseData = [];
    if (this.lineChart) {
      this.lineChart.dispose();
    }

    for (let i = 0; i < this.timeLine.data.timeline.length; i++) {
      if(this.timeLine.data.timeline[i].cases != 0){
        this.caseData.push({
          date: new Date(this.timeLine.data.timeline[i].date),
          slučajeva: this.timeLine.data.timeline[i].cases,
          umrlih: this.timeLine.data.timeline[i].deaths,
          oporavljenih: this.timeLine.data.timeline[i].recovered
        })
    }
  }
    
    let chart = am4core.create("lineChart", am4charts.XYChart);
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fill = am4core.color("#adb5bd");
    dateAxis.renderer.labels.template.fill = am4core.color("#adb5bd");

    chart = this.createSeriesLine(chart, "#21AFDD", "slučajeva");
    chart = this.createSeriesLine(chart, "#10c469", "oporavljenih");
    chart = this.createSeriesLine(chart, "#ff5b5b", "umrlih");

    chart.data = this.caseData;

    chart.legend = new am4charts.Legend();
    chart.legend.labels.template.fill = am4core.color("#adb5bd");

    chart.cursor = new am4charts.XYCursor();
    this.lineChart = chart;
  }


  
  




  createSeriesLine(chart, color, type) {
    let name = type.charAt(0).toUpperCase() + type.slice(1);
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = type;
    series.fill = am4core.color(color);
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY} " + name;
    series.tooltip.pointerOrientation = "vertical";
  
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
  
    series.stroke = am4core.color(color);
    series.legendSettings.labelText = name;
    series.tooltip.autoTextColor = false;
    series.tooltip.label.fill = am4core.color("#282e38");
    return chart
  }


  public countries: any = [];
  calculateSum(index, array = this.countries) {
    var total = 0
    for (var i = 0, _len = array.length; i < _len; i++) {
      total += array[i][index]
    }
    return total
  }



  public countryCodes = {
    'Afghanistan': 'Avganistan',
    'Albania': 'Albanija',
    'Algeria': 'Alžir',
    'Andorra': 'Andora',
    'Angola': 'Angola',
    'Anguilla': 'Angvila',
    'Antigua and Barbuda': 'Antigva i Barbuda',
    'Argentina': 'Argentina',
    'Armenia': 'Jermenija',
    'Aruba': 'Aruba',
    'Australia': 'Australija',
    'Austria': 'Austrija',
    'Azerbaijan': 'Azerbejdžan',
    'Bahamas': 'Bahami',
    'Bahrain': 'Bahrein',
    'Bangladesh': 'Bangladeš',
    'Barbados': 'Barbados',
    'Belarus': 'Belorusija',
    'Belgium': 'Belgija',
    'Belize': 'Belize',
    'Benin': 'Benin',
    'Bermuda': 'Bermuda',
    'Bhutan': 'Butan',
    'Bolivia': 'Bolivija',
    'Bosnia and Herzegovina': 'Bosna i Hercegovina',
    'Botswana': 'Bocvana',
    'Bouvet Island': 'Buve',
    'Brazil': 'Brazil',
    'British Virgin Islands': 'Devičanska ostrva',
    'Brunei': 'Brunej',
    'Bulgaria': 'Bugarska',
    'Burkina Faso': 'Burkina Faso',
    'Burundi': 'Burundi',
    'CAR': 'Centralnoafrička Republika',
    'Cabo Verde': 'Zelenortska Ostrva',
    'Cambodia': 'Kambodža ',
    'Cameroon': 'Kamerun',
    'Canada': 'Kanada',
    'Caribbean Netherlands': 'Karipska Nizozemska',
    'Cayman Islands': 'Kajmanski Otoci',
    'Chad': 'Čad',
    'Channel Islands': 'Kanalska ostrva',
    'Chile': 'Čile',
    'China': 'Kina',
    'Christmas Island': 'Božićni otok',
    'Cocos (Keeling) Islands': 'Kokosovi Otoci',
    'Colombia': 'Kolumbija',
    'Congo': 'Kongo',
    'Costa Rica': 'Kostarika',
    'Croatia': 'Hrvatska',
    'Cuba': 'Kuba',
    'Curaçao': 'Kurasao',
    'Cyprus': 'Kipar',
    'Czechia': 'Češka',
    'DRC': 'Demokratska Republika Kongo',
    'Denmark': 'Danska ',
    'Diamond Princess': 'Diamond Princess',
    'Djibouti': 'Džibuti',
    'Dominica': 'Dominika',
    'Dominican Republic': 'Dominikanska Republika',
    'Ecuador': 'Ekvador',
    'Egypt': 'Egipat',
    'El Salvador': 'Salvador',
    'Equatorial Guinea': 'Ekvatorijalna Gvineja',
    'Eritrea': 'Eritreja',
    'Estonia': 'Estonija',
    'Eswatini': 'Svazilend',
    'Ethiopia': 'Etiopija',
    'Faeroe Islands': 'Farska Ostrva',
    'Fiji': 'Fidži',
    'Finland': 'Finska',
    'France': 'Francuska',
    'French Guiana': 'Francuska Gvajana',
    'French Polynesia': 'Francuska Polinezija',
    'French Southern Territories': 'Francuske Južne Teritorije',
    'Gabon': 'Gabon',
    'Gambia': 'Gambija',
    'Georgia': 'Gruzija',
    'Germany': 'Nemačka',
    'Ghana': 'Gana',
    'Gibraltar': 'Gibraltar',
    'Greece': 'Grčka',
    'Greenland': 'Grenland',
    'Grenada': 'Grenada',
    'Guadeloupe': 'Gvadalupe',
    'Guatemala': 'Gvatemala',
    'Guinea': 'Gvineja',
    'Guinea-Bissau': 'Gvineja Bisao',
    'Guyana': 'Gvajana',
    'Haiti': 'Haiti',
    'Honduras': 'Honduras',
    'Hong Kong': 'Hongkong',
    'Hungary': 'Mađarska',
    'Iceland': 'Island',
    'India': 'Indija',
    'Indonesia': 'Indonezija',
    'Iran': 'Iran',
    'Iraq': 'Irak',
    'Ireland': 'Irska',
    'Isle of Man': 'Ostrvo Man',
    'Israel': 'Izrael',
    'Italy': 'Italija',
    'Ivory Coast': 'Obala Slonovače',
    'Jamaica': 'Jamajka',
    'Japan': 'Japan',
    'Jordan': 'Jordan',
    'Kazakhstan': 'Kazahstan',
    'Kenya': 'Kenija',
    'Kuwait': 'Kuvajt',
    'Kyrgyzstan': 'Kirgistan',
    'Laos': 'Laos',
    'Latvia': 'Letonija',
    'Lebanon': 'Liban',
    'Liberia': 'Liberija',
    'Libya': 'Libija',
    'Liechtenstein': 'Lihtenštajn',
    'Lithuania': 'Litvanija',
    'Luxembourg': 'Luksemburg',
    'MS Zaandam': 'MS Zaandom',
    'Macao': 'Makao',
    'Madagascar': 'Madagaskar',
    'Malaysia': 'Malezija',
    'Maldives': 'Maldivi',
    'Mali': 'Mali',
    'Malta': 'Malta',
    'Martinique': 'Martinik',
    'Mauritania': 'Mauritanija',
    'Mauritius': 'Mauricijus',
    'Mayotte': 'Majote',
    'Mexico': 'Meksiko',
    'Moldova': 'Moldavija',
    'Monaco': 'Monako',
    'Mongolia': 'Mongolija',
    'Montenegro': 'Crna Gora',
    'Montserrat': 'Montserat',
    'Morocco': 'Maroko',
    'Mozambique': 'Mozambik',
    'Myanmar': 'Mjanmar',
    'Namibia': 'Namibija',
    'Nauru': 'Nauru',
    'Nepal': 'Nepal',
    'Netherlands': 'Holandija',
    'Netherlands Antilles': 'Nizozemski Antili',
    'New Caledonia': 'Nova Kaledonija',
    'New Zealand': 'Novi Zeland',
    'Nicaragua': 'Nikaragva',
    'Niger': 'Niger',
    'Nigeria': 'Nigerija',
    'North Macedonia': 'Severna Makedonija',
    'Norway': 'Norveška',
    'Oman': 'Oman',
    'Pakistan': 'Pakistan',
    'Palestine': 'Palestina',
    'Panama': 'Panama',
    'Papua New Guinea': 'Nova Gvineja',
    'Paraguay': 'Paragvaj',
    'Peru': 'Peru',
    'Philippines': 'Filipini',
    'Poland': 'Poljska',
    'Portugal': 'Portugal',
    'Puerto Rico': 'Portoriko',
    'Qatar': 'Katar',
    'Romania': 'Rumunija',
    'Russia': 'Rusija',
    'Rwanda': 'Ruanda',
    'Réunion': 'Reinion',
    'S. Korea': 'Južna Koreja',
    'Saint Kitts and Nevis': 'Sveti Kristof i Nevis',
    'Saint Lucia': 'Sveta Lucija',
    'Saint Martin': 'Sveti Martin',
    'San Marino': 'San Marino',
    'Saudi Arabia': 'Saudijska Arabija',
    'Senegal': 'Senegal',
    'Serbia': 'Srbija',
    'Seychelles': 'Sejšeli',
    'Sierra Leone': 'Sijera Leone',
    'Singapore': 'Singapur',
    'Sint Maarten': 'Sveti Martin',
    'Slovakia': 'Slovačka',
    'Slovenia': 'Slovenija',
    'Somalia': 'Somalija',
    'South Africa': 'Južna Afrika',
    'South Georgia And Sandwich Isl.': 'Južna Džordžija',
    'Spain': 'Španija',
    'Sri Lanka': 'Šri Lanka',
    'St. Barth': 'Sveti Bartelemi',
    'St. Vincent Grenadines': 'Sveti Vincent',
    'Sudan': 'Sudan',
    'Suriname': 'Surinam',
    'Svalbard And Jan Mayen': 'Svalbard',
    'Swaziland': 'Svazilend',
    'Sweden': 'Švedska',
    'Switzerland': 'Švajcarska',
    'Syria': 'Sirija',
    'Taiwan': 'Tajvan',
    'Tanzania': 'Tanzanija',
    'Thailand': 'Tajland',
    'Timor-Leste': 'Istočni Timor',
    'Togo': 'Togo',
    'Trinidad and Tobago': 'Trinidad i Tobago',
    'Tunisia': 'Tunis',
    'Turkey': 'Turska',
    'Turks And Caicos': 'Terks i Kejkos Ostrva',
    'UAE': 'Ujedinjeni Arapski Emirati',
    'UK': 'Ujedinjeno Kraljevstvo',
    'USA': 'SAD',
    'Uganda': 'Uganda',
    'Ukraine': 'Ukrajina',
    'Uruguay': 'Urugvaj',
    'Uzbekistan': 'Uzbekistan',
    'Vatican City': 'Vatikan',
    'Venezuela': 'Venecuela',
    'Vietnam': 'Vijetnam',
    'Zambia': 'Zambija',
    'Zimbabwe': 'Zimbabve',
  };











}
