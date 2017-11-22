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
        let targetId = $(this).attr("targetId");
        $("#addThisNote").attr("currentId", targetId);
        $("#noteModal").modal('toggle');
        $("#articleChoice").text("Adding note to article titled: " + $(this).attr("articleTitle"))

    });

    $("#addThisNote").on("click", function(){
        let thisNote = $("#noteToAdd").val();
        
        if(thisNote === "" || thisNote === null){
            alert("Please enter a note to continue");
            return false;
        }

        let thisNoteObject = {
            thisNote: thisNote
        }
        
        $.ajax({
            type: "POST", 
            url: "/addNote/" + $(this).attr("currentId"),
            data: JSON.stringify(thisNoteObject),
            dataType: 'json',
            contentType: 'application/json',
            success: location.reload()
        })

    })

    $(".deleteArticle").on("click", function(){
        console.log(`Removing Article id: ` + $(this).attr("targetId"));

        $.ajax({
            type: "DELETE",
            url: "/removeArticle/" + $(this).attr("targetId"),
            success: location.reload()
        });
    });

    $(".deleteOneNote").on("click", function(){
        console.log(`Removing Note id: ` + $(this).attr("targetId"));

        $.ajax({
            type: "DELETE",
            url: "/removeNote/" + $(this).attr("targetId"),
            success: location.reload()
        });
    });


}); // end document.ready