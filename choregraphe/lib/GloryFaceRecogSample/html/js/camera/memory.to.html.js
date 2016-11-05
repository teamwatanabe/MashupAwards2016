$(function () {
    MemoryToHTML = function (def) {
        this.objlist = [];
        this.keylist = [];
        for (i = 0; i < def.length; i = i + 2) {
            // ALMemoryのメモリキーとDOMを配列に設定
            this.objlist.push($(def[i]));
            this.keylist.push(def[i + 1]);
        }
    };

    MemoryToHTML.prototype.update = function () {
        var keys = this.keylist;
        var objs = this.objlist;

        try {
            $.qim.service("ALMemory").done(function (memory) {
                // ALMemoryから指定したキーリストに対応するデータを取得
                memory.getListData(keys).done(function (data) {
                    for (i = 0; i < data.length; i++) { 
                        // 非数値かどうか
                        if (isNaN(data[i])) {
                            // 数値でない場合はそのままHTMLへ反映
                            objs[i].html(data[i]);
                        } else { 
                            // 数値の場合は整数の場合はそのまま、小数がある場合は第３位までHTMLへ反映
                            if ( data[i].toString().match(/^-?[0-9]+\.[0-9e\+\-]+$/) ) {
                                objs[i].html(parseFloat(data[i]).toFixed(3));
                            } else {
                                objs[i].html(data[i]);
                            }
                        }
                    }
                });
            });
        } catch(e) {
            console.log(e);
        }
    };
});
