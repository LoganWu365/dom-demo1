window.dom = {};
dom.create = (string)=>{
    const container = document.createElement('template');
    container.innerHTML = string.trim();//防止拿到空格文本节点
    return container.content.firstChild;//<template>里面的子节点不能通过container.firstChild拿到
}
dom.after = (node,node2)=>{
    node.parentNode.insertBefore(node2,node.nextSibling)    
}
dom.before =(node,node2)=>{
    node.parentNode.insertBefore(node2,node)
}
dom.append = (node,node2)=>{
    node.appendChild(node2);
}
dom.wrap = (node,parent)=>{
    dom.before(node,parent)
    dom.append(parent,node)
}
dom.remove = (node)=>{
    if(document.remove){
        node.remove();
    }else{
        node.parentNode.removeChild(node);
    }
    return node
}
dom.empty = (node)=>{
    let array = [];
    let x = node.firstChild;
    while(x){
        array.push(dom.remove(x));
        let x = node.firstChild;
    }
    return array;
}
dom.attr = function(node,name,value){
    if(arguments.length === 3){
        node.setAttribute(name,value);
    }else if(arguments.length === 2){
        return node.getAttribute(name);
    }
}
dom.text = function(node,string){
    if(arguments.length === 1){
        if(node.innerText){
            return node.innerText;
        }else{
            return node.textContent;
        }
    }else if(arguments.length === 2){
        if(node.innerText){
            node.innerText = string;
        }else{
            node.textContent = string;
        }
    }
}
dom.html = function(node,html){
    if(arguments.length === 1){
        return node.innerHTML;
    }else if(arguments.length === 2){
        node.innerHTML = html;
    }
}
dom.style = function(node,name,value){
    if(arguments.length === 2){
        if(typeof name === 'string'){
            return node.style[name];
        }else if(typeof name === 'object'){
            for(let key in name){
                node.style[key] = name[key];
            }
        }
    }else if(arguments.length === 3){
        node.style[name] = value;
    }
}
dom.class = {
    add(node,className){
        node.classList.add(className)
    },
    remove(node,className){
        node.classList.remove(className)
    },
    has(node,className){
        return node.classList.contains(className)
    }
}
dom.on = (node, eventName, fn)=>{
    node.addEventListener(eventName, fn)
}

dom.off = (node, eventName, fn)=>{
    node.removeEventListener(eventName, fn)
}
dom.find = (selector,parent)=>{
    return (parent || document).querySelectorAll(selector);
}

0.
0
dom.parent = (node)=>{
    return node.parentNode
}
dom.child = (node)=>{
    return node.children
}
dom.siblings = (node)=>{
    return Array.from(node.parentNode.children).filter(n=>n!==node)//将对象变成数组再进行筛选处理
}
dom.next = (node)=>{
    let x = node.nextSibling;
    if(x.nodeType === 3){
         x = x.nextSibling;
    }
    return x;
}
dom.previous = (node)=>{
    let x = node.previousSibling;
    if(x.nodeType === 3){
         x = x.previousSibling;
    }
    return x;
}
dom.each = (nodeList,fn)=>{
    for(let i = 0;i<nodeList.length;i++){
        fn.call(null,nodeList[i])
    }
}
dom.index = (node)=>{
    let list = dom.child(node.parentNode);
    let index = 1;
    for(let i = 0;i<list.length;i++){
        if(list[i] === node){
            index = i;
            break;
        }
    }
    return index+1;
}

