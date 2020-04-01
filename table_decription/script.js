$(document).ready(function(){
    // Конвертер чисел
    $(".input-converter").on("input", convertNums);

    function convertNums() {

        let win1251 = new TextDecoder("windows-1251");
        let nums = $("#"+this.id).val().replace(/(^\s*)|(\s*)$/g, '');
        nums = nums.split(/\s+/g);
        let radix = 2;

        a = ["bin-num", "hex-num", "dec-num"];
        for (let i in a)
        {
            if (a[i] == this.id) continue;
            $("#" + a[i]).val('');
        }

        switch (this.id)
        {
            case "bin-num":
                radix = 2; break;
            case "hex-num":
                radix = 16; break;
            case "dec-num":
                radix = 10; break;
        }
        
        let hexNums = nums.map(i => "0x" + parseInt(i, radix).toString(16));
        $("#ascii-text").val( win1251.decode(Uint8Array.from(hexNums)) );
    };

    // Табличное кодирование
    $("td").on("click", function() {
        $(this).toggleClass("disabled");
        fillTable();
    });


    $("#password").on("input", changePassword);
    $("#ciphertext").on("input", fillTable);


    function changePassword() {
        let pass = $("#password").val();
        
        $("th").text("_");
        $("#th_1").text(pass[0]);
        $("#th_2").text(pass[1]);
        $("#th_3").text(pass[2]);
        $("#th_4").text(pass[3]);
        $("#th_5").text(pass[4]);
        $("#th_6").text(pass[5]);
        $("#th_7").text(pass[6]);

        fillTable();
    }

    function readTable() {
        let result = "";

        for (let i = 1; i <= 7; i++)
            for (let j = 1; j <= 7; j++)
                result += $("#tr_" + i + " > #td_" + j).text();
        $("#text").val(result);
    };



    function fillTable() {
        $("td").text("");
        let cipher = $("#ciphertext").val();
        let k = 0;

        for (let _k = 1; _k <= 7; _k++)
        {
            let i = 0;

            for (let _i = 1; _i <= 7; _i++)
                if ($("#th_" + _i).text() == _k)
                    i = _i;

            for (let j = 1; j <= 7; j++)
            {
                let el = $("#tr_" + j + " > #td_" + i);

                if (!el.hasClass("disabled"))
                    el.text( cipher[k++] );
            }
        }
        readTable();
    };

    $("#next-keys-button").on("click", function() {
        
        $("#password").val(KEYS[KEYS_IND++]);

        if (KEYS_IND == KEYS.length)
            KEYS_IND = 0;

        changePassword();
    });

    $("#prev-keys-button").on("click", function() {
        
        $("#password").val(KEYS[KEYS_IND--]);

        if (KEYS_IND < 0)
            KEYS_IND = KEYS.length - 1;

        changePassword();
    });

    permutation(7);
    //$("#permutation").click();

});

var KEYS_IND = 0;
var KEYS = [];

function permutation(n) 
{
    a = [];
    used = [];

    for (let i = 1; i <= n; i++)
    {
        a.push(0);
        used.push(false);
    }

    rec(0, n, a, used);
};

function rec(ind, n, a, used) 
{
    if (ind == n)
    {
        KEYS.push( a.join('') );
        return;
    }

    for (let i = 1; i <= n; i++)
    {
        if (used[i])
            continue;

        a[ind] = i;
        used[i] = true;
        rec(ind+1, n, a, used);
        used[i] = false;
    }
};

/*
def rec(ind):
    global cnt, n, a, used
    
    if ind == n:
        print(str(cnt)+'.', ''.join([str(i) for i in a]))
        cnt += 1
        return
    
    for i in range(1, n+1):
        
        if used[i]:
            continue
        
        a[ind] = i
        used[i] = True
        rec(ind+1)
        used[i] = False
        
n = int( input('Введите n: ') )
a = [0 for i in range(n)]
used = [False for i in range(n+1)]
cnt = 1
rec(0)
*/
