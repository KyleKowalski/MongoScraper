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

    $("#deleteAll").on("click", function(){
        console.log(`deleting all`);

        $.ajax({
            type: "GET",
            url: "/deleteAll",
            success:  console.log('success')
        });
    });

    $(".addNote").on("click", function(){
        console.log(`Adding note to id: ` + $(this).attr("targetId"));

        $.ajax({
            type: "PUT", 
            url: "/addNote/" + $(this).attr("targetId"),
            data: "thisDataHere",
            success: location.reload()
        })
    });

    $(".deleteArticle").on("click", function(){
        console.log(`Removing Article id: ` + $(this).attr("targetId"));

        $.ajax({
            type: "DELETE",
            url: "/removeArticle/" + $(this).attr("targetId"),
            success: location.reload()
        })
    })


}); // end document.ready