import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router'
import './home.css';
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
    const [matches,setMatches]=useState("")
    const [show,setShow]=useState(false);
    useEffect(()=>{
         //retrive json data of all matches from backend
      axios.get("http://localhost:3007/jsonData").then((res)=>{
        setMatches(res.data)
        console.log("matches",res.data)
        setShow(true)
      }).catch((error)=>{
        alert("unable to retrive data");
      });
    },[])

    const clickHandler=(matchData)=>{
        console.log("match data",matchData)
        sessionStorage.setItem("match",JSON.stringify(matchData));
        navigate("/create")
    }

    return (
       
          <div className="main">
              {
                     show?  matches.map((element,index)=>{
                         let date=new Date(element.info.dates[0]);
                         let time=date.toLocaleTimeString();
                          date=date.toLocaleDateString();
                       
                        return (
                            <div className="column">
                            <h4>{element.info.teams[0]} Vs {element.info.teams[1]}</h4>
                            <h6 style={{marginTop:'15px',fontWeight:'bold'}}>{element.info.city}</h6>
                           <p>{date}  {time} {index}</p>
                            <button className ="button" onClick={()=>clickHandler(element)} >Play</button>
                        </div>
                        )
                    }):null
              }
          </div>
    )
}

export default Home

/**
 *          {
            show?  matches.map((element,index)=>{
                return (
             <div>
                 <Match data={element} index={index} key={index}/>
                 </div>
                )
            }):null
          }
 */
