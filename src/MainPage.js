import React from 'react';
import Button from '@material-ui/core/Button'

import asl from './assets/asl.png'


const DifficultyButton = ({level, text}) => {
  const difficulty = `game/${level}`;

  return(
    <div style={{padding: "20px"}}>
      <a href={difficulty}> <Button variant="contained" color="primary">{level}</Button> </a>
      <div style={{marginTop: "5px"}}>{text}</div>
    </div>
  )
}

export const MainPage = () => {

  return (
   <div style={{textAlign: "center", padding: "100px"}}>
     <div style={{fontSize: "32px",}}>GuessASL</div>
     <div style={{marginTop: "10px" , fontSize: "16px"}}>
       Welcome to GuessASL
       <br/>
       <br/>
       An ASL-guessing game using your camera. Make sure to place your hand in front of the camera and try to guess the letter on the screen. Don't forget to memorize this to help you through the game!
       <br/>
       <img style={{maxWidth: "500px", height: "auto"}} src={asl}/>
     </div>
     <div style={{marginTop: "50px"}}>
       <div style={{fontSize: "24px"}}>Select Difficulty</div>
       <div style={{display: "flex", justifyContent: "center"}}>
         <DifficultyButton level={"easy"} text={"consist only letter"}/>
         <DifficultyButton level={"medium"} text={"consist word"}/>
         <DifficultyButton level={"hard"} text={"consist sentence"}/>
       </div>
     </div>
   </div>
  )
};

export default MainPage;
