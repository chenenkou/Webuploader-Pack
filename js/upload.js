$(function() {
    var server_image_url = "/";

    // 上传图片
    (function () {
        var options = {
            pick: "#picker",
            uploader: "#uploader",
            accept: {
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
            },
            server : window.location.protocol + '//upload.qiniup.com/',
            formData: {
                token : "" // 七牛上传的TOKEN
            }
        };
        var Uploader = new BaiduUpload(options);
        Uploader.upload(function(file, response) {
            // response = {"domain": "https://pic2.hanmaker.com/", "key":"common/images/20180627/image/png/24541/Fq8PAPrzaE8Nd2eA8i34VNiKO9I_153715.png"}
            var $uploader = $(options.uploader);
            var $img = $uploader.find("img");
            var src = response.domain + response.key;
            $img.attr("src", src);
        });
    })();

    // 上传文件
    (function () {
        var options2 = {
            pick: "#picker2",
            uploader: "#uploader2",
            accept: {
                extensions: 'zip',
                mimeTypes: '"application/x-zip-compressed"'
            },
            server : window.location.protocol + '//upload.qiniup.com/',
            formData: {
                token : "" // 七牛上传的TOKEN
            }
        };
        var setting2 = {
            fileQueued: function(that, file) {
                var $uploader = $(that.uploader);
            },
            // 上传中进度处理
            uploadProgress: function (that, file, percentage) {
                var percent = parseInt(percentage * 100);
                console.log(percent);
            }
        }
        var Uploader2 = new BaiduUpload(options2, setting2);
        Uploader2.upload(function(file, response) {
            // response = {"domain": "https://pic2.hanmaker.com/", "name": "abc.zip", "key":"common/images/20180627/image/png/24541/Fq8PAPrzaE8Nd2eA8i34VNiKO9I_153715.png"}
            var $uploader = $(options2.uploader);
            var $a = $uploader.find("a");
            var href = response.domain + response.key;
            $a.attr("href", href);
            $a.text(response.name);
        });
    })();

});
