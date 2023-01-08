import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { OrdersService } from '../services/orders.service';
import { DetailsService } from '../services/details.service';

//////
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
import { NominatimService } from '../services/nominatim.service';
import { MapPoint } from '../models/map-point.model';
import {fromLonLat} from 'ol/proj';
import { NominatimResponse } from '../models/nominatim-response.model';
///////

@Component({
  selector: 'app-orders-on-wait',
  templateUrl: './orders-on-wait.component.html',
  styleUrls: ['./orders-on-wait.component.css']
})
export class OrdersOnWaitComponent implements OnInit {

  //////////
  public map!: Map
  lastLayer: any;
  /**/
  mapPoint!: MapPoint;
  response: NominatimResponse = new NominatimResponse(0,0,'');
  lat:number=0;
  lon:number=0;
  /**/
  //////////

  deliverersId: number = -1;
  data: any;

  orders: Order[] = [];
  
  constructor(private ordersService: OrdersService, private toastr: ToastrService, private router: Router,private detailsService: DetailsService, private nominatimService: NominatimService) { }

  ngOnInit(): void {
    
    this.getDeliverersId();
    this.getOrderBids();
    


  }
  
  getDeliverersId(){
    this.data = sessionStorage.getItem('token');
    const tokenPayload = JSON.parse(atob(this.data.split('.')[1]));
    this.deliverersId = Number(tokenPayload["ID"]);
  }

  getOrderBids(){
    this.ordersService.getOrderBids().subscribe(
    data=>{
        this.orders = data;
        //////////
        this.map = new Map({
          target: 'map',
          layers: [
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
          
            style: new Style({image: new Icon({src: 'assets/images/restaurant.png' })})
        });
        this.lastLayer = layer;
        this.map.addLayer(layer);

        this.orders.forEach(obj=>{
          this.nominatimService.addressLookup(obj.address).subscribe( results =>{
            this.response = results[0];
            this.lat=Number(results[0].latitude);
            this.lon=Number(results[0].longitude);
            
            this.updateMapPoint(this.lat,this.lon, results[0].displayName);
            this.createMarker(obj.id.toString());
          })
        });

        this.map.on('click', (evt)=>{
          var feature = this.map?.forEachFeatureAtPixel(evt.pixel, function(feature){
            return feature;
          });
          if (feature){
            let featType = (feature as Feature).getProperties();
            if (Number(featType['identifierName']) > -1)
              this.orderDetails(Number(featType['identifierName']));
          }
        });

        //////////
      },
      error=>{
        alert(error);
      }    
    )
  }

  takeOrder(orderId: number){
    this.ordersService.takeOrder(orderId, this.deliverersId).subscribe(
      result=>{
        this.toastr.success("Uspešno ste preuzeli dostavu.");
        this.router.navigate(['/deliverersCurrentOrder']);
      },
      error =>
      {
        this.toastr.error("Ups, došlo je do greške. Molimo pokušajte ponovo.");
      }
      

    )
  }

  orderDetails(orderId: number){
    this.detailsService.changeMessage(orderId);
    this.router.navigate(["/orderDetails"]);
  }

  generateMap(){
    
  }

  private updateMapPoint(latitude: number, longitude: number, name?:string){
    this.mapPoint = {
      latitude: latitude,
      longitude: longitude,
      name: name ? name : this.mapPoint.name
    };
  }

  private createMarker (orderId: string){
    const coordinates = fromLonLat([this.mapPoint.longitude, this.mapPoint.latitude]);
    
    var layer = new VectorLayer({
      source: new VectorSource({
        features:[
          new Feature({
            geometry: new Point(coordinates),
            identifierName: orderId
          })
        ]
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'assets/images/delivery.png',
        })
      })
    });
    this.map?.addLayer(layer);
    this.lastLayer = layer;
  }

}
