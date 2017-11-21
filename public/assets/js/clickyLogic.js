$(document).ready(function() {

    $("#scrapeNow").on("click", function(){
        console.log(`Well, we clicked here.`);

        $.ajax({
            type: "GET",
            url: "/scrapeNow",
            success:  setTimeout(function() {
                console.log(`reloading page now`);
                location.reload();
            }, 1000)
        });
    });


}); // end document.ready