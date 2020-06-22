const INDEX_TO_CATEGORICAL = ['a', 'b', 'c', 'd', 'del', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'nothing',
  'o', 'p', 'q', 'r', 's', 'space', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const EASY_TEXT = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];

const MEDIUM_TEXT = ['hello','hi','morning','okay','ok','bye','yes','no','sorry','pardon'];

const HARD_TEXT = ['good morning','good night','good day','how are you','good afternoon','im fine','of course','see you'];

export const indexToPrediction = (index) => {
  return INDEX_TO_CATEGORICAL[index];
};

export const generateRandomText = (difficulty) => {
  let listText = [];
  if (difficulty === 'easy') {
    listText = EASY_TEXT;
  }
  else if(difficulty == 'medium') {
    listText = MEDIUM_TEXT;
  }
  else {
    listText = HARD_TEXT;
  }

  return listText[Math.floor(Math.random() * listText.length)];
};
