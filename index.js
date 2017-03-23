var inp = document.body.firstElementChild.children[1];
console.log(inp);
var elems = inp.getElementsByTagName('input');
elems[1].setAttribute('id','text');
console.dir(elems[1].value = 'a33');
console.dir(elems[1].className);
