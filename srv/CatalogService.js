module.exports = cds.service.impl(async function(){

    const { POs, EmployeeSet } = this.entities;

    this.before('UPDATE', EmployeeSet, (req,res) => {
        if(parseFloat(req.data.salaryAmount) > 1000000){
            req.error(500, 'Salary cannot be more than a million');
        }

    });

    ///Get The order which is largest, get the order with max amount
    ///top 1st order
    this.on('getLargestOrder', async (req,res) => {
        try {
            const reply = await cds.tx(req).read(POs).orderBy({
                GROSS_AMOUNT: 'desc'
            }).limit(1);

            return reply;
        } catch (error) {
            return "Error " + error.toString();
        }
    });

    this.on('setDefaultValue', async (req, res) => {
        return { OVERALL_STATUS : 'N' }
    });

    //implemntation of our boost action
    //since its bound to PO, we will get the key 
    this.on('boost', async (req, res) => {
        try {
            const ID = req.params[0];
            console.log("Hey amigo! here is the ID we receive " + ID);
            //start a transaction
            const tx = cds.tx(req);
            //Update the gross amount of PO
            await tx.update(POs).with({
                GROSS_AMOUNT: {'+=' : 20000}
            }).where(ID);

        } catch (error) {
            return "Error " + error.toString();
        }
    });

});