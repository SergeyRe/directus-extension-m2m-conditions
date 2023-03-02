This is a directus hook extension to achieve conditions feature for m2m as well as for m2o fields in the same manner.
It's enougth hardcoded, mainly for idea demonstration. The idea is to use working for string fields mechanism to make conditions for any field on presense of key in another string field.

So to make everythig work you have

* create collection named "items"
* create string field named "visiblefields",hide this field on detail
* all other m2m and m2o fields have to be named as collections they are related to
* if field have to be seen only under condition 
   * it has to be hidden on detail 
   *  it has to have codition with rule : visiblefields contains <this_field_key> and "hidden on detail"=false
* collections with values on wich that field depent on have to have CSV field named "showfields" where you have to put dependent field keys (fields that user will see if value of another field is selected)


Visibility of dependent fields comes as new editing are saved (save and close +open again items form OR save and stay)
