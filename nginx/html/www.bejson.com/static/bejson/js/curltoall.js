/**
	curl-to-Go
	by Matt Holt

	https://github.com/mholt/curl-to-go

	A simple utility to convert curl commands into Go code.
*/
function curlToGo(curl) {
    var err = 'if err != nil {\n\t// handle err\n}\n';
    var deferClose = 'defer resp.Body.Close()\n';
    var promo = "";
    var originalCmd = curl.split(/\r\n?|\n/).map((line) => `// ${line}`).join('\n');
    var header = `${promo}\n\n${originalCmd}\n\n`;

    // List of curl flags that are boolean typed; this helps with parsing
    // a command like `curl -abc value` to know whether 'value' belongs to '-c'
    // or is just a positional argument instead.
    // https://github.com/curl/curl/blob/f410b9e538129e77607fef1894f96c684a7c8c3b/src/tool_getparam.c#L73-L341
    var boolOptions = new Set([
        'disable-epsv', 'no-disable-epsv', 'disallow-username-in-url', 'no-disallow-username-in-url',
        'epsv', 'no-epsv', 'npn', 'no-npn', 'alpn', 'no-alpn', 'compressed', 'no-compressed',
        'tr-encoding', 'no-tr-encoding', 'digest', 'no-digest', 'negotiate', 'no-negotiate',
        'ntlm', 'no-ntlm', 'ntlm-wb', 'no-ntlm-wb', 'basic', 'no-basic', 'anyauth', 'no-anyauth',
        'wdebug', 'no-wdebug', 'ftp-create-dirs', 'no-ftp-create-dirs',
        'create-dirs', 'no-create-dirs', 'proxy-ntlm', 'no-proxy-ntlm', 'crlf', 'no-crlf',
        'haproxy-protocol', 'no-haproxy-protocol', 'disable-eprt', 'no-disable-eprt',
        'eprt', 'no-eprt', 'xattr', 'no-xattr', 'ftp-ssl', 'no-ftp-ssl', 'ssl', 'no-ssl',
        'ftp-pasv', 'no-ftp-pasv', 'tcp-nodelay', 'no-tcp-nodelay', 'proxy-digest', 'no-proxy-digest',
        'proxy-basic', 'no-proxy-basic', 'retry-connrefused', 'no-retry-connrefused',
        'proxy-negotiate', 'no-proxy-negotiate', 'proxy-anyauth', 'no-proxy-anyauth',
        'trace-time', 'no-trace-time', 'ignore-content-length', 'no-ignore-content-length',
        'ftp-skip-pasv-ip', 'no-ftp-skip-pasv-ip', 'ftp-ssl-reqd', 'no-ftp-ssl-reqd',
        'ssl-reqd', 'no-ssl-reqd', 'sessionid', 'no-sessionid', 'ftp-ssl-control', 'no-ftp-ssl-control',
        'ftp-ssl-ccc', 'no-ftp-ssl-ccc', 'raw', 'no-raw', 'post301', 'no-post301',
        'keepalive', 'no-keepalive', 'post302', 'no-post302',
        'socks5-gssapi-nec', 'no-socks5-gssapi-nec', 'ftp-pret', 'no-ftp-pret', 'post303', 'no-post303',
        'metalink', 'no-metalink', 'sasl-ir', 'no-sasl-ir', 'test-event', 'no-test-event',
        'path-as-is', 'no-path-as-is', 'tftp-no-options', 'no-tftp-no-options',
        'suppress-connect-headers', 'no-suppress-connect-headers', 'compressed-ssh', 'no-compressed-ssh',
        'retry-all-errors', 'no-retry-all-errors',
        'http1.0', 'http1.1', 'http2', 'http2-prior-knowledge', 'http3', 'http0.9', 'no-http0.9',
        'tlsv1', 'tlsv1.0', 'tlsv1.1', 'tlsv1.2', 'tlsv1.3', 'sslv2', 'sslv3',
        'ipv4', 'ipv6',
        'append', 'no-append', 'use-ascii', 'no-use-ascii', 'ssl-allow-beast', 'no-ssl-allow-beast',
        'ssl-auto-client-cert', 'no-ssl-auto-client-cert',
        'proxy-ssl-auto-client-cert', 'no-proxy-ssl-auto-client-cert', 'cert-status', 'no-cert-status',
        'doh-cert-status', 'no-doh-cert-status', 'false-start', 'no-false-start',
        'ssl-no-revoke', 'no-ssl-no-revoke', 'ssl-revoke-best-effort', 'no-ssl-revoke-best-effort',
        'tcp-fastopen', 'no-tcp-fastopen', 'proxy-ssl-allow-beast', 'no-proxy-ssl-allow-beast',
        'proxy-insecure', 'no-proxy-insecure', 'proxy-tlsv1', 'socks5-basic', 'no-socks5-basic',
        'socks5-gssapi', 'no-socks5-gssapi', 'fail', 'no-fail', 'fail-early', 'no-fail-early',
        'styled-output', 'no-styled-output', 'mail-rcpt-allowfails', 'no-mail-rcpt-allowfails',
        'fail-with-body', 'no-fail-with-body', 'globoff', 'no-globoff', 'get', 'help', 'no-help',
        'include', 'no-include', 'head', 'no-head', 'junk-session-cookies', 'no-junk-session-cookies',
        'remote-header-name', 'no-remote-header-name', 'insecure', 'no-insecure',
        'doh-insecure', 'no-doh-insecure', 'list-only', 'no-list-only', 'location', 'no-location',
        'location-trusted', 'no-location-trusted', 'manual', 'no-manual', 'netrc', 'no-netrc',
        'netrc-optional', 'no-netrc-optional', 'buffer', 'no-buffer', 'remote-name',
        'remote-name-all', 'no-remote-name-all', 'proxytunnel', 'no-proxytunnel', 'disable', 'no-disable',
        'remote-time', 'no-remote-time', 'silent', 'no-silent', 'show-error', 'no-show-error',
        'verbose', 'no-verbose', 'version', 'no-version', 'parallel', 'no-parallel',
        'parallel-immediate', 'no-parallel-immediate', 'progress-bar', 'no-progress-bar',
        'progress-meter', 'no-progress-meter', 'next',
        // renamed to --http3 in https://github.com/curl/curl/commit/026840e3
        'http3-direct',
        // replaced by --request-target in https://github.com/curl/curl/commit/9b167fd0
        'strip-path-slash', 'no-strip-path-slash',
        // removed in https://github.com/curl/curl/commit/a8e388dd
        'environment', 'no-environment',
        // curl technically accepted these non-sensical options, they were removed in
        // https://github.com/curl/curl/commit/913c3c8f
        'no-http1.0', 'no-http1.1', 'no-http2', 'no-http2-prior-knowledge',
        'no-tlsv1', 'no-tlsv1.0', 'no-tlsv1.1', 'no-tlsv1.2', 'no-tlsv1.3', 'no-sslv2', 'no-sslv3',
        'no-ipv4', 'no-ipv6', 'no-proxy-tlsv1', 'no-get', 'no-remote-name', 'no-next',
        // removed in https://github.com/curl/curl/commit/720ea577
        'proxy-sslv2', 'no-proxy-sslv2', 'proxy-sslv3', 'no-proxy-sslv3',
        // removed in https://github.com/curl/curl/commit/388c6b5e
        // I don't think this was ever a real short option
        // '~',
        // renamed to --http2 in https://github.com/curl/curl/commit/0952c9ab
        'http2.0', 'no-http2.0',
        // removed in https://github.com/curl/curl/commit/ebf31389
        // I don't think this option was ever released, it was renamed the same day
        // it was introduced
        // 'ssl-no-empty-fragments', 'no-ssl-no-empty-fragments',
        // renamed to --ntlm-wb in https://github.com/curl/curl/commit/b4f6319c
        'ntlm-sso', 'no-ntlm-sso',
        // all options got "--no-" versions in https://github.com/curl/curl/commit/5abfdc01
        // renamed to --no-keepalive in https://github.com/curl/curl/commit/f866af91
        'no-keep-alive',
        // may've been short for --crlf until https://github.com/curl/curl/commit/16643faa
        // '9',
        // removed in https://github.com/curl/curl/commit/07660eea
        // -@ used to be short for --create-dirs
        'ftp-ascii', // '@',
        // removed in https://github.com/curl/curl/commit/c13dbf7b
        // 'c', 'continue',
        // removed in https://github.com/curl/curl/commit/a1d6ad26
        // -t used to be short for --upload
        // 't', 'upload',
        // https://github.com/mholt/curl-to-go/pull/47#issuecomment-879485938
        '-',
    ]);

    // all of curl's short options have a long form
    var optionAliases = {
        '0': 'http1.0',
        '1': 'tlsv1',
        '2': 'sslv2',
        '3': 'sslv3',
        '4': 'ipv4',
        '6': 'ipv6',
        'a': 'append',
        'A': 'user-agent',
        'b': 'cookie',
        'B': 'use-ascii',
        'c': 'cookie-jar',
        'C': 'continue-at',
        'd': 'data',
        'D': 'dump-header',
        'e': 'referer',
        'E': 'cert',
        'f': 'fail',
        'F': 'form',
        'g': 'globoff',
        'G': 'get',
        'h': 'help',
        'H': 'header',
        'i': 'include',
        'I': 'head',
        'j': 'junk-session-cookies',
        'J': 'remote-header-name',
        'k': 'insecure',
        'K': 'config',
        'l': 'list-only',
        'L': 'location',
        'm': 'max-time',
        'M': 'manual',
        'n': 'netrc',
        // N is an alias for --no-buffer, not --buffer
        'N': 'no-buffer',
        'o': 'output',
        'O': 'remote-name',
        'p': 'proxytunnel',
        'P': 'ftp-port',
        'q': 'disable',
        'Q': 'quote',
        'r': 'range',
        'R': 'remote-time',
        's': 'silent',
        'S': 'show-error',
        't': 'telnet-option',
        'T': 'upload-file',
        'u': 'user',
        'U': 'proxy-user',
        'v': 'verbose',
        'V': 'version',
        'w': 'write-out',
        'x': 'proxy',
        'X': 'request',
        'Y': 'speed-limit',
        'y': 'speed-time',
        'z': 'time-cond',
        'Z': 'parallel',
        '#': 'progress-bar',
        ':': 'next',
    };

    if (!curl.trim())
        return;
    var cmd = parseCommand(curl, { boolFlags: boolOptions, aliases: optionAliases });

    if (cmd._[0] != "curl")
        throw "Not a curl command";

    var req = extractRelevantPieces(cmd);

    if (Object.keys(req.headers).length == 0 && !req.data.ascii && !req.data.files && !req.basicauth && !req.insecure) {
        return header+renderSimple(req.method, req.url);
    } else {
        return header+renderComplex(req);
    }


    // renderSimple renders a simple HTTP request using net/http convenience methods
    function renderSimple(method, url) {
        if (method == "GET")
            return 'resp, err := http.Get('+goExpandEnv(url)+')\n'+err+deferClose;
        else if (method == "POST")
            return 'resp, err := http.Post('+goExpandEnv(url)+', "", nil)\n'+err+deferClose;
        else if (method == "HEAD")
            return 'resp, err := http.Head('+goExpandEnv(url)+')\n'+err+deferClose;
        else
            return 'req, err := http.NewRequest('+goExpandEnv(method)+', '+goExpandEnv(url)+', nil)\n'+err+'resp, err := http.DefaultClient.Do(req)\n'+err+deferClose;
    }

    // renderComplex renders Go code that requires making a http.Request.
    function renderComplex(req) {
        var go = "";

        // init client name
        var clientName = "http.DefaultClient";

        // insecure
        // -k or --insecure
        if (req.insecure) {
            go += '// TODO: This is insecure; use only in dev environments.\n';
            go += 'tr := &http.Transport{\n' +
                '        TLSClientConfig: &tls.Config{InsecureSkipVerify: true},\n' +
                '    }\n' +
                '    client := &http.Client{Transport: tr}\n\n';

            clientName = "client";
        }

        // load body data
        // KNOWN ISSUE: -d and --data are treated like --data-binary in
        // that we don't strip out carriage returns and newlines.
        var defaultPayloadVar = "body";
        if (!req.data.ascii && !req.data.files) {
            // no data; this is easy
            go += 'req, err := http.NewRequest("'+req.method+'", '+goExpandEnv(req.url)+', nil)\n'+err;
        } else {
            var ioReaders = [];

            // if there's text data...
            if (req.data.ascii) {
                var stringBody = function() {
                    if (req.dataType == "raw" ) {
                        go += defaultPayloadVar+' := strings.NewReader("'+req.data.ascii.replace(/\"/g, "\\\"") +'")\n'
                    } else {
                        go += defaultPayloadVar+' := strings.NewReader(`'+req.data.ascii+'`)\n'
                    }
                    ioReaders.push(defaultPayloadVar);
                }

                if (req.headers["Content-Type"] && req.headers["Content-Type"].indexOf("json") > -1) {
                    // create a struct for the JSON
                    var result = jsonToGo(req.data.ascii, "Payload");
                    if (result.error)
                        stringBody(); // not valid JSON, so just treat as a regular string
                    else if (result.go) {
                        // valid JSON, so create a struct to hold it
                        go += result.go+'\n\ndata := Payload {\n\t// fill struct\n}\n';
                        go += 'payloadBytes, err := json.Marshal(data)\n'+err;
                        go += defaultPayloadVar+' := bytes.NewReader(payloadBytes)\n\n';
                    }
                } else if(req.headers["Content-Type"] && req.headers["Content-Type"] == "application/x-www-form-urlencoded") {
                    go += "params := url.Values{}\n"
                    var params = new URLSearchParams(req.data.ascii);
                    params.forEach(function(fvalue, fkey){
                        go += 'params.Add("' + fkey + '", `' + fvalue + '`)\n'
                    });
                    go += defaultPayloadVar+ ' := strings.NewReader(params.Encode())\n\n'
                }else {
                    // not a json Content-Type, so treat as string
                    stringBody();
                }
            }

            // if file data...
            if (req.data.files && req.data.files.length > 0) {
                var varName = "f";
                for (var i = 0; i < req.data.files.length; i++) {
                    var thisVarName = (req.data.files.length > 1 ? varName+(i+1) : varName);
                    go += thisVarName+', err := os.Open('+goExpandEnv(req.data.files[i])+')\n'+err;
                    go += 'defer '+thisVarName+'.Close()\n';
                    ioReaders.push(thisVarName);
                }
            }

            // render go code to put all the data in the body, concatenating if necessary
            var payloadVar = defaultPayloadVar;
            if (ioReaders.length > 0)
                payloadVar = ioReaders[0];
            if (ioReaders.length > 1) {
                payloadVar = "payload";
                // KNOWN ISSUE: The way we separate file and ascii data values
                // loses the order between them... our code above just puts the
                // ascii values first, followed by the files.
                go += 'payload := io.MultiReader('+ioReaders.join(", ")+')\n';
            }
            go += 'req, err := http.NewRequest("'+req.method+'", '+goExpandEnv(req.url)+', '+payloadVar+')\n'+err;
        }

        // set basic auth
        if (req.basicauth) {
            go += 'req.SetBasicAuth('+goExpandEnv(req.basicauth.user)+', '+goExpandEnv(req.basicauth.pass)+')\n';
        }

        // if a Host header was set, we need to specify that specially
        // (see the godoc for the http.Request.Host field) - issue #15
        if (req.headers["Host"]) {
            go += 'req.Host = "'+req.headers["Host"]+'"\n';
            delete req.headers["Host"];
        }

        // set headers
        for (var name in req.headers) {
            go += 'req.Header.Set('+goExpandEnv(name)+', '+goExpandEnv(req.headers[name])+')\n';
        }

        // execute request
        go += "\nresp, err := "+clientName+".Do(req)\n";
        go += err+deferClose;

        return go;
    }

    // extractRelevantPieces returns an object with relevant pieces
    // extracted from cmd, the parsed command. This accounts for
    // multiple flags that do the same thing and return structured
    // data that makes it easy to spit out Go code.
    function extractRelevantPieces(cmd) {
        var relevant = {
            url: "",
            method: "",
            headers: [],
            data: {},
            dataType: "string",
            insecure: false
        };

        // prefer --url over unnamed parameter, if it exists; keep first one only
        if (cmd.url && cmd.url.length > 0)
            relevant.url = cmd.url[0];
        else if (cmd._.length > 1)
            relevant.url = cmd._[1]; // position 1 because index 0 is the curl command itself

        // gather the headers together
        if (cmd.header)
            relevant.headers = relevant.headers.concat(cmd.header);
        relevant.headers = parseHeaders(relevant.headers)

        // set method to HEAD?
        if (cmd.head)
            relevant.method = "HEAD";

        if (cmd.request && cmd.request.length > 0)
            relevant.method = cmd.request[cmd.request.length-1].toUpperCase(); // if multiple, use last (according to curl docs)
        else if (
            (cmd["data-binary"] && cmd["data-binary"].length > 0)
            || (cmd["data-raw"] && cmd["data-raw"].length > 0)
        ) {
            // for --data-binary and --data-raw, use method POST & data-type raw
            relevant.method = "POST";
            relevant.dataType = "raw";
        }

        // join multiple request body data, if any
        var dataAscii = [];
        var dataFiles = [];
        var loadData = function (d, dataRawFlag = false) {
            if (!relevant.method)
                relevant.method = "POST";

            // according to issue #8, curl adds a default Content-Type
            // header if one is not set explicitly
            if (!relevant.headers["Content-Type"])
                relevant.headers["Content-Type"] = "application/x-www-form-urlencoded";

            for (var i = 0; i < d.length; i++) {
                if (
                    d[i].length > 0 && d[i][0] == "@"
                    && !dataRawFlag // data-raw flag ignores '@' character
                ) {
                    dataFiles.push(d[i].substr(1));
                } else {
                    dataAscii.push(d[i]);
                }
            }
        };
        if (cmd.data)
            loadData(cmd.data);
        if (cmd["data-binary"])
            loadData(cmd["data-binary"]);
        if (cmd["data-raw"])
            loadData(cmd["data-raw"], true)
        if (dataAscii.length > 0)
            relevant.data.ascii = dataAscii.join("&");
        if (dataFiles.length > 0)
            relevant.data.files = dataFiles;

        var basicAuthString = "";
        if (cmd.user && cmd.user.length > 0)
            basicAuthString = cmd.user[cmd.user.length-1];
        // if the -u or --user flags haven't been set then don't set the
        // basicauth property.
        if (basicAuthString) {
            var basicAuthSplit = basicAuthString.indexOf(":");
            if (basicAuthSplit > -1) {
                relevant.basicauth = {
                    user: basicAuthString.substr(0, basicAuthSplit),
                    pass: basicAuthString.substr(basicAuthSplit+1)
                };
            } else {
                // the user has not provided a password
                relevant.basicauth = { user: basicAuthString, pass: "<PASSWORD>" };
            }
        }

        // default to GET if nothing else specified
        if (!relevant.method)
            relevant.method = "GET";

        if (cmd.insecure) {
            relevant.insecure = true;
        }

        return relevant;
    }

    // parseHeaders converts an array of header strings (like "Content-Type: foo")
    // into a map of key/values. It assumes header field names are unique.
    function parseHeaders(stringHeaders) {
        var headers = {};
        for (var i = 0; i < stringHeaders.length; i++) {
            var split = stringHeaders[i].indexOf(":");
            if (split == -1) continue;
            var name = stringHeaders[i].substr(0, split).trim();
            var value = stringHeaders[i].substr(split+1).trim();
            headers[toTitleCase(name)] = value;
        }
        return headers;
    }

    function toTitleCase(str) {
        return str.replace(/\w*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    // goExpandEnv adds surrounding quotes around s to make it a Go string,
    // escaping any characters as needed. It checks to see if s has an
    // environment variable in it. If so, it returns s wrapped in a Go
    // function that expands the environment variable. Otherwise, it
    // returns s wrapped in quotes and escaped for use in Go strings.
    // s should not already be escaped! This function always returns a Go
    // string value.
    function goExpandEnv(s) {
        var pos = s.indexOf("$");
        if (pos > -1)
        {
            if (pos > 0 && s[pos-1] == '\\') {
                // The $ is escaped, so strip the escaping backslash
                s = s.substr(0, pos-1) + s.substr(pos);
            } else {
                // $ is not escaped, so treat it as an env variable
                return 'os.ExpandEnv("'+goEsc(s)+'")';
            }
        }
        return '"'+goEsc(s)+'"';
    }

    // goEsc escapes characters in s so that it is safe to use s in
    // a "quoted string" in a Go program
    function goEsc(s) {
        return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    }
}

/**
	curl-to-java
	By fivesmallq
	Based on curl-to-php by John C (https://github.com/incarnate/curl-to-php) and curl-to-go by Matt Holt (https://github.com/mholt/curl-to-go)
	https://github.com/fivesmallq/curl-to-java
	A simple utility to convert curl commands into Java code.
*/
function curlToJava(curl) {
    var statusPrint = 'HttpResponse httpResponse = request.execute().returnResponse();\nSystem.out.println(httpResponse.getStatusLine());\n';
    var responsePrint = 'if (httpResponse.getEntity() != null) {\n\tString html = EntityUtils.toString(httpResponse.getEntity());\n\tSystem.out.println(html);\n}';
    var promo = "";

    // List of curl flags that are boolean typed; this helps with parsing
    // a command like `curl -abc value` to know whether 'value' belongs to '-c'
    // or is just a positional argument instead.
    var boolOptions = ['#', 'progress-bar', '-', 'next', '0', 'http1.0', 'http1.1', 'http2',
        'no-npn', 'no-alpn', '1', 'tlsv1', '2', 'sslv2', '3', 'sslv3', '4', 'ipv4', '6', 'ipv6',
        'a', 'append', 'anyauth', 'B', 'use-ascii', 'basic', 'compressed', 'create-dirs',
        'crlf', 'digest', 'disable-eprt', 'disable-epsv', 'environment', 'cert-status',
        'false-start', 'f', 'fail', 'ftp-create-dirs', 'ftp-pasv', 'ftp-skip-pasv-ip',
        'ftp-pret', 'ftp-ssl-ccc', 'ftp-ssl-control', 'g', 'globoff', 'G', 'get',
        'ignore-content-length', 'i', 'include', 'I', 'head', 'j', 'junk-session-cookies',
        'J', 'remote-header-name', 'k', 'insecure', 'l', 'list-only', 'L', 'location',
        'location-trusted', 'metalink', 'n', 'netrc', 'N', 'no-buffer', 'netrc-file',
        'netrc-optional', 'negotiate', 'no-keepalive', 'no-sessionid', 'ntlm', 'O',
        'remote-name', 'oauth2-bearer', 'p', 'proxy-tunnel', 'path-as-is', 'post301', 'post302',
        'post303', 'proxy-anyauth', 'proxy-basic', 'proxy-digest', 'proxy-negotiate',
        'proxy-ntlm', 'q', 'raw', 'remote-name-all', 's', 'silent', 'sasl-ir', 'S', 'show-error',
        'ssl', 'ssl-reqd', 'ssl-allow-beast', 'ssl-no-revoke', 'socks5-gssapi-nec', 'tcp-nodelay',
        'tlsv1.0', 'tlsv1.1', 'tlsv1.2', 'tr-encoding', 'trace-time', 'v', 'verbose', 'xattr',
        'h', 'help', 'M', 'manual', 'V', 'version'];

    if (!curl.trim())
        return;
    var cmd = parseCommand(curl, { boolFlags: boolOptions });

    if (cmd._[0] != "curl")
        throw "Not a curl command";

    var req = extractRelevantPieces(cmd);

    if (Object.keys(req.headers).length == 0 && !req.data.ascii && !req.data.files && !req.basicauth) {
        return promo+"\n"+renderSimple(req.method, req.url);
    } else {
        return promo+"\n\n"+renderComplex(req);
    }


    // renderSimple renders a simple HTTP request using net/http convenience methods
    function renderSimple(method, url) {
        if (method == "Get")
            return 'Request request = Request.Get("'+url+'");\n'+statusPrint+responsePrint;
        else if (method == "Post")
            return 'Request request = Request.Post("'+url+'");\n'+statusPrint+responsePrint;
        else if (method == "Head")
            return 'Request request = Request.Head("'+url+'");\n'+statusPrint+responsePrint;
        else
            return 'Request request = http.NewRequest('+method+', '+url+', nil);\nresp, err := http.DefaultClient.Do(req)\n'+statusPrint+responsePrint;
    }

    // renderComplex renders Java code that requires making a Request.
    function renderComplex(req) {
        var java = "";

        // load body data
        // KNOWN ISSUE: -d and --data are treated like --data-binary in
        // that we don't strip out carriage returns and newlines.
        var defaultPayloadVar = "String body";
        if (!req.data.ascii && !req.data.files) {
            // no data; this is easy
            java += 'Request request = Request.'+req.method+'("'+req.url+'");\n'+statusPrint;
        } else {
            var ioReaders = [];
            java += 'Request request = Request.'+req.method+'("'+req.url+'");\n';

            // if there's text data...
            if (req.data.ascii) {
                var stringBody = function() {
                    ioReaders.push(JSON.stringify(req.data.ascii));
                }
                // not a json Content-Type, so treat as string
                stringBody();
            }

            // if file data...
            if (req.data.files && req.data.files.length > 0) {
                var varName = "f";
                for (var i = 0; i < req.data.files.length; i++) {
                    var thisVarName = (req.data.files.length > 1 ? varName+(i+1) : varName);
                    java += "File "+thisVarName+'= new File("'+req.data.files[i]+'");\n';
                    java += 'request.bodyFile('+thisVarName+',ContentType.MULTIPART_FORM_DATA);\n';
                    ioReaders.push(thisVarName);
                }
            }

            // render java code to put all the data in the body, concatenating if necessary
            var payloadVar = defaultPayloadVar;
            if (ioReaders.length > 0 && typeof varName == 'undefined' ) {
                ioReaders[0] = ioReaders[0].replace(/\=[\'\"]\{([^$]+)\}[\'\"]/, '={$1}');
                // KNOWN ISSUE: The way we separate file and ascii data values
                // loses the order between them... our code above just puts the
                // ascii values first, followed by the files.
                java += 'String body = '+ioReaders.join(", ")+';\n';
                var contentType="ContentType.APPLICATION_FORM_URLENCODED";
                if (req.headers["Content-Type"] && req.headers["Content-Type"].indexOf("json") > -1) {
                    contentType="ContentType.APPLICATION_JSON";
                }
                java += 'request.bodyString(body,'+contentType+');\n'
            }

        }

        // set basic auth
        if (req.basicauth) {
            //java += 'req.SetBasicAuth('+goExpandEnv(req.basicauth.user)+', '+goExpandEnv(req.basicauth.pass)+')\n';
        }

        // set headers
        for (var name in req.headers) {
            java += 'request.setHeader("'+name+'", "'+req.headers[name]+'");\n';
        }

        // execute request
        java += statusPrint+responsePrint;

        return java;
    }

    // extractRelevantPieces returns an object with relevant pieces
    // extracted from cmd, the parsed command. This accounts for
    // multiple flags that do the same thing and return structured
    // data that makes it easy to spit out Go code.
    function extractRelevantPieces(cmd) {
        var relevant = {
            url: "",
            method: "",
            headers: [],
            data: {},
            dataType: "string"
        };

        // prefer --url over unnamed parameter, if it exists; keep first one only
        if (cmd.url && cmd.url.length > 0)
            relevant.url = cmd.url[0];
        else if (cmd._.length > 1)
            relevant.url = cmd._[1]; // position 1 because index 0 is the curl command itself
        // fix url prefix
        if (relevant.url.indexOf("http")==-1)
            relevant.url="http://"+relevant.url;
        // gather the headers together
        if (cmd.H)
            relevant.headers = relevant.headers.concat(cmd.H);
        if (cmd.header)
            relevant.headers = relevant.headers.concat(cmd.header);
        relevant.headers = parseHeaders(relevant.headers)

        // set method to HEAD?
        if (cmd.I || cmd.head)
            relevant.method = "HEAD";

        // between -X and --request, prefer the long form I guess
        if (cmd.request && cmd.request.length > 0)
            relevant.method = cmd.request[cmd.request.length-1].toUpperCase();
        else if (cmd.X && cmd.X.length > 0)
            relevant.method = cmd.X[cmd.X.length-1].toUpperCase(); // if multiple, use last (according to curl docs)
        else if (cmd["data-binary"] && cmd["data-binary"].length > 0) {
            relevant.method = "POST"; // if data-binary, user method POST
            relevant.dataType = "raw"; // if data-binary, post body will be raw
        }

        // join multiple request body data, if any
        var dataAscii = [];
        var dataFiles = [];
        var loadData = function(d) {
            if (!relevant.method)
                relevant.method = "POST";

            // according to issue #8, curl adds a default Content-Type
            // header if one is not set explicitly
            if (!relevant.headers["Content-Type"])
                relevant.headers["Content-Type"] = "application/x-www-form-urlencoded";

            for (var i = 0; i < d.length; i++)
            {
                if (d[i].length > 0 && d[i][0] == "@")
                    dataFiles.push(d[i].substr(1));
                else
                    dataAscii.push(d[i]);
            }
        };
        if (cmd.d)
            loadData(cmd.d);
        if (cmd.data)
            loadData(cmd.data);
        if (cmd["data-binary"])
            loadData(cmd["data-binary"]);
        if (dataAscii.length > 0)
            relevant.data.ascii = dataAscii.join("&");
        if (dataFiles.length > 0)
            relevant.data.files = dataFiles;

        // between -u and --user, choose the long form...
        var basicAuthString = "";
        if (cmd.user && cmd.user.length > 0)
            basicAuthString = cmd.user[cmd.user.length-1];
        else if (cmd.u && cmd.u.length > 0)
            basicAuthString = cmd.u[cmd.u.length-1];
        var basicAuthSplit = basicAuthString.indexOf(":");
        if (basicAuthSplit > -1) {
            relevant.basicauth = {
                user: basicAuthString.substr(0, basicAuthSplit),
                pass: basicAuthString.substr(basicAuthSplit+1)
            };
        } else {
            relevant.basicAuth = { user: basicAuthString, pass: "<PASSWORD>" };
        }

        // default to GET if nothing else specified
        if (!relevant.method)
            relevant.method = "GET";
        relevant.method=toTitleCase(relevant.method);
        return relevant;
    }

    // parseHeaders converts an array of header strings (like "Content-Type: foo")
    // into a map of key/values. It assumes header field names are unique.
    function parseHeaders(stringHeaders) {
        var headers = {};
        for (var i = 0; i < stringHeaders.length; i++) {
            var split = stringHeaders[i].indexOf(":");
            if (split == -1) continue;
            var name = stringHeaders[i].substr(0, split).trim();
            var value = stringHeaders[i].substr(split+1).trim();
            headers[toTitleCase(name)] = value;
        }
        return headers;
    }

    function toTitleCase(str) {
        return str.replace(/\w*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}

/**
	curl-to-PHP

	By John C
	Based on curl-to-Go by Matt Holt (https://github.com/mholt/curl-to-go)

	https://github.com/incarnate/curl-to-php

	A simple utility to convert curl commands into PHP code.
*/
function curlToPHP(curl) {
    var err = 'if (curl_errno($ch)) {\n    echo \'Error:\' . curl_error($ch);\n}\n';
    var endCurl = 'curl_close($ch);\n';
    var promo = "<?php\n";
    var start = "$ch = curl_init();\n\n";
    var result = '$result = curl_exec($ch);';

    // List of curl flags that are boolean typed; this helps with parsing
    // a command like `curl -abc value` to know whether 'value' belongs to '-c'
    // or is just a positional argument instead.
    var boolOptions = ['#', 'progress-bar', '-', 'next', '0', 'http1.0', 'http1.1', 'http2',
        'no-npn', 'no-alpn', '1', 'tlsv1', '2', 'sslv2', '3', 'sslv3', '4', 'ipv4', '6', 'ipv6',
        'a', 'append', 'anyauth', 'B', 'use-ascii', 'basic', 'compressed', 'create-dirs',
        'crlf', 'digest', 'disable-eprt', 'disable-epsv', 'environment', 'cert-status',
        'false-start', 'f', 'fail', 'ftp-create-dirs', 'ftp-pasv', 'ftp-skip-pasv-ip',
        'ftp-pret', 'ftp-ssl-ccc', 'ftp-ssl-control', 'g', 'globoff', 'G', 'get',
        'ignore-content-length', 'i', 'include', 'I', 'head', 'j', 'junk-session-cookies',
        'J', 'remote-header-name', 'k', 'insecure', 'l', 'list-only', 'L', 'location',
        'location-trusted', 'metalink', 'n', 'netrc', 'N', 'no-buffer', 'netrc-file',
        'netrc-optional', 'negotiate', 'no-keepalive', 'no-sessionid', 'ntlm', 'O',
        'remote-name', 'oauth2-bearer', 'p', 'proxy-tunnel', 'path-as-is', 'post301', 'post302',
        'post303', 'proxy-anyauth', 'proxy-basic', 'proxy-digest', 'proxy-negotiate',
        'proxy-ntlm', 'q', 'raw', 'remote-name-all', 's', 'silent', 'sasl-ir', 'S', 'show-error',
        'ssl', 'ssl-reqd', 'ssl-allow-beast', 'ssl-no-revoke', 'socks5-gssapi-nec', 'tcp-nodelay',
        'tlsv1.0', 'tlsv1.1', 'tlsv1.2', 'tr-encoding', 'trace-time', 'v', 'verbose', 'xattr',
        'h', 'help', 'M', 'manual', 'V', 'version'];

    if (!curl.trim())
        return;
    var cmd = parseCommand(curl, { boolFlags: boolOptions });

    if (cmd._[0] != "curl")
        throw "Not a curl command";

    var req = extractRelevantPieces(cmd);

    var code = promo+"\n"+start;
    code += 'curl_setopt($ch, CURLOPT_URL, '+phpExpandEnv(req.url)+');\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);\n';

    if (req.headers.length == 0 && !req.data.ascii && !req.data.files && !req.data.multipart && !req.basicauth && !req.compressed) {
        return code+renderSimple(req.method);
    } else {
        return code+renderComplex(req);
    }

    // renderSimple renders a simple HTTP request
    function renderSimple(method) {
        var php = "";
        if (method == "POST")
            php = 'curl_setopt($ch, CURLOPT_POST, 1);\n';
        else if (method == "HEAD")
            php = 'curl_setopt($ch, CURLOPT_CUSTOMREQUEST, \'HEAD\');\ncurl_setopt($ch, CURLOPT_NOBODY, true);\n';
        else if (method != "GET")
            php = 'curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '+phpExpandEnv(method)+');\n';

        return php + '\n' + result + '\n' + err + endCurl;
    }

    // renderComplex renders PHP curl code
    function renderComplex(req) {
        var php = "";

        // First, figure out the headers
        var headers = {};
        for (var i = 0; i < req.headers.length; i++) {
            var split = req.headers[i].indexOf(":");
            if (split == -1) continue;
            var name = req.headers[i].substr(0, split).trim();
            var value = req.headers[i].substr(split+1).trim();
            headers[toTitleCase(name)] = value;
        }

        // set request type header
        if (req.method == "POST")
            php += 'curl_setopt($ch, CURLOPT_POST, 1);\n';
        else if (req.method == "HEAD")
            php += 'curl_setopt($ch, CURLOPT_CUSTOMREQUEST, \'HEAD\');\ncurl_setopt($ch, CURLOPT_NOBODY, true);\n';
        else
            php += 'curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '+phpExpandEnv(req.method)+');\n\n';

        // load body data
        // KNOWN ISSUE: -d and --data are treated like --data-binary in
        // that we don't strip out carriage returns and newlines.
        var defaultPayloadVar = "$body";
        if (req.data.ascii || req.data.files || req.data.multipart) {
            var ioReaders = [];

            // if there's text data...
            if (req.data.ascii) {
                var stringBody = function() {
                    ioReaders.push(JSON.stringify(req.data.ascii));
                }

                /*
                 * TODO - write jsonToPHP
                if (headers["Content-Type"] && headers["Content-Type"].indexOf("json") > -1) {
                    // create a struct for the JSON
                    var result = jsonToGo(req.data.ascii, "Payload");
                    if (result.error)
                        stringBody(); // not valid JSON, so just treat as a regular string
                    else if (result.go) {
                        // valid JSON, so create a struct to hold it
                        php += result.go+'\n\ndata := Payload{\n\t// fill struct\n}\n';
                        php += 'payloadBytes, err := json.Marshal(data)\n'+err;
                        php += defaultPayloadVar+' := bytes.NewReader(payloadBytes)\n\n';
                    }
                } else {
                */
                // not a json Content-Type, so treat as string
                stringBody();
                //}
            }

            // if file data...
            if (req.data.files && req.data.files.length > 0) {
                var varName = "file";
                for (var i = 0; i < req.data.files.length; i++) {
                    var thisVarName = (req.data.files.length > 1 ? varName+(i+1) : varName);
                    ioReaders.push('\''+thisVarName+'\' => \'@\' .realpath('+phpExpandEnv(req.data.files[i])+')');
                }
            }

            // if multipart data...
            if (req.data.multipart && req.data.multipart.length > 0) {
                for (var i = 0; i < req.data.multipart.length; i++) {
                    var arg = req.data.multipart[i];

                    var argSplit = arg.indexOf("=");
                    if (argSplit > -1) {
                        var argValue = arg.substr(argSplit+1);
                        var argName = arg.substr(0, argSplit);
                        if(argValue.startsWith("@")){ //if it a file
                            ioReaders.push('\''+argName+'\' => \'@\' .realpath('+phpExpandEnv(argValue.substr(1))+')');
                        }
                        else{
                            ioReaders.push('\''+argName+'\' => '+ phpExpandEnv(argValue));
                        }
                    }
                }
            }

            // render PHP code to put all the data in the body, concatenating if necessary
            if (ioReaders.length == 1 && typeof varName == 'undefined') {
                //If variable have code ".. -d attributes='{...", delete quotes.
                ioReaders[0] = ioReaders[0].replace(/\=[\'\"]\{([^$]+)\}[\'\"]/, '={$1}');
                php += 'curl_setopt($ch, CURLOPT_POSTFIELDS, '+ioReaders[0]+');\n';
            } else if (ioReaders.length > 0) {
                php += '$post = array(\n    ';
                // KNOWN ISSUE: The way we separate file and ascii data values
                // loses the order between them... our code above just puts the
                // ascii values first, followed by the files.
                php += ioReaders.join(",\n    ");
                php += '\n);\n';
                php += 'curl_setopt($ch, CURLOPT_POSTFIELDS, $post);\n';
            }
        }

        // set basic auth
        if (req.basicauth) {
            php += 'curl_setopt($ch, CURLOPT_USERPWD, '+phpExpandEnv(req.basicauth.user)+' . \':\' . '+phpExpandEnv(req.basicauth.pass)+');\n';
        }

        // set compressed
        if (req.compressed) {
            php += 'curl_setopt($ch, CURLOPT_ENCODING, \'gzip, deflate\');\n';
        }

        // set headers
        for (var name in headers) {
            if (typeof phpHeader == 'undefined') {
                phpHeader = '\n$headers = array();\n';
            }
            phpHeader += '$headers[] = '+phpExpandEnv(name).slice(0,-1)+': '+phpExpandEnv(headers[name]).slice(1)+';\n';
        }
        if (typeof phpHeader != 'undefined') {
            php += phpHeader + 'curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\n';
        }
        delete phpHeader;

        // complete request
        php += '\n' + result + '\n' + err + endCurl

        return php;
    }

    // extractRelevantPieces returns an object with relevant pieces
    // extracted from cmd, the parsed command. This accounts for
    // multiple flags that do the same thing and return structured
    // data that makes it easy to spit out PHP code.
    function extractRelevantPieces(cmd) {
        var relevant = {
            url: "",
            method: "",
            headers: [],
            data: {}
        };

        // prefer --url over unnamed parameter, if it exists; keep first one only
        if (cmd.url && cmd.url.length > 0)
            relevant.url = cmd.url[0]
        else if (cmd._.length > 1)
            relevant.url = cmd._[1]; // position 1 because index 0 is the curl command itself

        // gather the headers together
        if (cmd.H)
            relevant.headers = relevant.headers.concat(cmd.H);
        if (cmd.header)
            relevant.headers = relevant.headers.concat(cmd.header);

        // set method to HEAD?
        if (cmd.I || cmd.head)
            relevant.method = "HEAD";

        // between -X and --request, prefer the long form I guess
        if (cmd.request && cmd.request.length > 0)
            relevant.method = cmd.request[cmd.request.length-1].toUpperCase();
        else if (cmd.X && cmd.X.length > 0)
            relevant.method = cmd.X[cmd.X.length-1].toUpperCase(); // if multiple, use last (according to curl docs)

        // join multiple request body data, if any
        var dataAscii = [];
        var dataMultipart = [];
        var dataFiles = [];
        var loadData = function(d, multipart) {
            if (!relevant.method)
                relevant.method = "POST";

            // curl adds a default Content-Type header if not set explicitly
            var hasContentType = false;
            for (var i = 0; i < relevant.headers.length; i++) {
                if (toTitleCase(relevant.headers[i]).indexOf("Content-Type") == 0) {
                    hasContentType = true;
                    break;
                }
            }
            if (!hasContentType && !multipart)
                relevant.headers.push("Content-Type: application/x-www-form-urlencoded");

            for (var i = 0; i < d.length; i++)
            {
                if (multipart)
                    dataMultipart.push(d[i]);
                else if (d[i].length > 0 && d[i][0] == "@")
                    dataFiles.push(d[i].substr(1));
                else
                    dataAscii.push(d[i]);
            }
        };
        if (cmd.d)
            loadData(cmd.d);
        if (cmd.data)
            loadData(cmd.data);
        if (cmd['data-raw'])
            loadData(cmd['data-raw']);
        if (cmd['data-binary'])
            loadData(cmd['data-binary']);
        if (cmd.F)
            loadData(cmd.F, true);
        if (cmd.form)
            loadData(cmd.form, true);

        if (dataAscii.length > 0)
            relevant.data.ascii = dataAscii.join("&");

        if(dataMultipart.length > 0)
            relevant.data.multipart = dataMultipart;

        if (dataFiles.length > 0)
            relevant.data.files = dataFiles;
        if (cmd.compressed)
            relevant.compressed = true;


        // between -u and --user, choose the long form...
        var basicAuthString = "";
        if (cmd.user && cmd.user.length > 0)
            basicAuthString = cmd.user[cmd.user.length-1];
        else if (cmd.u && cmd.u.length > 0)
            basicAuthString = cmd.u[cmd.u.length-1];
        var basicAuthSplit = basicAuthString.indexOf(":");
        if (basicAuthSplit > -1) {
            relevant.basicauth = {
                user: basicAuthString.substr(0, basicAuthSplit),
                pass: basicAuthString.substr(basicAuthSplit+1)
            };
        } else {
            relevant.basicAuth = { user: basicAuthString, pass: "<PASSWORD>" };
        }

        // default to GET if nothing else specified
        if (!relevant.method)
            relevant.method = "GET";

        return relevant;
    }

    function toTitleCase(str) {
        return str.replace(/\w*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    // phpExpandEnv adds surrounding quotes around s to make it a PHP string,
    // escaping any characters as needed. It checks to see if s has an
    // environment variable in it. If so, it returns s wrapped in a PHP
    // function that expands the environment variable. Otherwise, it
    // returns s wrapped in quotes and escaped for use in PHP strings.
    // s should not already be escaped! This function always returns a PHP
    // string value.
    function phpExpandEnv(s) {
        var pos = s.indexOf("$");
        if (pos > -1)
        {
            if (pos > 0 && s[pos-1] == '\\') {
                // The $ is escaped, so strip the escaping backslash
                s = s.substr(0, pos-1) + s.substr(pos);
            } else {
                // $ is not escaped, so treat it as an env variable
                return '$_ENV["'+phpEsc(s).replace(/\$/g, '')+'"]';
            }
        }
        return '\''+phpEsc(s)+'\'';
    }

    // phpEsc escapes characters in s so that it is safe to use s in
    // a "quoted string" in a PHP program
    function phpEsc(s) {
        return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    }
}

/**
	curl-to-py
	by Zheuxan Yang
  Modified from https://github.com/mholt/curl-to-go/blob/gh-pages/resources/js/curl-to-go.js

	https://github.com/zheuxany/curl-to-py

	A simple utility to convert curl commands into py code.
*/
function curlToPy(curl) {
    var promo = "";

    // List of curl flags that are boolean typed; this helps with parsing
    // a command like `curl -abc value` to know whether 'value' belongs to '-c'
    // or is just a positional argument instead.
    var boolOptions = ['#', 'progress-bar', '-', 'next', '0', 'http1.0', 'http1.1', 'http2',
        'no-npn', 'no-alpn', '1', 'tlsv1', '2', 'sslv2', '3', 'sslv3', '4', 'ipv4', '6', 'ipv6',
        'a', 'append', 'anyauth', 'B', 'use-ascii', 'basic', 'compressed', 'create-dirs',
        'crlf', 'digest', 'disable-eprt', 'disable-epsv', 'environment', 'cert-status',
        'false-start', 'f', 'fail', 'ftp-create-dirs', 'ftp-pasv', 'ftp-skip-pasv-ip',
        'ftp-pret', 'ftp-ssl-ccc', 'ftp-ssl-control', 'g', 'globoff', 'G', 'get',
        'ignore-content-length', 'i', 'include', 'I', 'head', 'j', 'junk-session-cookies',
        'J', 'remote-header-name', 'k', 'insecure', 'l', 'list-only', 'L', 'location',
        'location-trusted', 'metalink', 'n', 'netrc', 'N', 'no-buffer', 'netrc-file',
        'netrc-optional', 'negotiate', 'no-keepalive', 'no-sessionid', 'ntlm', 'O',
        'remote-name', 'oauth2-bearer', 'p', 'proxy-tunnel', 'path-as-is', 'post301', 'post302',
        'post303', 'proxy-anyauth', 'proxy-basic', 'proxy-digest', 'proxy-negotiate',
        'proxy-ntlm', 'q', 'raw', 'remote-name-all', 's', 'silent', 'sasl-ir', 'S', 'show-error',
        'ssl', 'ssl-reqd', 'ssl-allow-beast', 'ssl-no-revoke', 'socks5-gssapi-nec', 'tcp-nodelay',
        'tlsv1.0', 'tlsv1.1', 'tlsv1.2', 'tr-encoding', 'trace-time', 'v', 'verbose', 'xattr',
        'h', 'help', 'M', 'manual', 'V', 'version'
    ];

    if (!curl.trim())
        return "empty input";
    var cmd = parseCommand(curl, {
        boolFlags: boolOptions
    });

    if (cmd._[0] != "curl")
        throw "Not a curl command";

    var req = extractRelevantPieces(cmd);

    if (Object.keys(req.headers).length == 0 && !req.data.ascii && !req.data.files && !req.basicauth) {
        return promo + "\n" + renderSimple(req.method, req.url);
    }
    return promo + "\n\n" + renderComplex(req);

    // renderSimple renders a simple HTTP request using requests convenience methods
    function renderSimple(method, url) {
        if (method == "GET")
            return 'requests.get(' + url + ')\n';
        else if (method == "POST")
            return 'requests.post(' + url + ', data=None)\n';
        else if (method == "HEAD")
            return 'requests.head(' + url + ')\n';
        else
            return 'not supported yet';
    }

    // renderComplex renders py code that requires making a http.Request.
    function renderComplex(req) {
        var py = "import requests\n";
        data = "data = data\n";
        headers = getHeadersStr(req);
        data = getDataStr(req.data);
        py += "\n" + headers + "\n" + data + "\n";

        py += "requests." + req.method.toLowerCase() + '(\'' + req.url + '\'';
        if (headers != "") {
            py += ', headers = headers';
        }
        if (data != "") {
            py += ', data = data';
        }
        if (req.basicAuth != undefined) {
            py += ', auth=(\'' + req.basicAuth.user + '\',\'' + req.basicAuth.pass + ")";
        }
        py += ")";
        return py;
    }

    function getDataStr(data) {
        dataStr = '';
        dataFiles = data.files;
        if (dataFiles != undefined) {
            return dataStr + 'data = open(\'' + dataFiles + '\')\n';
        }

        dataStr += 'data = [\n';
        dataAsciis = data.ascii.split("&");
        if (dataAsciis.length == 1) {
            return 'data = \'' + dataAsciis[0] + '\'';
        }
        for (i = 0; i < dataAsciis.length; i++) {
            equalSignIdx = dataAsciis[i].indexOf('=');
            key = dataAsciis[i].substring(0, equalSignIdx);
            value = dataAsciis[i].substring(equalSignIdx + 1).trim();
            dataStr += '  (\'' + key + '\', \'' + value + '\'),\n';
        }
        dataStr += "]\n";
        return dataStr;
    }

    function getHeadersStr(req) {
        if (Object.keys(req.headers) == 0)
            return "";
        headers = "headers = {\n";
        for (var name in req.headers) {
            headers += '    \'' + name + '\': \'' + req.headers[name] + '\',\n';
        }
        headers += "}\n";
        return headers;
    }

    // getHeadersDict generate a dict which contains header name and header value
    function getHeadersDict(cmd) {
        var result = {};
        var colonIndex;
        var header;
        var headerName;
        var headerValue;

        if (cmd.H) {
            for (var i = 0; i < cmd.H.length; i++) {
                header = cmd.H[i];
                colonIndex = header.indexOf(':');
                headerName = header.substring(0, colonIndex);
                headerValue = header.substring(colonIndex + 1).trim();
                result[headerName] = headerValue;
            }
        }
        if (cmd.header) {
            for (i = 0; i < cmd.H.length; i++) {
                header = cmd.header[i];
                colonIndex = header.indexOf(':');
                headerName = header.substring(0, colonIndex);
                headerValue = header.substring(colonIndex + 1).trim();
                result[headerName] = headerValue;
            }
        }
        return result;
    }

    function getBasicAuth(cmd) {
        // between -u and --user, choose the long form...
        var basicAuthString = "";
        if (cmd.user && cmd.user.length > 0)
            basicAuthString = cmd.user[cmd.user.length - 1];
        else if (cmd.u && cmd.u.length > 0)
            basicAuthString = cmd.u[cmd.u.length - 1];
        var basicAuthSplit = basicAuthString.indexOf(":");
        if (basicAuthSplit > -1) {
            return basicauth = {
                user: basicAuthString.substr(0, basicAuthSplit),
                pass: basicAuthString.substr(basicAuthSplit + 1)
            };
        } else if (basicAuthString != "") {
            return basicAuth = {
                user: basicAuthString,
                pass: "<PASSWORD>"
            };
        } else {
            return undefined;
        }
    }

    function getDataDict(cmd, relevant) {
        data = {};
        // join multiple request body data, if any
        var dataAscii = [];
        var dataFiles = [];
        var loadData = function(d) {
            if (!relevant.method)
                relevant.method = "POST";

            // curl adds a default Content-Typ header if not set explicitly
            if (relevant.headers["Content-Type"] != "") {
                hasContentType = true;
            } else {
                relevant.headers["Content-Type"] = "application/x-www-form-urlencoded";
            }

            for (var i = 0; i < d.length; i++) {
                if (d[i].length > 0 && d[i][0] == "@")
                    dataFiles.push(d[i].substr(1));
                else
                    dataAscii.push(d[i]);
            }
        };
        if (cmd.d)
            loadData(cmd.d);
        if (cmd.data)
            loadData(cmd.data);
        if (dataAscii.length > 0)
            data.ascii = dataAscii.join("&");
        if (dataFiles.length > 0)
            data.files = dataFiles.join("&");
        return data;
    }

    // extractRelevantPieces returns an object with relevant pieces
    // extracted from cmd, the parsed command. This accounts for
    // multiple flags that do the same thing and return structured
    // data that makes it easy to spit out py code.
    function extractRelevantPieces(cmd) {
        var relevant = {
            url: "",
            method: "",
            headers: {},
            data: {}
        };

        // prefer --url over unnamed parameter, if it exists; keep first one only
        if (cmd.url && cmd.url.length > 0)
            relevant.url = cmd.url[0];
        else if (cmd._.length > 1)
            relevant.url = cmd._[1]; // position 1 because index 0 is the curl command itself

        // gather the headers together
        relevant.headers = getHeadersDict(cmd);

        // set method to HEAD?
        if (cmd.I || cmd.head)
            relevant.method = "HEAD";

        // between -X and --request, prefer the long form I guess
        if (cmd.request && cmd.request.length > 0)
            relevant.method = cmd.request[cmd.request.length - 1].toUpperCase();
        else if (cmd.X && cmd.X.length > 0)
            relevant.method = cmd.X[cmd.X.length - 1].toUpperCase(); // if multiple, use last (according to curl docs)

        relevant.data = getDataDict(cmd, relevant);
        relevant.basicAuth = getBasicAuth(cmd);

        // default to GET if nothing else specified
        if (!relevant.method)
            relevant.method = "GET";

        return relevant;
    }

    function toTitleCase(str) {
        return str.replace(/\w*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}

function parseCommand(input, options) {
    if (typeof options === 'undefined') {
        options = {};
    }

    var result = {
            _: []
        }, // what we return
        cursor = 0, // iterator position
        token = ""; // current token (word or quoted string) being built

    // trim leading $ or # that may have been left in
    input = input.trim();
    if (input.length > 2 && (input[0] == '$' || input[0] == '#') && whitespace(input[1]))
        input = input.substr(1).trim();

    for (cursor = 0; cursor < input.length; cursor++) {
        skipWhitespace();
        if (input[cursor] == "-") {
            flagSet();
        } else {
            unflagged();
        }
    }

    return result;

    // isLongFalg return true is input length is larger than cursor and
    // come with a dash
    function isLongFalg() {
        return cursor < input.length - 1 && input[cursor + 1] == "-";
    }

    // flagSet handles flags and it assumes the current cursor
    // points to a first dash.
    function flagSet() {
        // long flag form?
        if (isLongFalg()) {
            return longFlag();
        }

        // if not, parse short flag form
        return shortFlag();
    }

    // longFlag consumes a "--long-flag" sequence and
    // stores it in result.
    function longFlag() {
        cursor += 2; // skip leading dashes
        var flagName = nextString("=");
        if (boolFlag(flagName))
            result[flagName] = true;
        else {
            if (typeof result[flagName] == 'undefined') {
                result[flagName] = [];
            }
            if (Array.isArray(result[flagName])) {
                result[flagName].push(nextString());
            }
        }
    }

    function shortFlag() {
        cursor++; // skip leading dash
        while (cursor < input.length && !whitespace(input[cursor])) {
            var flagName = input[cursor];
            if (typeof result[flagName] == 'undefined') {
                result[flagName] = [];
            }
            cursor++; // skip the flag name
            if (boolFlag(flagName))
                result[flagName] = true;
            else if (Array.isArray(result[flagName]))
                result[flagName].push(nextString());
        }
    }

    // unflagged consumes the next string as an unflagged value,
    // storing it in the result.
    function unflagged() {
        result._.push(nextString());
    }

    // boolFlag returns whether a flag is known to be boolean type
    function boolFlag(flag) {
        if (Array.isArray(options.boolFlags)) {
            for (var i = 0; i < options.boolFlags.length; i++) {
                if (options.boolFlags[i] == flag)
                    return true;
            }
        }
        return false;
    }

    // nextString skips any leading whitespace and consumes the next
    // space-delimited string value and returns it. If endChar is set,
    // it will be used to determine the end of the string. Normally just
    // unescaped whitespace is the end of the string, but endChar can
    // be used to specify another end-of-string. This function honors \
    // as an escape character and does not include it in the value, except
    // in the special case of the \$ sequence, the backslash is retained
    // so other code can decide whether to treat as an env var or not.
    function nextString(endChar) {
        skipWhitespace();

        var str = "";

        var quoted = false,
            quoteCh = "",
            escaped = false;

        for (; cursor < input.length; cursor++) {
            if (quoted) {
                if (input[cursor] == quoteCh && !escaped) {
                    quoted = false;
                    continue;
                }
            }
            if (!quoted) {
                if (!escaped) {
                    if (whitespace(input[cursor])) {
                        return str;
                    }
                    if (input[cursor] == '"' || input[cursor] == "'") {
                        quoted = true;
                        quoteCh = input[cursor];
                        cursor++;
                    }
                    if (endChar && input[cursor] == endChar) {
                        cursor++; // skip the endChar
                        return str;
                    }
                }
            }
            if (!escaped && input[cursor] == "\\") {
                escaped = true;
                // skip the backslash unless the next character is $
                if (!(cursor < input.length - 1 && input[cursor + 1] == '$'))
                    continue;
            }

            str += input[cursor];
            escaped = false;
        }

        return str;
    }

    // skipWhitespace skips whitespace between tokens, taking into account escaped whitespace.
    function skipWhitespace() {
        for (; cursor < input.length; cursor++) {
            while (input[cursor] == "\\" && (cursor < input.length - 1 && whitespace(input[cursor + 1])))
                cursor++;
            if (!whitespace(input[cursor]))
                break;
        }
    }

    // whitespace returns true if ch is a whitespace character.
    function whitespace(ch) {
        return ch == " " || ch == "\t" || ch == "\n" || ch == "\r";
    }
}