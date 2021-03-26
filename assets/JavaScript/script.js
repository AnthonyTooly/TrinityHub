function showAll(){
    $.ajax({
        url:'/',
        type:'GET',
        dataType:"string",
        data:"true",
        success: function(){
            new ejs({
                url:'/index.ejs'
            }).update(
                document.getElementById("flag").value="true"
            );
        }
    })
}