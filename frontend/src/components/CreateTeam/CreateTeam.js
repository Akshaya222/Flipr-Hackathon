import React,{useState,useEffect} from 'react';
import {getData,getPlayers} from '../../function';
import axios from 'axios';
import './player.css'
import { navigate } from '@reach/router';

const CreateTeam = () => {
    const [match,setMatch]=useState("");
    const [team,setTeam]=useState([]);
    const [newData,setNewData]=useState([{}]);
    const [change,setChange]=useState(false)
    const [credits,setCredits]=useState(100);
    const [user,setUser]=useState("")
   useEffect(() => {
       const data=JSON.parse(sessionStorage.getItem("match"));
       const user=JSON.parse(sessionStorage.getItem("user"));
       setUser(user)
       setMatch(data);
      var {uniquePlayers}= getPlayers(data);
     getUniquePlayers(uniquePlayers);
    }, [change])

    const randomNumber=(playersData)=>{
       return Math.floor(Math.random()*playersData.length+1)      
    }

    const getUniquePlayers=async(uniquePlayers)=>{
       //extra players needed from players data
       let extra=22-uniquePlayers.length;
       let playersData=[];
      await axios.get("http://localhost:3007/playerData").then((res)=>{
            playersData=res.data;
       })
       console.log(uniquePlayers);
       for(let i=0;i<extra;i++){
          let number=randomNumber(playersData)
          console.log("number random",number)
          if(!uniquePlayers.includes(playersData[number].Players)){
                uniquePlayers.push(playersData[number].Players)
          }
       }
       console.log(uniquePlayers);
       let items=[];
       uniquePlayers.forEach((element)=>{
         let data=  playersData.find((player)=>element==player.Players)
         let item={}
         item.id=items.length+1;
         item.player=data.Players;
         item.credits=data["Credit Value"]
         console.log("item",item)
         items.push(item);
       })
       setNewData(items)
    }


    const playHandler=()=>{
        let captain=team.find((item)=>item.type=="c");
        let vCaptain=team.find((item)=>item.type=="v")

        if(team.length!=11){
           alert("please select 11 players");
        }
        else if(!captain){
            alert("please select captain")
        }
        else if(!vCaptain){
            alert("please select vice captain")
        }
        else{
            axios.post(`http://localhost:3007/api/create-team/${user._id}`,{
                players:team,
                team1:match.info.teams[0],
                team2:match.info.teams[1],
                credits:credits
            },
           {
            headers:{
                Authorization:user.token //the token is a variable which holds the token
              }
           }).then((res)=>{
                console.log(res.data)
                sessionStorage.setItem("teams",JSON.stringify(res.data.data))
                navigate("/toss")
            }).catch((error)=>{
                alert(error.response.data.message)
            })
        }
    }

  const  selectHandler=(e,player)=>{  
    let items=team;
      let item={};
      if(e.target.name=="s"){
        if(team.length==11){
            alert("You can select 11 players only");
            return;
        }
        let ans= team.find((item)=>item.player==player.player)
        if(ans){
            alert("Cannot select a player twice")
        }
        else{
        console.log("available",credits)
        let newCredits=credits-player.credits
        if(newCredits<=player.credits){
            alert("you don't have enought credits to select this player,select another player");
        }
        setCredits(newCredits);
        console.log(newCredits)
        item.player=player.player
        item.type="s";
        items.push(item);
        console.log("team added",items)
        }
      } 
      else{
        if(team.length<11){
            alert("first choose 11 players,then make him captain or vice captain")
        }
        else{
            let index = items.findIndex(x => x.player ==player.player);
            if(index>=0){
               let item=items[index];
               let captainAvailable=items.find((element)=>element.type=="c");
               let vCaptainAvailable=items.find((element)=>element.type=="v");
               
                if(item.type=="c" || item.type=="v"){
                    alert("cannot choose same player as captain and vicecaptain")
                  }
                  else{
                    if(e.target.name=="c"){
                        if(captainAvailable){
                            alert("can make only one captain")
                       }else{
                        item.type="c";
                       }
                    }
                    else if(e.target.name="v"){
                        if(vCaptainAvailable){
                            alert("can make only one vice captain")
                       }
                        else{
                            item.type="v";
                        }
                    }
               }
               items[index]=item;
            }
            else{
                alert("should select player before making him caption or vicecaption")
            }
        }
      }
      console.log("items",items)
     setTeam(items)
    // setChange(!change)
  }

    if(!newData){
        return (
            <div>
                <h1>loading....</h1>
            </div>
        )
    }
    else{
        return (
            <div className="main">
                <h1 style={{marginTop:'20px',color:'#fff'}}>Available credits : {credits}</h1>
                {
                      newData.map((element,index)=>{
                        return(
                            <div  className="container" key={index}>
                               <div className="left-board">
               <div className="batsman">
                 <div className="player-name">
                   <span style={{whiteSpace:'nowrap',marginRight:'10px',color:'white'}}>{element.player}</span>
                   <span>credits:{element.credits}</span>
                </div>
            </div>
        </div>

        <div className="right-board2">
            <div className="baller">
                <button name="s" className="button"  onClick={(e)=>selectHandler(e,element)}>Player</button>
                <button name="c" className="button" onClick={(e)=>selectHandler(e,element)}>Captain</button>
                <button name="v" className="button" onClick={(e)=>selectHandler(e,element)}>V.Captain</button>
            </div>
        </div>
                            </div>
                        )
                    })
                }  
                <br/> 
            <button onClick={playHandler} style={{width:'300px',background:'#72b1f0',margin:'30px',fontWeight:'bolder',boxShadow:'0px 0px 10px blue'}}>Play</button>
            </div>
    
   )
        }

}

export default CreateTeam