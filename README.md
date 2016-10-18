# Webuploader-Pack
WebUploader文件上传组件封装

Webuploader-Pack的使用比较简单，你只需要在原有Webuploader的基础上引入baiduUpload.js类，实例化一个baiduUpload的对象并传入相关配置，就可以对文件进行操作了。
## Webuploader-Pack 怎么用？

``` php
// 定义上传配置
 var options = {
     pick: "#picker",
     uploader: "#uploader",
     server: "../../server/fileupload.php",
 };
 // 实例上传对象
 var Uploader = new BaiduUpload(options);
 // 调用上传并传入回调
 Uploader.upload(function(file, response) {
     var $uploader = $(options.uploader);
     var $img = $uploader.find("img");
     $img.attr("src", server_image_url + response.result);
 });
```

## Webuploader-Pack 有哪些配置？
``` php
var options = {
    // swf文件路径
    swf: './js/Uploader.swf',
    // 文件接收服务端。
    server: '',
    // 选择文件的按钮
    pick: '',
    // 设置为 true 后，不需要手动调用上传，有文件选择即开始上传
    auto: true,
    // 是否要分片处理大文件上传
    chunked: false,
    // 如果要分片，分多大一片？ 默认大小为5M
    chunkSize: 5242880,
    // 如果某个分片由于网络问题出错，允许自动重传多少次
    chunkRetry: 2,
    // 上传并发数。允许同时最大上传进程数
    threads: 1,
    // 验证单个文件大小是否超出限制, 超出则不允许加入队列
    fileSingleSizeLimit: 1024 * 1024 * 5,
    // 指定接受哪些类型的文件。 由于目前还有ext转mimeType表，所以这里需要分开指定
    accept: {
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
    }
};
```
