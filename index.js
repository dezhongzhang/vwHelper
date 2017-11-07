/**
 * Polyfill for the vw units
 * Requires StyleFix from -prefix-free http://leaverou.github.com/prefixfree/
 * @author zhangdz
 */

(function() {

    if(!window.StyleFix) {
        return;
    }

    // Feature test
    var dummy = document.createElement('_').style,
        units = ['vw'].filter(function(unit) {
            dummy.width = '';
            dummy.width = '10' + unit;
            return !dummy.width;
        });

    if(!units.length) {
        return;
    }


    var pxRegex = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)vw/igm;

    function toFixed(number, precision) {
        var multiplier = Math.pow(10, precision + 1),
            wholeNumber = Math.floor(number * multiplier);
        return Math.round(wholeNumber / 10) * 10 / multiplier;
    }
    StyleFix.register(function(css) {
        return css.replace(pxRegex, function(m, $1) {
            if (!$1) return m;
            var pixels = parseFloat($1);
            return toFixed((pixels * innerWidth / 100), 5) + 'px';
        });
    });

})();