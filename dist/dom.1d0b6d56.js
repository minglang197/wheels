// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dom.js":[function(require,module,exports) {
window.dom = {
  /*创建一个节点*/
  create: function create(string) {
    var container = document.createElement("template");
    /*template用来清除字符串的空格 */

    container.innerHTML = string.trim();
    /*trim()用来除去空格*/

    return container.content.firstChild; //返回container的内容的第一个孩子
  },

  /*新增一个弟弟*/
  after: function after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling); //找到节点的爸爸，调用insertBefore的方法，把node2插入到下一个节点的前面
  },

  /*新增一个哥哥*/
  before: function before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  // /* 新增一个儿子*/
  append: function append(parent, node) {
    parent.appendChild(node);
  },
  // /* 新增一个爸爸*/
  wrap: function wrap(node, parent) {
    dom.before(node, parent); //调用上面的before方法，使得node是parent的弟弟

    dom.append(parent, node); //调用上面的append的方法，把node变成parent的儿子
  },
  // /* 单纯的删除节点*/
  remove: function remove(node) {
    node.parentNode.removeChild(node); //节点的爸爸删除这个元素

    return node; //返回这个节点，可以保留这个节点的引用
  },
  // /*删除的节点放在数组里*/
  empty: function empty(node) {
    var array = []; //声明一个数组，用来存放删除的元素

    var x = node.firstChild; //声明x等于节点的第一个孩子

    while (x) {
      array.push(dom.remove(node.firstChild)); //调用dom.remove的方法，删除第一个孩子，并把它push到数组里

      x = node.firstChild; //此时，x等于之前的第二个孩子
    }

    return array;
  },

  /*设置或读取title的值 */
  attr: function attr(node, name, value) {
    // 重载
    if (arguments.length === 3) {
      node.setAttribute(name, value); //参数为3，则是设置title的值
    } else if (arguments.length === 2) {
      return node.getAttribute(name); //参数为3，则是读取title的值
    }
  },

  /*读或写文本的内容 */
  text: function text(node, string) {
    // 适配
    if (arguments.length === 2) {
      //{参数为2，则是设置文本的值
      if ('innerText' in node) {
        node.innerText = string; //判断浏览器是否支持innerText
      } else {
        node.textContent = string; //不支持就用textContent
      }
    } else if (arguments.length === 1) {
      //{参数为2，则是读取文本的值
      if ('innerText' in node) {
        return node.innerText; //同上
      } else {
        return node.textContent; //同上
      }
    }
  },

  /*读写html的内容 */
  html: function html(node, string) {
    if (arguments.length === 2) {
      //{参数为2，则是设置html的值
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML; //{参数为2，则是读取html的值
    }
  },

  /*读写style的属性 */
  style: function style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div, 'color', 'red')
      node.style[name] = value; //参数为3，表示是设置style的值
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        //判断name是不是字符串，是的话就是读取style的属性
        // dom.style(div, 'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //判断name是不是对象
        // dom.style(div, {color: 'red'})
        var object = name;

        for (var key in object) {
          node.style[key] = object[key]; //遍历对象，以对象的形式设置style
        }
      }
    }
  },

  /*添加class */
  class: {
    add: function add(node, className) {
      node.classList.add(className);
    },
    remove: function remove(node, className) {
      node.classList.remove(className);
    },
    has: function has(node, className) {
      //判断有没有这个元素
      return node.classList.contains(className); //
    }
  },

  /*添加事件监听 */
  on: function on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },

  /*移除事件监听 */
  off: function off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  /*获取标签或者很多标签 */
  find: function find(selector, scope) {
    return (scope || document).querySelectorAll(selector); //scope里没有，再去document里找
  },

  /*获取父元素 */
  parent: function parent(node) {
    return node.parentNode;
  },

  /*获取子元素 */
  children: function children(node) {
    return node.children;
  },

  /* 获取兄弟姐妹元素*/
  siblings: function siblings(node) {
    return Array.from(node.parentNode.children) //把node的父亲的所有儿子拿出来，变成数组，同时并且过滤掉自己
    .filter(function (n) {
      return n !== node;
    });
  },

  /*获取弟弟元素 */
  next: function next(node) {
    var x = node.nextSibling;

    while (x && x.nodeType === 3) {
      //判断x是不是文本，文本的话就找下一个
      x = x.nextSibling;
    }

    return x;
  },

  /*获取哥哥元素 */
  previous: function previous(node) {
    var x = node.previousSibling;

    while (x && x.nodeType === 3) {
      //判断x是不是文本，文本的话就找上一个
      x = x.previousSibling;
    }

    return x;
  },

  /*遍历所有节点 */
  each: function each(nodeList, fn) {
    for (var i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },

  /*获取排行第几 */
  index: function index(node) {
    var list = dom.children(node.parentNode);
    var i;

    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }

    return i;
  }
};
},{}],"C:/Users/吉明朗/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56350" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/吉明朗/AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js","dom.js"], null)
//# sourceMappingURL=/dom.1d0b6d56.js.map