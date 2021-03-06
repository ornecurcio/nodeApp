const router = require('express').Router(); 
const Note = require('../models/Note'); 

router.get('/notes/add', (req, res)=>{
    res.render('notes/new-note'); 
}); 

router.post('/notes/new-note', async(req, res)=>{
    const {title, description} = req.body;
    const errors = []; 
    if(!title){
        errors.push({text: 'Please Write a Title'}); 
    }
    if(!description){
        errors.push({text: 'Please Write a Description'});
    }
    if(errors.length > 0){
        res.render('notes/new-note', {errors,title,description}); 
    }
    else{
        const newNote = new Note({title,description});
        await newNote.save();
        res.redirect('/notes');
    }
}); 

router.get('/notes', async (req, res)=>{
    const notes = await Note.find().sort({date: 'desc'}); 
    res.render('notes/all-notes',{notes});
    // const collection = 'Notes'
    // await dbFindAllDocs(collection) // <=> wrapper for Model.find() ...
    //   .then(documents => {
    //     // create context Object with 'usersDocuments' key
    //     const context = {
    //       notesDocuments: documents.map(document => {
    //         return {
    //           title: document.title,
    //           description: document.description,
    //           date: document.date
    //         }
    //       })
    //     }
    //     // rendering usersDocuments from context Object
    //     res.render('notes/all-notes', {
    //       notesDocuments: context.notesDocuments
    //     })
    //   })
    //   .catch(error => res.status(500).send(error))
}); 

router.get('/notes/edit/:id', async (req, res)=>{
    const note = await Note.findById(req.params.id); 
    res.render('notes/edit-note',{note}); 
}); 

/*-----------------------TODO NO ME ANDA------------------------*/
router.put('/notes/edit-note/:id', async (req, res)=>{
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id,{title, description}); 
    res.redirect('/notes'); 
}); 

router.delete('/notes/delete/:id', async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id); 
    console.log(req.params.id); 
    res.redirect('/notes'); 
})

module.exports = router; 