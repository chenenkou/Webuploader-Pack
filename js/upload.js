$(function() {

    var server_image_url = "/";

    var options = {
        pick: "#picker",
        uploader: "#uploader",
        server: "./fileupload.php"
    };
    var Uploader = new BaiduUpload(options);

    Uploader.upload(function(file, response) {

        var $uploader = $(options.uploader);
        var $img = $uploader.find("img");
        $img.attr("src", server_image_url + response.result);
    });

    var options2 = {
        pick: "#picker2",
        uploader: "#uploader2",
        server: "./fileupload.php"
    };
    var Uploader2 = new BaiduUpload(options2);
    Uploader2.upload(function(file, response) {


        var $uploader = $(options2.uploader);
        var $img = $uploader.find("img");
        $img.attr("src", server_image_url + response.result);
    });


});
