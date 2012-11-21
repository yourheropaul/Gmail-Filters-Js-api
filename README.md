Gmail-Filters-Js-api
====================

Add/Delete Gmail filters via browser extension

About
-----
This javascript module helps Gmail extension developers to create and delete Gmail Filters for a logged in Gmail user. 
We are already using this module in our application Inboxwhiz (http://inboxwhiz.com)

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
    markread
    skipinbox
    labelas
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
