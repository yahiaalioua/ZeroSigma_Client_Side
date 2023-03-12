import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }
  chartOption(data:any){
    if(data!=undefined){
      const ChartOptions:any={
        colors : ['#0eb58e'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: [ '#f6f9f5'],
            shadeIntensity: 0.3,
            type: 'vertical',
            opacityFrom: 1,
            opacityTo: 0.5,

          },
        },
        series: [
          {
            name: "My-series",
            data:data.reverse()

          },
        ],
        stroke: {
          curve: "smooth",
          width:3,

        },
        dataLabels: {
          enabled: false
        },
        grid: {
          xaxis: {
              lines: {
                  show: false
              }
          },
          yaxis: {
              lines: {
                  show: false
              },
          }
      },
        chart: {
          toolbar:{
            show:false
          },
          height: 150,
          zoom: {
            enabled: false
          },
          width:'100%',
          type: "area"
        },
        xaxis: {
          labels: {
            show: false,
          },
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          labels: {
            show: false,
          }
        },
        tooltip: {
          custom: function({series, seriesIndex, dataPointIndex, w,}:any){
            var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            return `<div style="height: 3em; width: 8em; background-color: #000000; text-align:center;border:none;">
              <p style="color: white; font-size:10px;margin:0">${data.x}</>
              <p style="color: springgreen; margin:0; font-size:12px"><b> Price: ${data.y}<b> USD</p>
              </div>`
          }
        }
      }
      return ChartOptions
    };
  }
}
