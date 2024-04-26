namespace coll.reuse;

//Reusable types - like data element in abap
type Guid : String(32);
//DDIC - Structure - here we call it as Aspect - group of fields
aspect address {
    houseNo: String(32);
    street: String(80);
    pincode: Int32;
    country: String(2);
}   