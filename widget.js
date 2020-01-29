(function () {
    var jQuery;
    if (window.jQuery === undefined) {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src", "http://3.6.120.180/js/all.js");

        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    scriptLoadHandler();
                }
            };
        } else {
            script_tag.onload = scriptLoadHandler;
        }

        var bootstrap_css = document.createElement("link");
        bootstrap_css.rel = "stylesheet";
        bootstrap_css.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";

        var poptin_css = document.createElement("link");
        poptin_css.rel = "stylesheet";
        poptin_css.href = "http://3.6.120.180/css/poptin.css";

        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(bootstrap_css);
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(poptin_css);
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);

    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    function scriptLoadHandler() {
        jQuery = window.jQuery.noConflict(true);
        main();
    }

    function main() {

        jQuery(document).ready(function ($) {
            let popup = '<div class="modal fade" id="popupModal" tabindex="-1" role="dialog" aria-labelledby="popupModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content modal-transparent"><div id="modal-body" class="modal-body"></div></div></div></div>';
            $(popup).appendTo("body");
            let poptin = document.getElementById("script-poptin").src;
            poptin = poptin.split('=')

            $.ajax({
                type: "GET",
                url: `http://3.6.120.180/api/poptin/${poptin[1]}`,
                success: function (response) {
                    $("#modal-body").html(response.poptin.form_html)
                    $("#popupModal").modal('show')
                    $('div').each(function (i, ele) {
                        $(ele).attr('contentEditable', false);
                    })
                }
            });
        });
    }
})()