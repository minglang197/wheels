window.dom = {
    /*创建一个节点*/
    create(string) {
        const container = document.createElement("template");/*template用来清除字符串的空格 */
        container.innerHTML = string.trim();    /*trim()用来除去空格*/

        return container.content.firstChild;  //返回container的内容的第一个孩子
    },
    /*新增一个弟弟*/
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);//找到节点的爸爸，调用insertBefore的方法，把node2插入到下一个节点的前面
    },
    /*新增一个哥哥*/
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    // /* 新增一个儿子*/
    append(parent, node) {
        parent.appendChild(node)
    },
    // /* 新增一个爸爸*/
    wrap(node, parent) {
        dom.before(node, parent)//调用上面的before方法，使得node是parent的弟弟
        dom.append(parent, node)//调用上面的append的方法，把node变成parent的儿子
    },
    // /* 单纯的删除节点*/
    remove(node) {
        node.parentNode.removeChild(node)//节点的爸爸删除这个元素
        return node//返回这个节点，可以保留这个节点的引用
    },
    // /*删除的节点放在数组里*/
    empty(node) {
        const array = []//声明一个数组，用来存放删除的元素
        let x = node.firstChild//声明x等于节点的第一个孩子
        while (x) {
            array.push(dom.remove(node.firstChild))//调用dom.remove的方法，删除第一个孩子，并把它push到数组里
            x = node.firstChild//此时，x等于之前的第二个孩子
        }
        return array
    },
    /*设置或读取title的值 */
    attr(node, name, value) { // 重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)//参数为3，则是设置title的值
        } else if (arguments.length === 2) {
            return node.getAttribute(name)//参数为3，则是读取title的值
        }
    },
    /*读或写文本的内容 */
    text(node, string) { // 适配
        if (arguments.length === 2) { //{参数为2，则是设置文本的值
            if ('innerText' in node) {
                node.innerText = string//判断浏览器是否支持innerText
            } else {
                node.textContent = string//不支持就用textContent
            }
        } else if (arguments.length === 1) {//{参数为2，则是读取文本的值
            if ('innerText' in node) {
                return node.innerText//同上
            } else {
                return node.textContent//同上
            }
        }
    },
    /*读写html的内容 */
    html(node, string) {
        if (arguments.length === 2) {//{参数为2，则是设置html的值
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML//{参数为2，则是读取html的值
        }
    },
    /*读写style的属性 */
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div, 'color', 'red')
            node.style[name] = value//参数为3，表示是设置style的值
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {//判断name是不是字符串，是的话就是读取style的属性
                // dom.style(div, 'color')
                return node.style[name]
            } else if (name instanceof Object) {//判断name是不是对象
                // dom.style(div, {color: 'red'})
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]//遍历对象，以对象的形式设置style
                }
            }
        }
    },
    /*添加class */
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {//判断有没有这个元素
            return node.classList.contains(className)//
        }
    },
    /*添加事件监听 */
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    /*移除事件监听 */
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    /*获取标签或者很多标签 */
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)//scope里没有，再去document里找
    },
    /*获取父元素 */
    parent(node) {
        return node.parentNode
    },
    /*获取子元素 */
    children(node) {
        return node.children
    },
    /* 获取兄弟姐妹元素*/
    siblings(node) {
        return Array.from(node.parentNode.children)//把node的父亲的所有儿子拿出来，变成数组，同时并且过滤掉自己
            .filter(n => n !== node)
    },
    /*获取弟弟元素 */
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {//判断x是不是文本，文本的话就找下一个
            x = x.nextSibling
        }
        return x
    },
    /*获取哥哥元素 */
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {//判断x是不是文本，文本的话就找上一个
            x = x.previousSibling
        }
        return x
    },
    /*遍历所有节点 */
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    /*获取排行第几 */
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
};