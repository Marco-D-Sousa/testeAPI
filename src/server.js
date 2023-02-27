const { app } = require('./app')

const PORT = 3333;
const baseURL = `http://localhost:${PORT}`

app.listen(PORT, () => {
  console.log(`Server running in: ${baseURL}`);
})
