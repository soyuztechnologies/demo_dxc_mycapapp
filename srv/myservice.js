const cds = require('@sap/cds');
const { employees } = cds.entities('anubhav.db.master');
//here we are implementing the service
module.exports = function(srv){

    //logic which will get called when someone call /hello end point
    //DPC extension class
    srv.on('hello', (req) => {
        return "hello " + req.data.name;
    });

    srv.on("READ", "ReadEmployeeSrv", async (req, res) => {
        var results = [];

        //Ex1 : exact hard coded data
        // results.push({
        //     "ID": "02BD2137-0890-1EEA-A6C2-BB5654d46547FB",
        //     "nameFirst": "Christiano",
        //     "nameMiddle": null,
        //     "nameLast": "Ronaldo"
        // });

        results = await cds.tx(req).run(SELECT.from(employees).limit(10).where({
            bankName: 'My Bank of Antioch'
        }));

        return results;
    });

}