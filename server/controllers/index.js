const app = require('express');
const path = require('path');
const router = app.Router();

router.use('/api', require('./contact'));

router.get('*', (req, res) => {
  res.sendFile(path.resolve('./', 'dist', 'index.html'))
});

module.exports = router;
