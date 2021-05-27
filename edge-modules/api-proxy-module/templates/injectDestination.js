
var returnAddress = 'default';


function injectServer1(s){
    s.on('upload', function(data,flags){
        s.log("decorate for server1");
        s.send("Server1" + data, flags);
        s.off('upload');
        return;
    });
}

function injectServer2(s){
    s.on('upload', function(data,flags){
        s.log("decorate for server2");
        s.send("Server2" + data, flags);
        s.off('upload');
        return;
    });
}

function returnSource(s){
    s.on('upload', function (data, flags) {
        s.log("compute address: " + data);
        s.log("test: " + Object.getOwnPropertyNames(String));
        s.log("test: " +  data.startsWith('Server1'));
        var n = data.indexOf('Server1');
        if (n != -1) {
            returnAddress = "server 1";
            s.done()
        }

        var n = data.indexOf('Server2');       
        if (n != -1) {
            returnAddress = "server 2";
            s.done()           
        }
    });    
}

function getAddress(s){
    s.log("return!");
    return returnAddress;
}

function filterLocalIP(s){
    s.on('upload', function(data,flags){
        s.log("replace IP "+ data);
        s.send(data.replace('127.0.0.1', 'huguestest.azure-devices.net'), flags);
        s.off('upload');
        return;
    });    
}
