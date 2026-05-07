(function(){
    var $create_robots = $('.create-robots');
    var $form = $create_robots.find('form')[0];
    var $message = $create_robots.find('#message');
    var $input = $create_robots.find('#input');
    $create_robots.find('button').click(function(){
        var a = $form.robolist;
        a.value = "# robots.txt\n";
        if ($form.google.value != "") {
            a.value += "User-agent: Googlebot\nDisallow:" + $form.google.value + "\n"
        }
        if ($form.gimage.value != "") {
            a.value += "User-agent: googlebot-image\nDisallow:" + $form.gimage.value + "\n"
        }
        if ($form.gmobile.value != "") {
            a.value += "User-agent: googlebot-mobile\nDisallow:" + $form.gmobile.value + "\n"
        }
        if ($form.msn.value != "") {
            a.value += "User-agent: MSNBot\nDisallow:" + $form.msn.value + "\n"
        }
        if ($form.yahoo.value != "") {
            a.value += "User-agent: Slurp\nDisallow:" + $form.yahoo.value + "\n"
        }
        if ($form.teoma.value != "") {
            a.value += "User-agent: Teoma\nDisallow:" + $form.teoma.value + "\n"
        }
        if ($form.cuil.value != "") {
            a.value += "User-agent: twiceler\nDisallow:" + $form.cuil.value + "\n"
        }
        if ($form.gigablast.value != "") {
            a.value += "User-agent: Gigabot\nDisallow:" + $form.gigablast.value + "\n"
        }
        if ($form.scrub.value != "") {
            a.value += "User-agent: Scrubby\nDisallow:" + $form.scrub.value + "\n"
        }
        if ($form.dmoz.value != "") {
            a.value += "User-agent: Robozilla\nDisallow:" + $form.dmoz.value + "\n"
        }
        if ($form.nutch.value != "") {
            a.value += "User-agent: Nutch\nDisallow:" + $form.nutch.value + "\n"
        }
        if ($form.alexa.value != "") {
            a.value += "User-agent: ia_archiver\nDisallow:" + $form.alexa.value + "\n"
        }
        if ($form.baidu.value != "") {
            a.value += "User-agent: baiduspider\nDisallow:" + $form.baidu.value + "\n"
        }
        if ($form.naver.value != "") {
            a.value += "User-agent: naverbot\nDisallow:" + $form.naver.value + "\n";
            a.value += "User-agent: yeti\nDisallow:" + $form.naver.value + "\n"
        }
        if ($form.ymm.value != "") {
            a.value += "User-agent: yahoo-mmcrawler\nDisallow:" + $form.ymm.value + "\n"
        }
        if ($form.psbot.value != "") {
            a.value += "User-agent: psbot\nDisallow:" + $form.psbot.value + "\n"
        }
        if ($form.sing.value != "") {
            a.value += "User-agent: asterias\nDisallow:" + $form.sing.value + "\n"
        }
        if ($form.blogs.value != "") {
            a.value += "User-agent: yahoo-blogs/v3.9\nDisallow:" + b.blogs.value + "\n"
        }
        if ($form.allow.value != "") {
            a.value += "User-agent: *\nDisallow:" + $form.allow.value + "\n"
        }
        if ($form.delay.value != "") {
            a.value += "Crawl-delay: " + $form.delay.value + "\n"
        }
        if ($form.T1.value != "") {
            a.value += "Disallow: " + $form.T1.value + "\n"
        }
        if ($form.T2.value != "") {
            a.value += "Disallow: " + $form.T2.value + "\n"
        }
        if ($form.T3.value != "") {
            a.value += "Disallow: " + $form.T3.value + "\n"
        }
        if ($form.T4.value != "") {
            a.value += "Disallow: " + $form.T4.value + "\n"
        }
        if ($form.T5.value != "") {
            a.value += "Disallow: " + $form.T5.value + "\n"
        }
        if ($form.sitemap.value != "") {
            a.value += "Sitemap: " + $form.sitemap.value + "\n"
        }

    });
})();