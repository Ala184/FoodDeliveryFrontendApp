import { Component, Input, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as olProj from 'ol/proj';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public map!: Map
  lastLayer: any;
  
  orders: Order[] = [];

  constructor(private ordersService: OrdersService ) { }




  ngOnInit(): void {
    this.map = new Map({
      target: 'map',
      layers:[
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([19.833549, 45.267136]),
        zoom: 10
      })
    });

    var layer = new VectorLayer({
    
      source: new VectorSource({
        features:[ new Feature({ geometry: new Point(olProj.fromLonLat([19.833549, 45.267136])) })]}),
      
        style: new Style({image: new Icon({src: 'https://openlayers.org/en/latest/examples/data/icon.png' })})
      });
    this.lastLayer = layer;
    this.map.addLayer(layer);

      this.ordersService.getOrderBids().subscribe(
        (data)=>{
          this.orders = data;
          console.log("Length is: " + this.orders.length);
        }
      );

    for(var i = 0; i < this.orders.length; i++){
      this.ordersService.getOrdersLatLon(this.orders[i].address).subscribe(
        (data)=>{
          console.log("AAA");
        },
        (err)=>{
          console.log("Error in communication with geoCoding service");
        }
    
      );
    }

    
  }

  

}
