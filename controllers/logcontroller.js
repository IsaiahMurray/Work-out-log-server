const jwt = require('jsonwebtoken');
const router = require("express").Router();
const { Log } = require("../models");
const { ValidateSession } = require("../middleware");

/* *************************
 *** CREATE LOG ***
************************** */

router.post('/log', ValidateSession, (req, res) => {
  const logRequest = {
    description: req.log.description,
    definition: req.log.definition,
    result: req.log.result,
    owner: req.user.id
  }
  Log.create(logRequest)
  .then ( log => res.status(200).json(log) )
  .catch ( err => res.status(500).json({error: err}) )
});  


/* *************************
 *** GET ALL BY OWNER ***
************************** */

router.get("/log", ValidateSession, (req, res) => {
  Log.findAll({
    where: { owner : req.user.id }
  })
    .then( logs => res.status(200).json(logs) )
    .catch( err => res.status(500).json({ error: err }) )
});

/* *************************
 *** GET LOGS BY ID ***
************************** */

router.get('/log/:id', ValidateSession, (req, res) => {
  Log.findOne({ 
    where: { 
      id: req.params.id, 
      owner: req.user.id
    }
  })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }))
});

/* *************************
 *** UPDATE BY ID ***
************************** */

router.put('/log/:id', ValidateSession, (req, res) => {
  Log.update(req.body.log, {
      where: { 
        id: req.params.id, 
        owner: req.user.id
      }, 
      returning:true 
  })
      .then(log => res.status(200).json(log))
      .catch(err => res.status(500).json({ error: err }))
});

/* *************************
 *** DELETE LOG ***
************************** */

router.delete("/log/:id", ValidateSession, (req, res) => {
  Log.destroy({where: { 
    id: req.params.id, 
    owner: req.user.id
  },
  returning: true 
})
  .then(log => res.status(200).json(log))
  .catch(err => res.status(500).json({ error: err }))
});



module.exports = router;