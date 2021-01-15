
/*  converter UUCS2 HEX into string and vice versa */
console.log("converter js");
//  out and input elememnts
var from = document.getElementById("from");
var to = document.getElementById("to");
clearIn();

/*
* decode from hex UCS2 format to string
*/
function convertToString(){
  let src=from.innerText.trim();
  console.log(" before parse [ " + src + ' ]');
  clearIn();
  from.innerText += src;
  if(src.length%4 != 0){
    addToOut('Неправильный формат данных - количество символов должно быть кратно 4 ' +
    ' в строке имеется ' + src.length + ' символов '  );
    console.log(src);
    return;
  }
  let cur = '', hex = '', buf = '';
  for(let n=0; n < src.length; n+=4){
    cur = src.substr(n, 4);
    if(checkNotNumber(cur))return;
  	try{
  		hex = parseInt( cur, 16); //(cur.replace(/^#/, ''), 16);
  	  buf += String.fromCodePoint(hex);
  	}catch(e){
      alert("Parse error = " + e.toString());
      console.log("Error on parse symbol '" + cur + "' [" + e.toString() + " ]");
  		to.textContent = "ERROR неправильные данные для '" + cur + "'";
  	}
  }
  addToOut(buf);
}

/*
  Encode string to UCS2 format
*/
function convertToHex(){
//  to HEX  hex = this.charCodeAt(i).toString(16);
  let src=from.innerText.trim();
  console.log(" before parse [ " + src + ' ]');
  clearIn();
  from.innerText += src;
  let res="", code;
  for( let n=0; n < src.length; n++){
    code = src.charCodeAt(n);
    if(code < 256){
      res += "00" + code.toString(16);
    }else{
      res += "0" + code.toString(16);
    }
  }
  addToOut(res);
}

/*
check string on all symbols is number
*/
function checkNotNumber(value){
  let res = /([^0-9a-f])+/i.test(value);
  if(res)  addToOut("(wrong data)Неверные данные - '" + value + "'  ");
  return res;
}


function clearOut(){
  to.textContent = '';
}

function clearIn(){
  from.textContent = '';
}

function addToOut(text){
  to.textContent = to.textContent + text;
}
