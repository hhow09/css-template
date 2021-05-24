const api = (page) => `https://api.github.com/users?since=${page}&per_page=50`;
const options = {
  root: null,
  //root：default 是以瀏覽器的 viewport 為範圍來判定目標元素的進出與否，也可指定元素元素作為觀察範圍
  //需要注意的是「root 必須要是所有目標元素的父元素（或祖父層的元素）」
  rootMargin: "0px",
  //設定 root 周圍的 margin — 能有效的「擴大或縮小這個用來觀察的盒子範圍」。
  threshold: 0,
  //目標元素的可見度達到多少比例時，觸發 callback 函式。
};

const useInfiniteScroll = () => {
  let page = 0;
  let list = [];
  let prevY = 0;
  let observer = new IntersectionObserver(
    handleObserver, //callback
    options
  );
  function getNewList(page) {
    fetch(api(page))
      .then((response) => response.json())
      .then((json) => {
        list = [...list, ...json];
        json.forEach((item) => {
          const li = document.createElement("li");
          const p = document.createElement("p"); // is a node
          p.innerHTML = item.login;

          li.appendChild(p);
          document.getElementById("container").appendChild(li);
        });
      });
  }

  // fetch new when isIntersecting === true
  // function handleObserver(entitites) {
  //   if (!entitites[0].isIntersecting) return;
  //   const lastUser = list[list.length - 1];
  //   const curPage = lastUser?.id;
  //   getNewList(curPage);
  // }

  //fetch new when 
  function handleObserver(entitites) {
    const y = entitites[0].boundingClientRect.y;
    //boundingClientRect: providing information about 
    //1. the size of an element
    //2. its position relative to the viewport.
    if (prevY > y) {
      // when entering intersection && previous Y  
      const lastUser = list[list.length - 1];
      const curPage = lastUser?.id;
      getNewList(curPage);
    }
    prevY = y;
  }

  getNewList(page);
  observer.observe(document.getElementById("loading"));
};
useInfiniteScroll();
