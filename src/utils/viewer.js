import Vue from 'vue'
import viewer from "v-viewer"// 图片预览
import "viewerjs/dist/viewer.css"// 图片预览

Vue.use(viewer);

viewer.setDefaults({
    defaultOptions: {
        zIndex: 9999
    },
    Options: {
        "inline": true,
        "button": true,
        "navbar": true,
        "title": true,
        "toolbar": true,
        "tooltip": true,
        "movable": true,
        "zoomable": true,
        "rotatable": true,
        "scalable": true,
        "transition": true,
        "fullscreen": true,
        "keyboard": true,
        "url": "data-source"
    }
});
