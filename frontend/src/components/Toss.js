import React,{useEffect,useState} from 'react';
import {navigate} from '@reach/router';



const Trial = () => {

    const [match,setMatch]=useState("");
    const navigateHandler=()=>{
        navigate("/score")
    }

    useEffect(()=>{
        let match=JSON.parse(sessionStorage.getItem("match"));
        setMatch(match)
    },[])
   
    if(!match){
       return(
        <h1>Loading....</h1>
       )
    }
    else{
        return (
            <div>
                <div style={{background:"#5131b0",width:"500px",height:"300px",boxShadow:"0px 0px 10px #3e02f0",display:'flex',flexDirection:'column',alignItems:'center',padding:"20px"}}>
                    <h1>Toss</h1>
                    <h2>{match.info.teams[0]}</h2>
                    <h3>VS</h3>
                    <h2>{match.info.teams[1]}</h2>
                    <p  style={{color:'#fff'}} >{match.info.toss.winner} has won the toss and decided to {match.info.toss.decision}</p>
                    <button style={{width:"150px",backgroundColor:"blue",color:"#fff",padding:"4px"}} onClick={navigateHandler}>Score Board</button>
                </div>
            </div>
        )
    }
}

export default Trial
