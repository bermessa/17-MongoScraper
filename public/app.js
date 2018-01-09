$(document).ready(function() {

    $(".clickSave").on("click", function() {
        var id = $(this).attr("data-id");

        $.ajax({
            type: "POST",
            url: "/saved/" + id
        }).done(function() {
            location.reload();
        });

    });

    $(".clickDelete").on("click", function() {
        var id = $(this).attr("data-id");

        $.ajax({
            type: "POST",
            url: "/unsave/" + id
        }).done(function() {
            location.reload();
        });

    });
});
