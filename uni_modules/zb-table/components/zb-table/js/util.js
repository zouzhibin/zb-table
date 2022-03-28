/**
 * 获取滚动条宽度
 */
let cached = undefined;

export const getScrollbarSize = fresh => {
	// #ifdef H5
	
    if (fresh || cached === undefined) {
        let inner = document.createElement("div");
        let innerStyle = inner.style;

        innerStyle.width = "100%";
        innerStyle.height = "200px";

        let outer = document.createElement("div");
        let outerStyle = outer.style;

        outerStyle.position = "absolute";
        outerStyle.top = 0;
        outerStyle.left = 0;
        outerStyle.pointerEvents = "none";
        outerStyle.width = "200px";
        outerStyle.height = "150px";
        outerStyle.visibility = "hidden";

        outer.appendChild(inner);
        document.body.appendChild(outer);

        // 设置子元素超出部分隐藏
        outerStyle.overflow = "hidden";

        let width1 = inner.offsetWidth;

        // 设置子元素超出部分滚动
        outer.style.overflow = "scroll";

        let width2 = inner.offsetWidth;

        if (width1 === width2) {
            width2 = outer.clientWidth;
        }

        document.body.removeChild(outer);

        cached = width1 - width2;
    }
	//#endif

    return cached;
};
