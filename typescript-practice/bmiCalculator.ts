interface getBmi{
  height: number;
  weight: number;
}

const parseArgs = (args: Array<string>) : getBmi => {
  if(args.length < 4) throw new Error('not enough arguments');
  if(args.length > 4) throw new Error('too much arguments');
  
  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3])) && Number(args[3]) !== 0){
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  }
  else{
    throw new Error('provided arguments are not numbers');
  }
};

const calculateBmi = (height: number, weight: number, text: string) : string => {
  const bmi = 10000*weight/(height**2);
  if (bmi < 18.5){
    return(text + 'Underweight (unhealthy weight) ' + bmi);
  }
  else if (bmi >=18.5 && bmi<=25){
    return(text + 'Normal (healthy weight) ' + bmi);
  }
  else if (bmi > 25 && bmi<=30){
    return(text + 'Overweight (unhealthy) ' + bmi);
  }
  else{
    return(text + 'Obese (extremely unhealthy)' + bmi);
  }
};

try{
  const { height, weight } = parseArgs(process.argv);
  console.log(calculateBmi(height, weight, `Given the body weight ${ weight } and height ${ height }:`));
}
catch(e){
  console.log('something is not right, message: ', e.message);
}

export { calculateBmi };