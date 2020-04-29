const restify = require("restify-clients");

let apiUrl = "https://cloud.iexapis.com/";

client = restify.createJsonClient({
                                    "url" : apiUrl,
                                    });


const mysql = require("mysql");
                                   
    const yhteys = mysql.createConnection({
                                            "host" : "localhost",
                                            "user" : "root",
                                            "password" : "",
                                            "database" : "salkku"
                    });
                                    
yhteys.connect((err) => {
                                    
        if (!err) {
                                    
        } else {
                                    
            throw err;
                                    
        }
                                    
});        

module.exports = {

    "avaa" : () => {

        return new Promise((resolve, reject) => {

            let sql = "SELECT * FROM osakkeet";

        yhteys.query(sql, (err, data) => {

            if (!err) {
                    
                resolve(data);
            } else {
                reject(err);
            }

        });

        });

       },

    "haeTiedot" : (id) => {

        return new Promise((resolve, reject) => {

            let polku = `/stable/stock/${id}/quote?token=TOKEN`//your token

            client.get(polku, (err, req, res, data) => {
                       
                if (!err) {
                            
                     resolve(data.latestPrice);
                } else {
                    reject(err);
                }

            });

        });

    }

};