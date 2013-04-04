ImageViewer = function() {
    ImageViewer.instance = this;
    this.selectedTrigger = null;
    this.ovl = $('#ovl');
    this.pic = this.ovl.find('.image');
    this.desc_ctr = this.pic.find('.desc');
    this.desc = this.desc_ctr.find('span');
    this.initTriggers();
}
ImageViewer.ESC = 27;
ImageViewer.RIGHT = 39;
ImageViewer.LEFT = 37;
ImageViewer.prototype = {
    open: function(trigger) {
        this.selectedTrigger = trigger;
        this.pic.css('background-image', 'url("'+trigger.href.toString()+'")');
        this.desc_ctr.removeClass('vrt hrz top bottom').addClass(trigger.getAttribute('data-desc-layout'));
        this.desc.text(trigger.getAttribute('title') || "");
        this.ovl.show();
        return false;
    },
    close: function() {
        this.ovl.hide();
        return false;
    },
    next: function() {
        var next = $(this.selectedTrigger).next('a');
        if (next.length) {
            next.click();
        } else {
            $(this.selectedTrigger.parentNode).find('a:first-child').click();
        }
        return false;
    },
    prev: function() {
        var prev = $(this.selectedTrigger).prev('a');
        if (prev.length) {
            prev.click();
        } else {
            $(this.selectedTrigger.parentNode).find('a:last-child').click();
        }
        return false;
    },
    initTriggers: function() {
        $('.thumbs > a').click(function() {
            return ImageViewer.instance.open(this);
        });
        this.pic.click(this.next.bind(this));
        $(document).keyup(this.onKeyUp.bind(this));
        this.ovl.find('#close').click(this.close.bind(this));
        this.ovl.find('.left a.arrow').click(this.prev.bind(this));
        this.ovl.find('.right a.arrow').click(this.next.bind(this));
    },
    onKeyUp: function(e) {
        switch (e.keyCode) {
            case ImageViewer.ESC:
                this.close();
                break;
            case ImageViewer.RIGHT:
                this.next();
                break;
            case ImageViewer.LEFT:
                this.prev();
                break;
        }
    }
}
$(function() {
    new ImageViewer();
});