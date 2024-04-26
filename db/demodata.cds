//Now we reference the aspect and type from seprate file
using { coll.reuse as reuse } from './reuse';
using { cuid, managed, temporal } from '@sap/cds/common';

//define a unique identifier for our project
namespace coll.lib;

//Context - grouping of our db object - NO SQL (DB agnostic)
//Configuration data, master data, transaction data
context master {

    entity student: reuse.address {
        key id: reuse.Guid;
        name: String(80);
        age: Int16;
        //association: relationship between multiple tables
        semester: Association to one semester;
        grade: Boolean
    }

    entity semester {
        key id: reuse.Guid;
        year: Int64;
        hod: String(80);
        specialization: String(80);
    }

    entity book {
        key id: reuse.Guid;
        bookName: String(80);
    }
}

context trans {
    entity subs : cuid, temporal, managed {
        book: Association to one master.book;
        student: Association to one master.student;
    }
}

