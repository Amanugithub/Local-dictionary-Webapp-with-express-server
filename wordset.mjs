import fs, { readFileSync } from "fs"
import { type } from "os";
import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import { count, error } from "console";
import path from "path"
import { fileURLToPath } from "url";

const db = JSON.parse(readFileSync("../wordset-dictionary/allwords_wordset.json/aacompletewordset.json"));

const app =  express();
const port = 3000;
const fileName = fileURLToPath(import.meta.url);
const dirName =  path.dirname(fileName);

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(dirName , "public")))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})


app.post("/search",(req,res)=>{
    const {query} = req.body;
    const q = query.trim();
    if(db[q]) {
        console.log(db[q].word);
        console.log(db[q].meanings);
    }

    try {
        if(db[q]){
        res.render("index.ejs", {
            word : db[q].word,//root word
            meanings: db[q].meanings ?? [],//array of objects
            error: null
        })
    } else {
        res.render("index.ejs",{
                word: null,
                meanings: null,
                error: `No entry found for ${query}`
        })
    }
    } catch (error) {
        console.log(error);
        return res.render("index.ejs", {
            word: null,
            meanings: null,
            error: "Internal server errr."
        })
    }

    
})

app.post("/word",(req,res)=>{
    console.log(req.body);
    const query = req.body.query;
    //search the database for words that match or contain the word 
    const suggestions = [];
    for (let key in db){
            if(key.startsWith(query)){
                suggestions.push(key);
            }
            if (suggestions.length == 10) break;
    }
    //respond with suggestions
    res.json(suggestions)
    console.log(suggestions);
    
})
app.listen(port, ()=>{
    console.log(`Server started at port ${port}...`);
})

