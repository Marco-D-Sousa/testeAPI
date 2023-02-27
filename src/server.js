import  app  from './app.mjs';

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running in: http://localhost:${PORT}`);
})