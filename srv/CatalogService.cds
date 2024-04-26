using { anubhav.db.master, anubhav.db.transaction  } from '../db/datamodel';

service CatalogService @(path: 'CatalogService') {
    
    entity EmployeeSet as projection on master.employees;
    entity ProductSet as projection on master.product;
    entity BusinessPartnerSet as projection on master.businesspartner;
    entity AddressSet as projection on master.address;
    entity POs @( odata.draft.enabled: true,
                  Common.DefaultValuesFunction: 'setDefaultValue'
     ) as projection on transaction.purchaseorder{
        *,
        case OVERALL_STATUS
            when 'N' then 'New'
            when 'P' then 'Paid'
            when 'A' then 'Approved'
            when 'X' then 'Rejected'
            end as OverallStatus: String(10),
        case OVERALL_STATUS
            when 'N' then 2
            when 'P' then 3
            when 'A' then 3
            when 'X' then 1
            end as StatusCode: Integer
    }
    actions{
        @cds.data.bindingparameter.name: '_anubhav'
        @Common.SideEffects:{
            TargetProperties: ['in/GROSS_AMOUNT']
        }
        action boost();
    };
    entity POItems as projection on transaction.poitems;
    function getLargestOrder() returns POs;
    function setDefaultValue() returns POs;

}
