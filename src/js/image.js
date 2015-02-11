require.config({
    paths: {
        jquery: 'jquery.min',
        handlebars: 'handlebars-v2.0.0',
        imagesloaded: 'imagesLoaded',
        main: 'main'
    }
});
//load youtube video on home page
require(["jquery", "handlebars", "imagesLoaded", "main"]);
