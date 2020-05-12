interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface List {
  listOfHours: Array<number>;
  target: number;
}

const parseArgs = (args: Array<string>) : List => {
  if(args.length < 5) throw new Error('not enough arguments');
  const list : number[] = [];
  args = args.slice(2);
  let first = args.shift();
  const target = !isNaN(Number(first)) ? Number(first) : 'error';
  args.forEach(num => {
    if(isNaN(Number(num))){
      throw new Error('Entered invalid element');
    }
    list.push(Number(num));
  });
  if (target==='error'){
    throw new Error('Invalid argument');
  }
  return {
    listOfHours: list,
    target: target
  };
};

const getRatingDesc = (rating: number) : string => {
  if (rating > 0 && rating < 50){
    return 'failed - pathetic';
  }
  else if(rating >=50 && rating < 75){
    return 'C - minimum requirement passed';
  }
  else if(rating >=75 && rating < 90){
    return 'B - good, but could have been better';
  }
  else if(rating >=50 && rating <= 100){
    return 'A - amazing performance, bro';
  }
  else if(rating > 100){
    return 'A+ - rocked it';
  }
  else{
    return 'error';
  }
};

const calcExercises = (hours: Array<number>, target: number) : Result => {
  const nDays = hours.length;
  let tDays = 0;
  hours.forEach(h =>{
    if(h>0){
      tDays = tDays + 1;
    }
  });
  const sumReducer = (sum: number, value: number) => sum + value;
  const sum = hours.reduce(sumReducer);
  const avg = sum/nDays;

  const success = avg >= target ? true: false;
  const rating = avg/target * 100;
  const ratingDescription = getRatingDesc(rating);

  return({
    periodLength: nDays,
    trainingDays: tDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: avg
  });
};

try{
  const { listOfHours, target } = parseArgs(process.argv);
  console.log(calcExercises(listOfHours, target));
}
catch(e){
  console.log('error somewhere, specifically: ', e.message);
}

export { calcExercises };