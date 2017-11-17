const app = require('express');
const router = app.Router();
const Contact = require('../models/contact');

router.get('/contactall', (req, res) => {
  Contact.find({}, (error, contacts) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(contacts);
    }
  });
});
router.get('/contact/:id', (req, res) => {
  Contact.findById(req.params.id, (error, contact) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(contact);
    }
  });
});

router.post('/contact/filter', (req, res) => {
  Contact.find({...req.body}, (error, contacts) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(contacts);
    }
  });
});

router.post('/contact', (req, res) => {
  const contact = Contact({...req.body});
  contact.save(error => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send('contact created successfully!');
    }
  });
});

router.put('/contact/:id', (req, res) => {
  Contact.findByIdAndUpdate(req.params.id, {...req.body}, error => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send('contact updated successfully!');
    }
  });
});

router.delete('/contact/:id', (req, res) => {
  Contact.findByIdAndRemove(req.params.id, error => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json({id: req.params.id});
    }
  });
});

module.exports = router;
