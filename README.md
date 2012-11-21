Gmail-Filters-Js-api
====================

Manage Gmail filters within an Extension 

About
-----
This package can help you create Gmail Filters from inside an Extension. 

Installation
------------

Include Jquery from http://jquery.com/ 

Include app.js from the package 

and we are ready 

Available Params
----------------
    
    {
    from: name@domain.com
    has: label:mylabel
    hasnot: label:skip
    markread:true
    skipinbox:true
    labelas:true
    }


Example Implementation
-------

    var api = new Gmail_Filter_Api();

    api.set_gmail_params();

    api.createGmailFilter({"from":"anurag@grexit.com", "has":"label:inbox", "hasnot":"label:test", 
                                     "markread":true, "skipinbox":true, "labelas":"Inboxwhiz"});

Now the filterid is stored as api.filterid

    if(api.filterid == 0){
        alert("Filter Could not be created");
    }
    else{
        alert("Filter creation successful with filter id " + filterid);
    }

To delete the Filter:

    api.deleteGmailFilter(api.filterid);
