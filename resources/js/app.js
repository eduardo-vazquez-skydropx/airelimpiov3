import '../css/app.css'

export default class AppGlobal {

    //Limites de contaminantes NOM
    LIM_NOM_PM2=33
    LIM_NOM_PM10=60

    //Limites de contaminantes OMS
    LIM_OMS_PM2=25
    LIM_OMS_PM10=45

    decodeData(data){
        let decodedString =decodeURIComponent(data.replace(/&quot;/g, '"'));
        let dataObject = JSON.parse(decodedString);
        return dataObject
    }
    
    pieChart(canvas,data,limNOM,limOMS,text){
        let good=0;
        let bad=0;
        let veryBad=0;

        data.forEach(ele => {
            if(ele<limOMS){
                good++;
            }else if(ele<limNOM){
                bad++;
            }else{
                veryBad++;
            }

        });

        let dataPM= {
            labels: [
                "Buenos",
                "Malos",
                "Muy Malos",
            ],
            datasets: [
            {
                data: [good, bad, veryBad],
                backgroundColor: [
                    "#38B208",
                    "#FFDB00",
                    "#F90000"
                ]
            }]
        };

        let pieChart = new Chart(canvas, {
            type: 'pie',
            data: dataPM,
            options:{
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Horas buenas, malas y muy malas para '+text
                }
            }
            }
        });
    }

    limitsChart(canvas,data, limNOM,limOMS,text, hours){

        let o=[]
        let n=[]

        hours.forEach(()=>{
            o.push(limNOM)
            n.push(limOMS)
        })


        let dataPM = {
            labels: hours,
            datasets: [
                {
                    label: 'Límite NOM (ug/m^3)',
                    data: o,
                    fill: false,
                    borderColor:'#F90000' ,
                    tension: 0.1
                },{
                    label: 'Límite OMS (ug/m^3)',
                    data: n,
                    fill: false,
                    borderColor: '#33B0FF',
                    tension: 0.1
                },
                {
                    label: 'Niveles de contaminante '+text +' (ug/m^3)',
                    data: data,
                    fill: false,
                    borderColor: '#6AFF33',
                    tension: 0.1
                }
            ]
        };

        let pieChart = new Chart(canvas, {
            type: 'line',
            data: dataPM,
            options:{
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Límites permisibles para '+text
                }
            }
            }
        });

    }
}
