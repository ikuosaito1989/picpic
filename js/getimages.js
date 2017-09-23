function constructor()
{
    var $loading = $(".loading");
    $loading.removeClass("is-hide");
    $loading.addClass("is-hide");
    $("#word").val("");
    $('.col-md-2').remove();
    for (var i=0; i<20; i++) {
        var no = i + 1;
        var imgNo = ('0' + no).slice(-2);
        var insertTag = "<a href={0} target=\"_blank\"><li class=\"col-md-2 post\"><figure><img src=\"{1}\"><figcaption><h3>{2}</h3><span>{3}</span></figcaption></figure></li></a>";
        insertTag = insertTag.replace("{0}","images/uploads/" + imgNo + ".jpg")
        insertTag = insertTag.replace("{1}","images/uploads/" + imgNo + ".jpg")
        insertTag = insertTag.replace("{2}", "noName")
        insertTag = insertTag.replace("{3}", "NoArtists")
        $(".row").append(insertTag);
    }
}
function get()
{
    var word = $("#word").val();
    var url = "https://itunes.apple.com/search?lang=ja_jp&entry=music&media=music&country=JP&term={0}".replace("{0}",word);
    var $loading = $(".loading");
    $loading.removeClass("is-hide");
    setTimeout(function(){
        $.ajax({
            url : url,
            type : "GET",
            dataType : "json",
            success : function(data){
                if(data.resultCount == 0)
                {
                    constructor()
                }else
                {
                    $('.col-md-2').remove();
                    for (var i=0; i<data.resultCount; i++) {
                        var insertTag = "<a href={0} target=\"_blank\"><li class=\"col-md-2 post\"><figure><img src=\"{1}\"><figcaption><h3>{2}</h3><span>{3}</span></figcaption></figure></li></a>";
                        insertTag = insertTag.replace("{0}",data.results[i].artworkUrl100.replace("100x100bb","1000x1000bb"))
                        insertTag = insertTag.replace("{1}",data.results[i].artworkUrl100.replace("100x100bb","300x300bb"))
                        insertTag = insertTag.replace("{2}",data.results[i].collectionName)
                        insertTag = insertTag.replace("{3}",data.results[i].artistName)
                        $(".row").append(insertTag);
                    }    
                }
            },
            complete : function(data) {
                $loading.addClass("is-hide");
            }
        });
    },400)
}