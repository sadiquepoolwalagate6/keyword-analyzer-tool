import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService, AuthenticationService, ApiCall, Session, LoaderService } from './_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  //data: any = [];
  data = {
    mobileCount: {
      density: '30%',
      h1: '1',
      h2: '5',
      meta: '2',
      others: '6',
      overall: '14',
    },
    laptopCount: {
      density: '5%',
      h1: '0',
      h2: '2',
      meta: '0',
      others: '9',
      overall: '11',
    },
    tvCount: {
      density: '15%',
      h1: '1',
      h2: '6',
      meta: '1',
      others: '2',
      overall: '10',
    }
  }


  model = { url: 'http://team6.test.gate6.com/api/sample.html', Mobile: '', Laptop: '', TV: '' }
  constructor(
    private apiCall: ApiCall,
    private Session: Session,
    private alertService: AlertService,
    private loaderService: LoaderService,
    private http: Http
  ) {


  }
  /*httpGet(theUrl) {
    var xmlhttp = null;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        return xmlhttp.responseText;
      }
    }
    xmlhttp.open("GET", theUrl, false);
    xmlhttp.send();
    console.log(xmlhttp.responseText);
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlhttp.responseText, "text/xml");


    //var xmlDoc = xmlhttp.responseXML;
    var txt = "";
    var x = xmlDoc.getElementsByTagName("h1");
    for (let i = 0; i < x.length; i++) {
      txt += x[i].childNodes[0].nodeValue + "<br>";
    }
    var body = xmlDoc.getElementsByTagName("h1")[0].nodeValue;
    //var count = (body.match(/mobile/g) || []).length;

    console.log(txt);
  }*/
  /*httpGet(theUrl) {
    var QueryURL = theUrl;
    $.getJSON(QueryURL, function (data) {
      console.log(data);

    });
  }*/
  httpGet(theUrl) {
    console.log(theUrl)

    if (this.model.Mobile) {
      this.model.Mobile = 'mobile'
    }
    if (this.model.Laptop) {
      this.model.Laptop = 'laptop'
    }
    if (this.model.TV) {
      this.model.TV = 'tv'
    }

    console.log(this.model);
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    var params = 'page=' + theUrl + '&keywords=' + this.model.Mobile + ',' + this.model.Laptop + ',' + this.model.TV;

    this.http.post('http://team6.test.gate6.com/api/keywordanalyzer.php', params, { headers: headers })
      //this.http.post('http://pocketbirdy.local.gate6.com/api/keywordanalyzer.php', params, { headers: headers })
      .map((response: Response) => response.json())
      .subscribe(result => {
        this.data = result;
        console.dir(this.data.laptopCount.density);
      }
      );
  }
  ngOnInit() {

  }
}
