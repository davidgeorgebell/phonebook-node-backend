const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '010-111111'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '440-123456'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '330-349994'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '210-113578'
  }
];

const currentDate = () => {
  return new Date().toUTCString();
};
console.log(currentDate);
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people.</p> 
    <p>${currentDate()}</p>`
  );
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
