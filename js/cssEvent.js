function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        if(element.className.indexOf(value) == -1){
            let newClassName = element.className;
            newClassName += " ";
            newClassName += value;
            element.className = newClassName;
        }       
    }
}

function removeClass(element, value) {
    if (!element.className) {
        return false;
    } else {
        //正则表达式，检测是否包含value
        let reg = new RegExp("(\\s|^)" + value + "(\\s|$)");
        element.className = element.className.replace(reg, " ");
        return true;
    }

}

function switchHeadHiddenClass(name) {
    let dbody = document.getElementsByClassName('dbody');
    let dbodyChild = dbody[0].children;
    for (let i = 0; i < dbodyChild.length; i++) {
        let className = dbodyChild[i].getAttribute('class');
        if (className.indexOf(name) == 0) {
            removeClass(dbodyChild[i], 'hidden');
        } else {
            addClass(dbodyChild[i], 'hidden');
        }
    }
}
