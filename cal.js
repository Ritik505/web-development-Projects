function add(){
    var a,b,c;
    a = eval(document.getElementById("c1").value);
    b = eval(document.getElementById("c2").value);
    c = a+b;
    document.getElementById("c3").value=c;
}

function multiply(){
    var a,b,c;
    a = (document.getElementById("c1").value);
    b = (document.getElementById("c2").value);
    c = a*b;
    document.getElementById("c3").value=c;
}

function subtract(){
    var a,b,c;
    a = eval(document.getElementById("c1").value);
    b = eval(document.getElementById("c2").value);
    c = a-b;
    document.getElementById("c3").value=c;
}

function divide(){
    var a,b,c;
    a = eval(document.getElementById("c1").value);
    b = eval(document.getElementById("c2").value);
    c = a/b;
    document.getElementById("c3").value=c;
}