const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Item = require('../models/itemModel');


//middleware to Verify JWT token

router.use((req, res, next) => {
  const token = req.get('token');
  if (!token)
  return res
    .status(401)
    .json({ msg: 'No authentication token, authorization denied.' });

  jwt.verify(token, process.env.JWT_SECRET, {algorithms: ["HS256"]}, (err, decode) => {
    if(!err) {
      req.user = decode; //store user info on request object
      next();
    }
    else {
      res.status(401).send('Token verification failed, authorization denied.');
    }
  })
})

//main index route, should fetch all items from user
router.get('/', async (req, res) => {
    try {
        const allItems = await Item.find()
        res.json({
            status: {
                code: 200,
                message: "Success"
              },
            data: allItems
          });
    }   catch(err){
        res.send(err, "No items found")
    }
});

router.post('/', async (req, res) => {

    try {
      const createdItem = await Item.create(req.body);
      res.json({
        status: {
              code: 201,
              message: "Resource successfully created"
            },
        data: createdItem
      });
  
    } catch(err){
      console.log(err);
      res.send(err);
    }
  });

  
router.get('/:id', async (req, res) => {
    
    try  {
       const foundItem = await Item.findById(req.params.id);
       res.json({
         status: {
           code: 200,
           message: "Success"
         },
         data: foundItem
       });

     } catch (err){
       res.send(err);
     }
});

router.put('/:id', async (req, res) => {

 try {
   const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});
   res.json({
     status: {
           code: 201,
           message: "Item successfully updated"
         },
     data: updatedItem
   });

 } catch(err){
   res.send(err)
 }
});


// Delete route
router.delete('/:id', async (req, res) => {

 try {
    const deletedItem = await Item.findByIdAndRemove(req.params.id);
     res.json({
       status:  {
           code: 200,
           message: "Resource successfully deleted"
         },
       data: deletedItem
     });
 } catch(err){
   res.send(err);
 }
});



module.exports = router;
