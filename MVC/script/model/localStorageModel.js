/**
 * Created by Administrator on 2016-9-8.
 */
function LocalStorageModel() {
    function getRamdomKey() {
        var key = "";
        key = "key" + parseInt(Math.random() * 10000);
        while (judgeKeyExist(key)) {
            key = "key" + parseInt(Math.random() * 10000);
        }
        return key;
    }
    function judgeKeyExist(key) {
        if (window.localStorage.getItem(key)) {
            return true;
        }
        else {
            return false;
        }
    }
    var option = {
        name: "",
        telephone: "",
        img: "",
        qq: "",
        pinyin:""
    };
    function extern(a,b){
        for(var key in b){
            if(a.hasOwnProperty(key)){
                a[key] = b[key];
            }
        }
        return a;
    }
    function JsonToArray(option1){
        var value1 = [option1.name,option1.telephone,option1.img,option1.qq,option1.pinyin];
        return value1;
    }
    //添加数据
    this.addValue = function (value) {
        extern(option,value);
        value =JsonToArray(option);
        var key = getRamdomKey();
        window.localStorage.setItem(key, value);
    };
    //获取所有的value
    this.getAllValues = function () {
        var keys = [];
        var count = 0;
        var exist = true;
        while (exist) {
            var key = localStorage.key(count);
            if (key != null) {
                if (key.indexOf("key") == 0) {
                    keys.push(key);
                }
                count++;
            }
            else {
                exist = false;
            }
        }
        var values = [];
        for (var i=0;i<keys.length;i++){
            values.push(this.getValuesByKey(keys[i]));
        }
        return values;
    };
    this.getResultValue=function(values){
        var resultValueDate={
            A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],M:[],N:[],O:[],
            P:[],Q:[],R:[],S:[],T:[],U:[],V:[],W:[],X:[],Y:[],Z:[]
        }
        //将获取的数据进行对应的写到相应的json字段中
        for (var i=0;i<values.length;i++){
            var firstChar=values[i].pinyin.charAt(0);
            for (var key in resultValueDate){
                if (key.toLowerCase()==firstChar){
                    resultValueDate[key].push(values[i]);
                }
            }
        }
        return resultValueDate;
    };

    //获取单个value
    this.getValuesByKey = function(key) {
        if (localStorage.getItem(key) != null) {
            var value = localStorage.getItem(key);
            var values = value.split(",");
            var valueJson = {
                name: values[0],
                telephone: values[1],
                img: values[2],
                qq: values[3],
                pinyin:values[4]
            }
            return valueJson;
        }
        else {
            return null;
        }
    }
    //删除value
    this.deleValueByKey = function(key){
        localStorage.removeItem(key);
    }
    //更改value
    this.changeValueByKey = function(key,value){
        var option1 = {
            name: "",
            telephone: "",
            img: "",
            qq: "",
            pinyin:"",
        };
        extern(option1,value);
        var value1 = JsonToArray(option1);
        localStorage.setItem(key,value1);
    }
}