import { Component, OnInit, NgZone, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { StatistikaService } from '../statistika.service';
import { KoronaService } from '../Korona.service';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
am4core.useTheme(am4themes_animated);
import { CeiboShare } from 'ng2-social-share';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data = {
    name: 'Koronasrbija.info - COVID19',
    description: 'Uživo statistika o COVID19. Pratite broj slučajeva, oporavljenih, umrlih i kritičnih osoba po zemlji ili ukupno u celom svetu.'
  }


  constructor(private title: Title,
    private meta: Meta,
    private koronaservice: KoronaService,
    private zone: NgZone,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) { }
    
  zemlja: any;
  ukupno: any;
  sveZemlje: any[] = [];
  sveZemljeMapa: any[] = [];
  private lineChart: am4charts.XYChart;

  
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.lineChart) {
        this.lineChart.dispose();
      }
    });
  }


  ngOnInit() {

    this.title.setTitle(this.data.name);
    this.meta.addTags([
      {name:'name', content: 'KoronaSrbija'},
      {name:'description', content:'Uživo statistika o korona virusu. Pratite broj slučajeva, oporavljenih, umrlih i kritičnih osoba po zemlji ili ukupno u celom svetu. COVID 19.'}
    ])


    this.koronaservice.ucitajTotalTimeline().subscribe(data => {
      this.timeLine = data;
    });

    setTimeout(() => {
      this.ucitajTimeline();

    }, 2000);

    this.koronaservice.ucitajUkupno().subscribe(data => {
      this.ukupno = data;
    
    })

    this.ucitajSveZemlje();

  }
  todayCases:number;
  todayDeaths:number;
  todayRecovered:number;
  ucitajSveZemlje() {
    this.koronaservice.ucitajSveZemlje().subscribe(data => {
      this.sveZemlje = data;
      this.sveZemlje.forEach(element => {
        element.naziv = '' + this.countryCodes[element.country]
      });

      this.todayCases = this.calculateSum("todayCases");
      this.todayDeaths = this.calculateSum('todayDeaths')
      this.todayRecovered = this.calculateSum('active')

      //console.log(this.todayCases);

    })
  }

  public fuse: any;
  public fuseResults: any[];
  @ViewChild(PerfectScrollbarComponent, { static: false }) public directiveScroll: PerfectScrollbarComponent;

  pretraga: string;
  sacuvajZemlju(naziv:string){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("drzava", naziv);
    }
  }

  timeLine: any;
  caseDataCases:any = [];
  

  ucitajTimeline() {
    this.caseDataCases = [];
    if (this.lineChart) {
      this.lineChart.dispose();
    }

    Object.keys(this.timeLine).forEach(key => {
      this.caseDataCases.push({
        date: new Date(key),
        slučajeva: this.timeLine[key].cases,
        oporavljenih: this.timeLine[key].recovered,
        umrlih: this.timeLine[key].deaths
      });
    });


    let chart = am4core.create("lineChart", am4charts.XYChart);

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fill = am4core.color("#adb5bd");
    dateAxis.renderer.labels.template.fill = am4core.color("#adb5bd");

    chart = this.createSeriesLine(chart, "#21AFDD", "slučajeva");
    chart = this.createSeriesLine(chart, "#10c469", "oporavljenih");
    chart = this.createSeriesLine(chart, "#ff5b5b", "umrlih");

    chart.data = this.caseDataCases;

    chart.legend = new am4charts.Legend();
    chart.legend.labels.template.fill = am4core.color("#adb5bd");

    chart.cursor = new am4charts.XYCursor();
    this.lineChart = chart;

  }







  calculateSum(index, array = this.sveZemlje) {
    var total = 0
    for (var i = 0, _len = array.length; i < _len; i++) {
      total += array[i][index]
    }
    return total
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


  str: any;
  

 


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


/*

    'greenland': 'grenland',
    'grenada': 'grenada',
    'guadeloupe': 'gvadalupe',
    'guatemala': 'gvatemala',
    'guinea': 'gvineja',
    'guinea-bissau': 'gvineja bisao',
    'guyana': 'gvajana',
    'haiti': 'haiti',
    'honduras': 'honduras',
    'hong kong': 'hongkong',
    'hungary': 'mađarska',
    'iceland': 'island',
    'india': 'indija',
    'indonesia': 'indonezija',
    'iran': 'iran',
    'iraq': 'irak',
    'ireland': 'irska',
    'isle of man': 'ostrvo man',
    'israel': 'izrael',
    'italy': 'italija',
    'ivory coast': 'obala slonovače',
    'jamaica': 'jamajka',
    'japan': 'japan',
    'jordan': 'jordan',
    'kazakhstan': 'kazahstan',
    'kenya': 'kenija',
    'kuwait': 'kuvajt',
    'kyrgyzstan': 'kirgistan',
    'laos': 'laos',
    'latvia': 'letonija',
    'lebanon': 'liban',
    'liberia': 'liberija',
    'libya': 'libija',
    'liechtenstein': 'lihtenštajn',
    'lithuania': 'litvanija',
    'luxembourg': 'luksemburg',
    'ms zaandam': 'ms zaandom',
    'macao': 'makao',
    'madagascar': 'madagaskar',
    'malaysia': 'malezija',
    'maldives': 'maldivi',
    'mali': 'mali',
    'malta': 'malta',
    'martinique': 'martinik',
    'mauritania': 'mauritanija',
    'mauritius': 'mauricijus',
    'mayotte': 'majote',
    'mexico': 'meksiko',
    'moldova': 'moldavija',
    'monaco': 'monako',
    'mongolia': 'mongolija',
    'montenegro': 'crna gora',
    'montserrat': 'montserat',
    'morocco': 'maroko',
    'mozambique': 'mozambik',
    'myanmar': 'mjanmar',
    'namibia': 'namibija',
    'nauru': 'nauru',
    'nepal': 'nepal',
    'netherlands': 'holandija',
    'netherlands antilles': 'nizozemski antili',
    'new caledonia': 'nova kaledonija',
    'new zealand': 'novi zeland',
    'nicaragua': 'nikaragva',
    'niger': 'niger',
    'nigeria': 'nigerija',
    'north macedonia': 'severna makedonija',
    'norway': 'norveška',
    'oman': 'oman',
    'pakistan': 'pakistan',
    'palestine': 'palestina',
    'panama': 'panama',
    'papua new guinea': 'nova gvineja',
    'paraguay': 'paragvaj',
    'peru': 'peru',
    'philippines': 'filipini',
    'poland': 'poljska',
    'portugal': 'portugal',
    'puerto rico': 'portoriko',
    'qatar': 'katar',
    'romania': 'rumunija',
    'russia': 'rusija',
    'rwanda': 'ruanda',
    'réunion': 'reinion',
    's. korea': 'južna koreja',
    'saint kitts and nevis': 'sveti kristof i nevis',
    'saint lucia': 'sveta lucija',
    'saint martin': 'sveti martin',
    'san marino': 'san marino',
    'saudi arabia': 'saudijska arabija',
    'senegal': 'senegal',
    'serbia': 'srbija',
    'seychelles': 'sejšeli',
    'sierra leone': 'sijera leone',
    'singapore': 'singapur',
    'sint maarten': 'sveti martin',
    'slovakia': 'slovačka',
    'slovenia': 'slovenija',
    'somalia': 'somalija',
    'south africa': 'južna afrika',
    'south georgia and sandwich isl.': 'južna džordžija',
    'spain': 'španija',
    'sri lanka': 'šri lanka',
    'st. barth': 'sveti bartelemi',
    'st. vincent grenadines': 'sveti vincent',
    'sudan': 'sudan',
    'suriname': 'surinam',
    'svalbard and jan mayen': 'svalbard',
    'swaziland': 'svazilend',
    'sweden': 'švedska',
    'switzerland': 'švajcarska',
    'syria': 'sirija',
    'taiwan': 'tajvan',
    'tanzania': 'tanzanija',
    'thailand': 'tajland',
    'timor-leste': 'istočni timor',
    'togo': 'togo',
    'trinidad and tobago': 'trinidad i tobago',
    'tunisia': 'tunis',
    'turkey': 'turska',
    'turks and caicos': 'terks i kejkos ostrva',
    'uae': 'ujedinjeni arapski emirati',
    'uk': 'ujedinjeno kraljevstvo',
    'usa': 'sad',
    'uganda': 'uganda',
    'ukraine': 'ukrajina',
    'uruguay': 'urugvaj',
    'uzbekistan': 'uzbekistan',
    'vatican city': 'vatikan',
    'venezuela': 'venecuela',
    'vietnam': 'vijetnam',
    'zambia': 'zambija',
    'zimbabwe': 'zimbabve',*/