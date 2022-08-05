const stringSwap = (str, pos) => {
    if(str.length == 1) return str;
    if(pos > 0) pos-- 
    let mem = str[pos];
    let newStr = str.replaceAt(pos, str[pos+1]);
    return newStr.replaceAt(pos+1, mem);
  }

function replaceAt(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
  }

const addStringNoise = (type, str, pos) => {
    switch(type){
      case 1: 
        return stringSwap(str, pos); //swaps
      case 2:
        return `${str.slice(0,pos)}Y${str.slice(3)}`; //adds
      case 3:
        return str.slice(0, pos-1) + str.slice(pos); //deletes
    }
  }

  module.exports = {
    stringSwap, replaceAt, addStringNoise
};