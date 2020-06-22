import React, { useState } from 'react';
import {
  useParams,
  Link,
} from "react-router-dom";
import Camera from 'react-html5-camera-photo';
import Button from '@material-ui/core/Button'
import * as tf from '@tensorflow/tfjs';


import { load, predict } from './Model'
import { indexToPrediction, generateRandomText } from "./utils";

import 'react-html5-camera-photo/build/css/index.css'
import './camera.css'


export const GamePage = () => {
  const { difficulty } = useParams();

  const [word, setWord] = useState(generateRandomText(difficulty));

  const [wordSolved, setWordSolved] = useState('');

  const [listImage, setListImage] = useState([]);

  const [imageTaken, setImageTaken] = useState(false);

  const [listAnswer, setListAnswer] = useState([]);

  const [correctAnswer, setCorrectAnswer] = useState(0);

  if (!(difficulty === 'easy' || difficulty === 'medium' || difficulty === 'hard')){
    return (
      <div>404</div>
    )
  }

  const firstLetter = word && word[0];
  const unSolvedWord = word.slice(1);

  const CameraComponent = () =>  <Camera idealResolution={{width: 150, height: 150}}
                                   isSilentMode={true} isFullscren={true}
                                   onTakePhoto = {(url) => {
                                     setListImage(listImage => [...listImage, url]);
                                     setImageTaken(true);
                                   }}/>;


  const ImageTaken = ({url}) => <div style={{position: "relative",  textAlign: "center",}}>
    <img id="input" style={{maxWidth: "500px", height: "auto",  width:"100%"}} src={url}/>
  </div>;

  const ImageShowcase = ({url, id}) => (
    <div>
      <img id={id} style={{maxWidth: "150px", width: "100%", height: "auto"}} src={url}/>
    </div>
  );

  const completed = word.length === 0;

  const handleSubmit = async () => {
    let listGradedAnswers = [];
    let countCorrectAnswer = 0;

    const model = await load();

    for (let i = 0; i < listImage.length; i++) {

      const pixels = tf.browser.fromPixels(document.getElementById("image"+i.toString()));

      const index = (await predict(pixels, model).as1D().argMax().data())[0];
      const letter = indexToPrediction(index);
      console.log(letter)

      if (letter === wordSolved[i]) {
        listGradedAnswers.push(1);
      }
      else listGradedAnswers.push(0);
      if (listGradedAnswers[i]) countCorrectAnswer++;
    }
    setCorrectAnswer(countCorrectAnswer);
    setListAnswer(listGradedAnswers);

  };

  const GradedText = ({correct}) => {
      return (
        correct ? <div style={{textAlign: "center", fontSize: "24px", color: "green"}}>Correct</div>
        : <div style={{textAlign: "center", fontSize: "24px", color: "red"}}>Wrong</div>
      )
  };

  return (
    <div>
      <div style={{
        width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", position: "relative",
        paddingTop: "100px"
      }}>
        {!completed ?
          <>
            {imageTaken ? <ImageTaken url={listImage.slice(-1)[0]}/> : <CameraComponent/>}
            <div style={{marginTop: "50px", marginLeft: "100px"}}>
              <div style={{marginLeft: "60px", marginRight: "90px"}}>
                <span style={{fontSize: "32px", fontWeight: "bold"}}>{wordSolved}</span>
                <span style={{fontSize: "32px", color: "black", textDecoration: "underline"}}>{firstLetter}</span>
                <span style={{fontSize: "32px", color: "grey"}}>{unSolvedWord}</span>
              </div>
              <br/>
              {listImage &&
              <div>
                <Button style={{marginRight: "20px"}}
                        color={"secondary"}
                        variant={"contained"}
                        onClick={() => {
                          setListImage((listImage) => {
                            listImage.pop();
                            return listImage;
                          });
                          setImageTaken(false);
                        }}
                        size="small"
                        disabled={!imageTaken}
                >Retake Picture</Button>
                {word.length > 0 ? <Button color="primary" variant="contained" size="small" onClick={() => {
                    setImageTaken(false);
                    setWordSolved((wordSolved) => wordSolved + word[0]);
                    setWord(word => word.slice(1));
                  }}
                                           disabled={!imageTaken}>Next Photo</Button> :
                  <Button color="primary" variant="contained" size="small" onClick={() => {
                  }} disabled={!imageTaken}>Submit</Button>
                }
              </div>
              }
            </div>
          </>
          :
          <div>
            <div style={{fontSize: "32px", fontWeight: "bold"}}>{wordSolved}</div>
            {listAnswer.length === 0 && <Button color={"secondary"}
                                                variant={"contained"}
                                                style={{marginTop: "10px"}}
                                                onClick={() => handleSubmit()}>Submit All</Button>
            }
          </div>
        }
      </div>
      {listImage && <div style={{margin: "50px", display: "flex", flexDirection: "row", justifyContent: "center"}}>
        {listImage.map((value, index) => {
          if (imageTaken && index === listImage.length - 1) return;
          return (
            <div key={index} style={{margin: "10px"}}>
                <ImageShowcase url={value} id={"image" + index}/>
              <div style={{textAlign: "center", fontSize: "32px"}}> {wordSolved[index]} </div>
              {listAnswer.length > 0 && <GradedText correct={listAnswer[index]}/>}
            </div>)
        })}
      </div>}
      {listAnswer.length > 0 && <div style={{textAlign: "center"}}>
        <div style={{fontSize: "24px"}}>
          Your score is: {correctAnswer}/{listAnswer.length}
        </div>
        <Button component={Link} to={"/"} color="primary" variant="contained" size="small">Back to Main Page</Button>
      </div>}
    </div>
  )
};

export default GamePage;
