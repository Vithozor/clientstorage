(function(window, undefined){
    var clientStorage = (function() {
        var getPathForCookie = function (path) {
            var pathParts;
            path = path || window.location.pathname;
            pathParts = path.split("/");
            //mirem si estem en un document final (p.e: algo.htm) o en un path normal
            if (path.charAt(path.length - 1) !== "/" && pathParts[pathParts.length - 1].indexOf(".") !== -1) {
                pathParts.splice(pathParts.length - 1, 1);
                path = pathParts.join("/") + "/";
            }
            return path;
        };
        return { 
            inCookie: false,
            get: function (key) {
                var stored, expirity, i, cookieValue, cookieName,
                cookies = document.cookie.split(";"),
                cookiesLength = cookies.length;
                if (!key || typeof key !== "string") {
                    return undefined
                }
                if (!this.inCookie && window.localStorage) {
                    stored = JSON.parse(window.localStorage.getItem(key));
                    if (stored && stored.value) {
                        if (stored.expires) {
                            expirity = new Date(stored.expires);
                            if (expirity < new Date()) {
                                this.remove(key);
                                return undefined;
                            }
                        }
                        return stored.value;
                    }
                }
                else {
                    for (i = 0; i < cookiesLength; i++) {
                        cookieValue = unescape(cookies[i].substr(cookies[i].indexOf("=") + 1));
                        if (cookieValue) {
                            cookieName = cookies[i].substr(0, cookies[i].indexOf("="));
                            cookieName = cookieName.replace(/^\s+|\s+$/g, "");
                            if (cookieName === key) {
                                return JSON.parse(cookieValue);
                            }
                        }
                    }
                }
                return undefined;
            },
            set: function (key, value, expires) {
                var objToSave = {}, expiration = new Date(),
                path = getPathForCookie();
                if (!key || !value || typeof key !== "string") {
                    return false;
                }
                if (expires && typeof expires === "number") {
                    expiration.setHours(0, 0, 0, 0);
                    expiration.setDate(expiration.getDate() + expires);
                    objToSave.expires = expiration;
                }
                if (this.inCookie || !window.localStorage) {
                    document.cookie = key + "=" + escape(JSON.stringify(value)) + ((expires) ? "; expires=" + expiration.toUTCString() : "") + "; path=" + path;
                }
                else {
                    objToSave.value = value;
                    window.localStorage.setItem(key, JSON.stringify(objToSave));
                }
                return true;
            },
            remove: function (key, path) {
                path = getPathForCookie(path);
                if (!key || typeof key !== "string") {
                    return false;
                }
                if (!this.inCookie && window.localStorage) {
                    window.localStorage.removeItem(key);
                }
                else {
                    document.cookie = key + "=; expires=-1; path=" + path;
                }
                return true;
            }
        };
    })();
    
    window.clientStorage = clientStorage;
})(window);
