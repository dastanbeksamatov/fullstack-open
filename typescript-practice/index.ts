import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calcExercises } from './calcExercises';
const app = express();

app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello FullStack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if(isNaN(height) || isNaN(weight)){
    res.send({
      error: "malformatted input"
    });
  }
  const result = calculateBmi(height, weight, `Given the body weight ${ weight } and height ${ height }:`);
  res.send({
    weight: weight,
    height: height,
    bmi: result
  });
});

app.post('/exercises', (req, res) => {
  const body = req.body;
  if(!body || !body.daily_exercises || !body.target){
    res.status(400).end({
      error: 'Malformatted input'
    });
  }
  const result = calcExercises(body.daily_exercises, body.target);
  res.status(200).send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});