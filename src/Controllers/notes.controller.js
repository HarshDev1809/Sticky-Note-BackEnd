const Note = require("../Models/notes.model");

exports.createNewNote = async(req,res)=>{
    const {date,heading,body,isLiked} = req.body;
    const user = req.user;
    const notes = user.notes;
    const newNote = new Note({
        date : date,
        heading : heading,
        body : body,
        isLiked : isLiked
    });
    try{
        const nNote = await newNote.save();
        user.notes.push(nNote._id);
        await user.save();
        return res.status(201).send(user);
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.getAllNotes = async(req,res)=>{
    const user = req.user;
    const notesId = user.notes;
    try{
        const notes = await Note.find({"_id":{$in : notesId}});
        return res.send(notes);
    }catch(err){
        return res.status(500).send({message : "Something Went Wrong!"});
    }
}

exports.deleteNote = async(req,res)=>{
    const user = req.user;
    const noteId = req.params.id;
    try{
        const deleteResponse = await Note.deleteOne({_id : noteId});
        if(!deleteResponse.deletedCount){
            return res.status(400).send({message : "Note Not Found"});
        }
        const notesId = user.notes;
        const updatedNotesId = notesId.filter((ele)=>{
            return ele != noteId;
        })
        user.notes = updatedNotesId;
        await user.save();
        return res.status(200).send(user);
    }catch(err){
        return res.status(500).send({message : "Something Went Wrong!"});
    }
}

exports.editNote = async(req,res)=>{
    const {date,heading,body,isLiked} = req.body;
    console.log(isLiked);
    const noteId = req.params.id;
    try{
        const note = await Note.findById(noteId);
        if(!note){
            return res.status(400).send({message : "Note Not Found"});
        }else{
            note.date = date;
            note.heading = heading;
            note.body = body;
            await note.save();
            return res.status(201).send(note);
        }
    }catch(err){
        return res.status(500).send({message : "Something Went Wrong!"});
    }
}

exports.getNoteById = async(req,res)=>{
    const noteId = req.params.id;
    try{
        const note = await Note.findById(noteId);
        if(!note){
            return res.status(400).send({message : "Note Not Found"});
        }else{
            return res.status(201).send(note);
        }
    }catch(err){
        return res.status(500).send({message : "Something Went Wrong!"});
    }
}

