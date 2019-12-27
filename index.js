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
app.get('/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people.</p> 
    <p>${currentDate()}</p>`
  );
});

app.get('/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// delete
app.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  person = persons.filter((person) => person.id !== id);

  res.status(204).end();
});
// create
const generateId = () => {
  const personId = Math.random(...persons.map((p) => p.id));
  return personId;
};

app.post('/persons', (req, res) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({
      error: 'content missing'
    });
  }

  if (body.number === undefined) {
    return res.status(400).json({
      error: 'content missing'
    });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };
  persons = persons.concat(person);

  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
