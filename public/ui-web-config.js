(function (window) {
    window.initBasicUrl = function(env) {
        window.ENV = env || 'development'
        window.BASE_API = window.ENV === 'development' ? '/eip-admin-rest' : 'http://192.168.52.92:8443/eip-admin-rest'
    }
})(window)
