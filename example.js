var api = new Gmail_Filter_Api();

api.set_gmail_params();

api.createGmailFilter({"from":"", "has":"label:inbox", "hasnot":"label:test", 
                      "markread":true, "skipinbox":true, "labelas":"Inboxwhiz"});

if(api.filterid == 0){
    alert("Filter Could not be created");
}
else{
    alert("Filter creation successful with filter id " + api.filterid);
}

api.deleteGmailFilter(api.filterid);

