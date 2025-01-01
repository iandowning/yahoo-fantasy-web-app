const app = require('./index');

const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});