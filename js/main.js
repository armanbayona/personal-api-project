$(document).ready(function(){

    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
        //$("#dive").click(function(){
    
        var text;
        var image;

        var has_image = Boolean(Math.round(Math.random())); // decides if there's a photo
        //console.log(has_image);
        
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
                // code block
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

        //random likes, comments, shares
        var rand_likes = Math.floor(Math.random() * 100);
        var rand_comment = Math.floor(Math.random() * 15);
        var rand_share = Math.floor(Math.random() * 10);


        setTimeout(() => {
            $.getJSON('https://randomuser.me/api', function(rnduser) {
                $(".post:last").clone().appendTo(".container");
                $(".post-head fname:last").text(rnduser.results[0].name.first)
                $(".post-head lname:last").text(rnduser.results[0].name.last)
                $(".post-head .user:last").attr('src', rnduser.results[0].picture.thumbnail)
                $(".post-head .username:last").text(rnduser.results[0].email)
                $(".post-body img:last").attr('src', image)
                $('.post-body > p:last').text(text);       
                //$('span.likes:last').text(rand_likes);       
                $('span.comment:last').text(rand_comment);       
                $('span.share:last').text(rand_share);       
            });
        }, 800);

        }
    });

    $(".post-btn.likes").click(function(){
        var evt = event.target;
        var c_likes = $(".post-btn .likes").text()
        var c_likes = parseInt(c_likes)
        var n_likes;
        if(c_likes === 0){
            var n_likes = c_likes + 1;
        }
        else{
            var n_likes = c_likes - 1;
        }
        
        $(".post-btn .likes").text(n_likes)
    });
});

//advice slip json api https://api.adviceslip.com/
//jokes https://github.com/15Dkatz/official_joke_api
//activity https://www.boredapi.com/api/activity
//random user https://randomuser.me/
//catapi https://docs.thecatapi.com/
//dogsapi https://dog.ceo/dog-api/
//randomfox https://randomfox.ca/floof/