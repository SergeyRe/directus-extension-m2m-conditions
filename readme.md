This is a directus hook extension to achive conditions  feature for m2m as well as for m2o fields in the same manner
its enougth hardcoded mainly for idea demonstration
the idea is to use working for string fields mechanism to make condition for any field on presense of key  in another string field
so to make everythig work you have

1.create collection named "items"
2.create string field named "visiblefields",hide this field on detail
3.all other m2m and m2o fields have 
    3.1 to be named as collections they are related to
    3.2 if field have to be seen only under condition
       3.2.1 it has to be hidden on detail
       3.2.2 it has to have codition with rule : visiblefields contains <this_field_key>  and "hidden on detail"=false
4.collections with values on wich that field depent on have to have CSV field named "showfields" where you have to put dependent field keys (fields that user will see if  value of another field  is selected)

Visibility of dependent fields comes as new editing are saved (save and close +open again items form  OR save and stay)
