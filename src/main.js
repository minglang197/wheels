/*创建一个节点*/
const div = dom.create("<div>hi</div>");
console.log(div);

// dom.after(test,div)
/*新增一个弟弟*/

// dom.before(test, div);
/*新增一个哥哥*/

// dom.append(test,div)
/*新增一个儿子 */

/* 新增一个爸爸*/
// dom.wrap(div,test)

/*删除节点 */
// dom.remove(test)

/*删除的节点放在数组里 */
// let nodes = dom.empty(window.d1)
// console.log(nodes);

/*设置或读取title的值 */
// dom.attr(test, 'title', 'lucidity')/*设置*/
// let title = dom.attr(test,'title')
// console.log(`title: ${title}`);

/*读写文本内容 */
// dom.text(test,'hello')/*设置 */
// console.log(dom.text(test))/*读取 */

/*读取html内容 */
// dom.html(test, 'html')/*设置 */
// console.log(dom.html(test))/*读取 */

/*读写style的属性 */
// dom.style(test, 'color', 'red')/*设置 */
// dom.style(test, { border: '1px solid pink' })/*对象 */
// console.log(dom.style(test, 'color'))/*读取 */

/*添加class */
// dom.class.add(test, 'red')/*添加red */
// dom.class.add(test, 'blue')/*添加blue */
// dom.class.remove(test, 'blue')/* 删除blue*/
// console.log(dom.class.has(test, 'blue'));/*检测blue是否还在 */

/*添加事件监听 */
// let fn = () => {
//     console.log('点击了');
// }
// dom.on(test, 'click', fn)

/*移除事件监听 */
// dom.off(test, 'click', fn)

/*获取标签或者很多标签 */
// let test1 = dom.find('#test')[0]
// console.log(test1);

/*获取父元素 */
// console.log(dom.parent(test))

/*获取子元素 */
// console.log(dom.children(d1));

/*获取兄弟姐妹 */
// console.log( dom.siblings(demo));

/*获取弟弟元素 */
// console.log(dom.next(demo));

/*获取哥哥元素 */
// console.log(dom.previous(demo));

/*获取排行第几,获取的是索引下标 */
// console.log(dom.index(demo2));
