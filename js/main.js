
// generate 
generatePost('last');
generatePost('last');
generatePost('last');
generatePost('last');

$(document).ready(function(){
    //Simulates new post
    $("#dive").click(function(){
        generatePost('first');
    });
    // Simulates back-reading
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
           setTimeout(() => {
                generatePost('last')
           }, 200);
        }
    });
});

var post_id = 0;

function generatePost(position, c_text, custom) {
    var text;
    var image;
    var has_image = Boolean(Math.round(Math.random())); // decides if there's a photo
    
    if(has_image === true) {
        var rand_image = Math.floor(Math.random() * 2);
        switch(rand_image) {
            case 0:
                // get cat
                $.getJSON('https://api.thecatapi.com/v1/images/search', function(catapi_d) {
                    image = catapi_d[0].url;
                });
                break;
            case 1:
                // get dog
                $.getJSON('https://dog.ceo/api/breeds/image/random', function(dogapi_d) {
                    image = dogapi_d.message;
                });
                break;
            default:
        } 
    }
    else {
        image = null;
    }

    var rand_text = Math.floor(Math.random() * 3);
    switch(rand_text) {
        case 0:
            // get advice
            $.getJSON('https://api.adviceslip.com/advice', function(data_a) {
                text = data_a.slip.advice;
            });
            break;
        case 1:
            // get joke
            $.getJSON('https://official-joke-api.appspot.com/jokes/random', function(data_b) {
                text = data_b.setup + ' ' + data_b.punchline;
                image = null;
                //console.log(advice);
            });
            break;
        case 2:
            // get activity
            $.get('https://www.boredapi.com/api/activity', function(data_c) {
                text = data_c.activity;
                image = null;
                //console.log(data_c);
            });
            break;
        default:
            text = 'default';
        // code block
    } 


    setTimeout(() => {
        $.getJSON('https://randomuser.me/api', function(rnduser) {
            if(position === 'first'){
                $(".post:" + position).clone().prependTo(".feed");
            }
            if(position === 'last'){
                $(".post:" + position).clone().appendTo(".feed");
                //random likes, comments, shares
                var rand_likes = Math.floor(Math.random() * 100);
                var rand_comment = Math.floor(Math.random() * 15);
                var rand_share = Math.floor(Math.random() * 10);
                $("span.likes:" + position).text(rand_likes);       
                $("span.comment:" + position).text(rand_comment);       
                $("span.share:" + position).text(rand_share);  
            }
            post_id += 1; //new Id
            $(".post:" + position).attr('id', post_id) ;
            $("button.likes:" + position).attr('id', post_id) ;
            $(".post-head fname:" + position).text(rnduser.results[0].name.first);
            $(".post-head lname:" + position).text(rnduser.results[0].name.last);
            $(".post-head .user:" + position).attr('src', rnduser.results[0].picture.thumbnail);
            $(".post-head .username:" + position).text(rnduser.results[0].email)
            $(".post-body img:" + position).attr('src', image)

            if(custom === true) {
                $(".post-body > p:" + position).text(c_text);  
            }
            else {
                $(".post-body > p:" + position).text(text);  
            
            }          
        });
    }, 800);
}

$(document).ready(function(){
    $(".post-now").click(function(){
        var val = $("textarea").val();
        generatePost('first', val, true);
        $("textarea").val('');
    });
});
// SOURCES
//advice slip json api https://api.adviceslip.com/
//jokes https://github.com/15Dkatz/$(document).ready(function(){official_joke_api
//activity https://www.boredapi.com/api/activity
//random user https://randomuser.me/
//catapi https://docs.thecatapi.com/
//dogsapi https://dog.ceo/dog-api/
//randomfox https://randomfox.ca/floof/