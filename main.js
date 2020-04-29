const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const portti = 3012;

const iex = require("./models/iex");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { "extended" : true } ));

app.use(express.static("./public"));

app.get("/", (req, res) => {

    iex.avaa()
    .then((data)=>{
    
    tt = []

        for (i=0; i<data.length;i++){
            tt.push(data[i].symbol)
        }
                let pyynnot = []
    
                tt.forEach((id) => {
                    
                    pyynnot.push(iex.haeTiedot(id));
    
                });
                
                Promise.all(pyynnot).then((kurssit) => {
                   
                    res.render("index", { "data" : kurssit, "muut" : data });
    
                });
    
            })
            .catch((err) => {
                res.json(err);
            });     

});

app.listen(portti, () => {

});