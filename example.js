var api = new Gmail_Filter_Api();

api.set_gmail_params();

filterid = api.createGmailFilter({"from":"*", "has":"label:inbox", "hasnot":"label:test", "markread":true, "skipinbox":true, "nameit":"Inboxwhiz"});

if(filterid == 0){
    alert("Filter Could not be created");
}
else{
    alert("Filter creation successful with filter id " + filterid);
}

api.deleteGmailFilter(filterid);

