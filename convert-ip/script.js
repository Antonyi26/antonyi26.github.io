var SUBNET = 0;

window.onload = function()
{   
    clearAll();
    document.getElementById('ip').value = '';
    
    document.getElementById('ip').oninput = function(event)
    {   
        clearAll();
        
        let bin_ip = document.getElementById('bin_ip');
        let dec_ip = document.getElementById('dec_ip');
        let hex_ip = document.getElementById('hex_ip');
        let oct_ip = document.getElementById('oct_ip');
        
        let pattern = /^\s*(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d+)\.*/;
        let res = this.value.match(pattern);
        SUBNET = 0;

        if (!res)
        {
            pattern = /^\s*(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\.*/;
            res = this.value.match(pattern);
            
            if (!res)
                return;
        }
        else
        {
            res = res[1].split('/');
            SUBNET = parseInt(res[1]);
            res[1] = res[0];
        }
        
        res = res[1].split('.');
        
        
        // ip2bin
        for (let i = 0; i < res.length; i++)
        {
            let _num = parseInt(res[i], 10);
            if (_num < 0) _num = 0;
            if (_num > 255) _num = 255;
            let _bin = _num.toString(2);
            
            while(_bin.length < 8)
                _bin = '0' + _bin;
            bin_ip.value += _bin;
            //console.log(res[i]);
        }
        
        let num = parseInt(bin_ip.value, 2);
        if (SUBNET)
            bin_ip.value = bin_ip.value.slice(0, SUBNET) + ' - ' + bin_ip.value.slice(SUBNET);
        dec_ip.value = num;
        hex_ip.value = num.toString(16).toUpperCase();
        oct_ip.value = num.toString(8);

        bin_ip.oninput();
    };
    
    //let bin_ip = document.getElementById('bin_ip');
    document.getElementById('bin_ip').oninput = function(event)
    {
        let bin = this.value.replace(/[\s-]/g, '');
        let zero = '00000000000000000000000000000000'
        let net_id = bin.slice(0, SUBNET) + zero.slice(SUBNET);
        let host_id = zero.slice(0, SUBNET) + bin.slice(SUBNET);
        
        document.getElementById('new_ip').value = bin2ip(bin);
        document.getElementById('new_ip_net_id').value = bin2ip(net_id)
        document.getElementById('new_ip_host_id').value = bin2ip(host_id)        
    };
    
    
    document.getElementById('bin_num').oninput = function(event)
    {
        let num = parseInt(this.value, 2);
        document.getElementById('dec_num').value = num;
        document.getElementById('hex_num').value = num.toString(16).toUpperCase();
        document.getElementById('oct_num').value = num.toString(8);
    };
    
    document.getElementById('dec_num').oninput = function(event)
    {
        let num = parseInt(this.value);
        document.getElementById('bin_num').value = num.toString(2);
        document.getElementById('hex_num').value = num.toString(16).toUpperCase();
        document.getElementById('oct_num').value = num.toString(8);
    };
    
    document.getElementById('hex_num').oninput = function(event)
    {
        let num = parseInt(this.value, 16);
        document.getElementById('bin_num').value = num.toString(2);
        document.getElementById('dec_num').value = num;
        document.getElementById('oct_num').value = num.toString(8);        
    };
    
    document.getElementById('oct_num').oninput = function(event)
    {
        let num = parseInt(this.value, 8);
        document.getElementById('bin_num').value = num.toString(2);
        document.getElementById('dec_num').value = num;  
        document.getElementById('hex_num').value = num.toString(16); 
    }
    
}




function bin2ip(bin)
{
    ip = [];
    while (bin.length)
    {
        ip.push( parseInt(bin.slice(0, 8), 2) );
        bin = bin.slice(8);
    }
    return ip.join('.');
}





function clearAll()
{
    let clear = document.getElementsByClassName('clear');
    
    for(let i = 0; i < clear.length; i++)
    {
        clear[i].value = '';
    }
}
