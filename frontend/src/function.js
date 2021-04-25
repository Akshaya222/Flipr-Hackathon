export const getData=(data)=>{
const inning1 = data["innings"][0];
const inning2 = data["innings"][1];

const deliveries1 = inning1['1st innings']["deliveries"];
const deliveries2 = inning2['2nd innings']["deliveries"];

let balls_delivery1 = [];
let balls_Delivery2 = [];

let c1 = 0, c2 = 0;
let d1=0,d2=0;

for (let i=0; i<deliveries1.length; i++){
  let k = Object.keys(deliveries1[i]);
  let v = Object.values(deliveries1[i]);
  k = k[0];
  v = v[0];
 let temp = c1.toString();
  
  if (c1 <= 9){
    if (temp === k[0]){
      c2 += 1
    }else{
      balls_delivery1.push(c2);
    //  console.log(c1, k);
      c1 += 1;
      c2 = 1;
    }
  }
  else{
    if (temp === k[0]+k[1]){
      c2 += 1;
    }else{
      balls_delivery1.push(c2);
      //console.log(c1, k);
      c1 += 1;
      c2 = 1;
    }
  }
  if (i === deliveries1.length-1){
    balls_delivery1.push(c2);
   // console.log(c1, k);
  }
}

for (let i=0; i<deliveries2.length; i++){
    let k = Object.keys(deliveries2[i]);
    let v = Object.values(deliveries2[i]);
    k = k[0];
    v = v[0];
   let temp = d1.toString();
    
    if (d1 <= 9){
      if (temp === k[0]){
        d2 += 1
      }else{
        balls_Delivery2.push(d2);
      //  console.log(c1, k);
        d1 += 1;
        d2 = 1;
      }
    }
    else{
      if (temp === k[0]+k[1]){
        d2 += 1;
      }else{
        balls_Delivery2.push(d2);
        //console.log(c1, k);
        d1 += 1;
        d2 = 1;
      }
    }
    if (i === deliveries2.length-1){
      balls_Delivery2.push(d2);
     // console.log(c1, k);
    }
  }
  

//  number of balls of each over in an innings 
console.log("balls delivery 1",balls_delivery1);
console.log("balls delivary 2",balls_Delivery2);

// traverse 
let count=0;
for (let i=0; i<balls_delivery1.length; i++){
  for (let j=0; j<balls_delivery1[i]; j++){
    count++;
  }
}
for (let i=0; i<balls_Delivery2.length; i++){
    for (let j=0; j<balls_Delivery2[i]; j++){
       count++;
    }
  }
console.log(count)
     return {
         balls_delivery1,
         balls_Delivery2,
         count
     }
};

export const getPlayers=(data)=>{
    var ans=getData(data);
    let players=[];

    const inning1 = data["innings"][0];
    const inning2 = data["innings"][1];

   const deliveries1 = inning1['1st innings']["deliveries"];
   const deliveries2 = inning2['2nd innings']["deliveries"];
   console.log("delivaeies 1",deliveries2.length);
   let count=0;
           // traverse  1st innings
   for(let k=0;k<deliveries1.length;k++){
    for(let i=0;i<20;i++){
    for(let j=1;j<ans.balls_delivery1[i]+1;j++){
    if(deliveries1[k][`${i}.${j}`]){
        players.push(deliveries1[k][`${i}.${j}`].batsman);
        players.push(deliveries1[k][`${i}.${j}`].bowler);
        players.push(deliveries1[k][`${i}.${j}`].non_striker);
     count++; 
    }
      } } 
 }
           // traverse 2nd innings
           for(let k=0;k<deliveries2.length;k++){
            for(let i=0;i<20;i++){
            for(let j=1;j<ans.balls_Delivery2[i]+1;j++){
            if(deliveries2[k][`${i}.${j}`]){
                players.push(deliveries2[k][`${i}.${j}`].batsman);
                players.push(deliveries2[k][`${i}.${j}`].bowler);
                players.push(deliveries2[k][`${i}.${j}`].non_striker);
             count++; 
            }
              } } 
         }
 
    let uniquePlayers=[...new Set(players)];
    return {
        uniquePlayers
    }
}

export const getInnings=(data)=>{
  var ans=getData(data);
  const inning1 = data["innings"][0];
  const inning2 = data["innings"][1];

 const deliveries1 = inning1['1st innings']["deliveries"];
 const deliveries2 = inning2['2nd innings']["deliveries"];
 console.log("delivaeies 1",deliveries2.length);
 let innings1=[];
 let innings2=[];
         // traverse  1st innings
 for(let k=0;k<deliveries1.length;k++){
  for(let i=0;i<20;i++){
  for(let j=1;j<ans.balls_delivery1[i]+1;j++){
  if(deliveries1[k][`${i}.${j}`]){
    console.log("over is "+i+"ball is "+j)
    deliveries1[k][`${i}.${j}`].over=i;
    deliveries1[k][`${i}.${j}`].ball=j;
     innings1.push(deliveries1[k][`${i}.${j}`])
  }
    } } 
}
         // traverse 2nd innings
         for(let k=0;k<deliveries2.length;k++){
          for(let i=0;i<20;i++){
          for(let j=1;j<ans.balls_Delivery2[i]+1;j++){
          if(deliveries2[k][`${i}.${j}`]){
            deliveries2[k][`${i}.${j}`].over=i;
            deliveries2[k][`${i}.${j}`].ball=j;
             innings2.push(deliveries2[k][`${i}.${j}`])
          }
            } } 
       }
      return {
        innings1,
        innings2
      }  
}