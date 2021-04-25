'use strict';
const fs = require('fs');
const path = require('path');
const router=require('express').Router();

const fullfile = path.join(__dirname,"../data/json-files/JSON Files")



function init() {
  return fs.readdirSync(fullfile)
           .filter(name => path.extname(name) == '.json')
           .map(name => require(path.join(fullfile, name)));
}
let data=init();
router.get("/jsonData",async(req,res)=>{
   console.log("callde me")
  await res.send(data);
})
console.log(data[2].innings[0]["1st innings"].deliveries.length);
//console.log(data[1].innings[1]["2nd innings"].deliveries[1]["0.2"].batsman);
let m=10,n=20;
//data[1].innings[0]["1st innings"].deliveries.forEach(element => {
   
//});

let count=0;
let players=[];
let runsA=0;
let runsB=0;
for(let k=0;k<data[1].innings[0]["1st innings"].deliveries.length;k++){
   for(let i=0;i<n;i++){
      let m=7;let j=1;
    while(j<m){
     
         if(data[1].innings[0]["1st innings"].deliveries[k][`${i}.${j}`]){
            players.push(data[1].innings[0]["1st innings"].deliveries[k][`${i}.${j}`].batsman);
            players.push(data[1].innings[0]["1st innings"].deliveries[k][`${i}.${j}`].bowler);
            players.push(data[1].innings[0]["1st innings"].deliveries[k][`${i}.${j}`].non_striker);
            count++; 
            runsA=runsA+data[1].innings[0]["1st innings"].deliveries[k][`${i}.${j}`].runs.total;
           }
           j++;
       
    }
   } 
}

//for loopppppp

// for(let k=0;k<data[1].innings[0]["1st innings"].deliveries.length;k++){
//    for(let i=0;i<n;i++){
//       let m=7;
//     for(let j=1;j<m;j++){
//        if(data[1].innings[0]["1st innings"].deliveries[k][`${i}.${j}`]){
//         players.push(data[1].innings[0]["1st innings"].deliveries[k][`${i}.${j}`].batsman);
//         players.push(data[1].innings[0]["1st innings"].deliveries[k][`${i}.${j}`].bowler);
//         players.push(data[1].innings[0]["1st innings"].deliveries[k][`${i}.${j}`].non_striker);
//         count++; 
//         runsA=runsA+data[1].innings[0]["1st innings"].deliveries[k][`${i}.${j}`].runs.total;
//         if(data[1].innings[0]["1st innings"].deliveries[k][`${i}.${j}`].extras){
//          // console.log(data[1].innings[0]["1st innings"].deliveries[k]);
//            console.log("extras adding to m i is",i+"m is"+m);
//          m=m+1;
//         }
//        }
       
//     }
//    } 
// }
// for(let k=0;k<data[2].innings[1]["2nd innings"].deliveries.length;k++){
//     for(let i=0;i<n;i++){
//  for(let j=0;j<m;j++){
//     if(data[2].innings[1]["2nd innings"].deliveries[k][`${i}.${j}`]){
//      players.push(data[2].innings[1]["2nd innings"].deliveries[k][`${i}.${j}`].batsman);
//      players.push(data[2].innings[1]["2nd innings"].deliveries[k][`${i}.${j}`].bowler);
//      players.push(data[2].innings[1]["2nd innings"].deliveries[k][`${i}.${j}`].non_striker);
//      count++; 
//      runsB=runsB+data[2].innings[1]["2nd innings"].deliveries[k][`${i}.${j}`].runs.total;
//     }
    
//  }
// } 
// }
console.log("count",count)
console.log("players count",players.length)
let uniquePlayers=[...new Set(players)];
console.log("unique player count",uniquePlayers.length);
console.log("runs A",runsA);
console.log("runsB",runsB)


module.exports=router;
