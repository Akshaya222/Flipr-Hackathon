import React,{useState,useEffect} from 'react';
import {getData,getInnings} from '../../function';
import axios from 'axios'
import './score.css';
import {navigate} from '@reach/router'

const ScoreBoard = () => {

    const [match,setMatch]=useState("");
    const [data,setData]=useState("");
    const [bowlerData,setBowlerData]=useState("")
    const [batting,setBatting]=useState("");
    const [team,setTeam]=useState("")
    const [credits,setCredits]=useState(0);
    useEffect(()=>{
        let match=JSON.parse(sessionStorage.getItem("match"));
        setMatch(match)
        let output=getInnings(match);
        let teams=JSON.parse(sessionStorage.getItem("teams"))
        setTeam(teams[teams.length-1])
          //retrive event excel sheet from backend
      axios.get("http://localhost:3007/eventData").then((res)=>{
          console.log("event dataaaa",res.data)
        setBowlerData(res.data);
      }).catch((error)=>{
        alert("unable to retrive data");
      });
      console.log("teams re",teams[teams.length-1])
        displayData(output.innings1,output.innings2,match)
    },[])

    const getCredit = (userSelectedPlayer, balls,userCredit) => {
       console.log("user selected players",userSelectedPlayer)
        // cap is captain and vc is vice captain
        let cap=userSelectedPlayer.find((item)=>item.type=="c");
        cap=cap.player;
        let vc=userSelectedPlayer.find((item)=>item.type=="v")
        vc=vc.player
      //items.findIndex(x => x.player ==player.player);
        for (let i=0; i<balls.length; i++){
          if (balls[i].wicket){
          let  points = 1;
            // console.log(balls[i].wicket.kind);
            points = findBowlerPoint(bowlerData, balls[i].wicket.kind);
            points = parseInt(points);
            if (userSelectedPlayer.findIndex(x=>x.player==balls[i].bowler)>=0){
              if (balls[i].bowler === cap){userCredit += 2*points;} 
              else if (balls[i].bowler === vc){userCredit += 1.5*points;}
              else{userCredit += 1*points;}
            }
          }
      
          else{
            if (balls[i].runs.total > 0){
              if (userSelectedPlayer.findIndex(x=>x.player==balls[i].batsman)>=0){
                if (balls[i].batsman === cap){userCredit += 2*balls[i].runs.total;} 
                else if (balls[i].batsman === vc){userCredit += 1.5*balls[i].runs.total;}
                else{userCredit += 1*balls[i].runs.total;}
              }
            }
          }
        }
        return userCredit;
      };

    function findBowlerPoint(pointTable, kind){
        let point = 0;
        for (let k=0; k<pointTable.length; k++){
          if (kind === pointTable[k].Events){
            point = pointTable[k].Points;
            break;
          }
        }
        return point;
      };

    const displayData=(innings1,innings2,match)=>{
  setBatting(match["innings"][0]['1st innings'].team)
        for (let i=0; i<=innings1.length-1; i++) {
            setTimeout(() => {
              setData(innings1[i]) 
              if(i==innings1.length-1){
                   creditHandler(innings1,innings2,match)
              }
            }, 5000 * i);
          }
       
    }

    const creditHandler=(innings1,innings2,match)=>{
        let userCredits=getCredit(team.players,innings1,team.credits)
        setCredits(userCredits)
        alert("2nd innings starts after 20 seconds")
        setData("")
        setTimeout(()=>{secondInnings(innings2,match,userCredits)},20000)
    }


    const secondInnings=(innings2,match,credits)=>{
        setBatting(match["innings"][1]['2nd innings'].team);
         for (let i=0; i<=innings2.length-1; i++) {
            setTimeout(() => {
              setData(innings2[i])
               if(i==innings2.length-1){
                let userCredits=getCredit(team.players,innings2,credits)
                setCredits(userCredits)
               }
            }, 5000 * i);
          }

    }

    if(!match){
        return (
            <h1>Loading....</h1>
        )
    }
    else{
     return (    
    <div className="scoreBoard">
        <div  className="header">
        <h1> <b>Rythm Dream11 </b> Destination</h1>
        <div class="ipl-image">
           <img  src="/images/IPL.jpg" alt=""/>
          <h3>{match.info.teams[0]} VS {match.info.teams[1]}</h3>
        </div>
        <p style={{color:'#fff',textAlign:'center',marginTop:"10px"}}>User credit value updates after the respective innings</p>
        <div className="main-container">
        <div className="container">
             <div  className="left-board">
                <div className="batsman">
                    <span >{batting.slice(0,20)}</span>
                    <div>
                        <p className="players">{data.batsman} * <br/>{data.non_striker}</p>
                    </div>    
                </div>
            </div>
            <div className="middle-board">
                <p style={{fontWeight:500,fontSize:'28px'}}>{data.over}.{data.ball}</p>
               {
                   /*
                    <span >Needs 50 of 65 to win</span>
                   */
               }
            </div>
            <div className="right-board">
                <div className="baller">
                    <p>{data.bowler}</p>
                </div>
            </div>
            </div>
          <div className="container2">
            <div className="right2-board">
                <div className="fantasy">
                    <p className="myscore">MY SCORE</p>
                    
                </div>
                <div className="fantasy">
                    <h2 className="score"> <b>{credits || team.credits}</b> </h2>
                </div>
            </div>
        </div>
        </div>
        </div>
    </div>
    )
}
}

export default ScoreBoard
