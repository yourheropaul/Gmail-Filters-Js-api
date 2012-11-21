var Gmail_Filter_Api = function(){

    this.set_gmail_params = function() {
        var gmail_params = {}

        //Parse out Base Url
        var regex = new RegExp("https://mail.google.com/(a/(.+?)/|(mail(.+?)#))");
        var matches = document.location.href.match(regex);
        m = matches[0]
        gmail_params['GMAIL_BASE_URL'] = m.substring(0, m.length-1) + '?'

        //Parse out gmailchat value
        var regex = new RegExp("gmailchat=(.+?)/(.+?);")
        var matches = document.cookie.match(regex)
        gmail_params['USER_EMAIL'] = matches[1]

        //Parse out gmail_at value
        var regex = new RegExp("GMAIL_AT=(.+?);")
        var matches = document.cookie.match(regex)
        gmail_params['GMAIL_AT'] = matches[1]
        
        //Parse out Gmail_ik value from GLOBALS
        var ik_index = get_useremail_pos(0,  gmail_params['USER_EMAIL']);
        if(ik_index == -1) {
            //TODO: handle this
            // Could not find ik 
        }
        else{
            gmail_params['GMAIL_IK'] = window.GLOBALS[ik_index -1]
        }
        this.gmail_params = gmail_params ;        
    }

    //Recursion is fun! We do not like for loops anymore
    function get_useremail_pos(index, user_email) {
        if(window.GLOBALS[index] == user_email) {
           return index; 
        }
        if(index >= (window.GLOBALS.length - 1) )//Failsafe
        {
            return -1;
        }
        else {
            return get_useremail_pos(index+1, user_email);
        }
    }

    this.process_gmail_filter_response = function(response, keyValues){
        var RegEx = ",";
        for(key in keyValues){
            switch(key){
                case "from":
                    RegEx = RegEx + "from:\(" + keyValues[key] + "\)";
                    break;
                case "has":
                    RegEx = RegEx + " " + keyValues[key];
                    break;
                case "hasnot":
                    RegEx = RegEx + " -" + keyValues[key]
            }
        }
        var position = response.search(RegEx);
        if(position == -1)
            return 0;
        positionstart = position - 13;
        filterid = response.substring(positionstart, position);
        if(filterid != null){
            return filterid;
        }
        else
            return 0;
    };

    this.createGmailFilter = function(keyValues) {
       thisobj = this;
       var iwgmail = new IwGmail();
       baseurl = this.gmail_params.GMAIL_BASE_URL
       gmail_filter_url = baseurl + "ik=" + this.gmail_params.GMAIL_IK + "&at=" + this.gmail_params.GMAIL_AT + "&view=up&act=cf&pcd=1&mb=0&rt=c"

       //GMail filter variables
       postdata = "search=cf"
       for(key in keyValues){
            switch(key){
                case "from":
                    postdata = postdata + "cf1_from=" + keyValues[key];
                    break;
                case "has":
                    postdata = postdata + "&cf1_has=" + keyValues[key];
                    break;
                case "hasnot":
                    postdata = postdata + "&cf1_hasnot=" + keyValues[key];
                    break;
                case "markread":
                    postdata = postdata + "&cf2_ar=true";
                    break;
                case "skipinbox":
                    postdata = postdata + "&cf2_cat=true";
                    break;
                case "nameit":
                    postdata = postdata + "cf2_sel=" + keyValues[key];

            }
       }

       jQuery.post(gmail_filter_url, postdata, function(gmail_response){
            return thisobj.process_gmail_filter_response(gmail_response, keyValues);
       });
    };

};

