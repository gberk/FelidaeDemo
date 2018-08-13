var Reports = require('../../DataStores/Reports')
var mysql = require('mysql2');

const SocksConnection = require('socksjs');
const fixieUrl = process.env.FIXIE_SOCKS_HOST;
const fixieValues = fixieUrl.split(new RegExp('[/(:\\/@)/]+'));


var dbTest = function() {
    return new Promise((resolve, reject) => {
        const mysqlServer = {
            host: process.env.REPORT_DB_HOST,
            port: 3306
          };

        const fixieConnection = new SocksConnection(mysqlServer, {
            user: fixieValues[0],
            pass: fixieValues[1],
            host: fixieValues[2],
            port: fixieValues[3],
          });

        const mysqlConnPool = mysql.createPool({
            user     : process.env.REPORT_DB_USER,
            password : process.env.REPORT_DB_PASSWORD,
            database : process.env.REPORT_DB,
            stream: fixieConnection
          });
          
          mysqlConnPool.getConnection(function gotConnection(err, connection) {
          
            if (err) {
                console.log(err)
                console.log("Failure")
                reject(err)
            }
            else
            {
                var testItem = {
                    type: "Unverified Sighting",
                    latitude: "37.181324",
                    longitude: "-121.850632",
                    date: "2018-06-03",
                    season: "SPRING",
                    time: "09:30:00",
                    "day segment": "am",
                    email: "founders@refreshlabs.co",
                    description: "On Castillero trail towards BULL RUN/ Mine hill trail. there is a water pipe like structure. The lion was sitting near there finding some shade."
                }

                connection.query('SELECT * FROM sightings', function(err, rows){
                    if (err)
                    {
                        console.log(err)
                        connection.release()
                        reject(err);
                    } else{
                        console.log('success')
                        console.log(rows)
                        resolve(rows)
                    }


                })

                // connection.query('INSERT INTO sightings SET ?', testItem, function (err, rows, fields) {
  
                //     if (err)
                //     {
                //         console.log(err)
                //         connection.release()
                //         reject(err);
                //     }
                //     else {
                //         console.log('success')
                //         console.log(rows)
                //         console.log(fields)
                //         connection.release();
                //         resolve(rows)
                //     }
                    
                // });
            } 
          });
    }) 
}

module.exports = dbTest;