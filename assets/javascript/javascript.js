$(document).ready(function() {
  $(".animalButtons").click(function() {
    var work = $(this).attr("data-name");
    console.log(work);
  });
});
