using { anubhav.db.master  } from '../db/datamodel';

//we are defining our service end point
service MyService @(path: 'MyService') {
    //MPC extension class
    function hello(name: String) returns String;
    @readonly
    entity ReadEmployeeSrv as projection on master.employees;
}