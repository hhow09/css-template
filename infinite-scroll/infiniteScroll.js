const api = (page)=> `https://api.github.com/users?since=${page}&per_page=50`;
const options = {
  root: null, //page as root
  rootMargin: "0px",
  threshold: 1.0
};

const useInfiniteScroll = ()=>{
  let page = 0
  let list = []
  let prevY = 0
  let observer = new IntersectionObserver(
    handleObserver, //callback
    options
  );
  const loading = document.getElementById("loading")
  function getNewList (page){
    fetch(api(page)).then(response=>response.json()).then((json)=> {
      list = [...list, ...json];
      json.forEach(item=>{
        const li = document.createElement("li");
        const p = document.createElement('p'); // is a node
        p.innerHTML = item.login;

        li.appendChild(p)
        document.getElementById("container").appendChild(li)
      })
    });
  }

  function handleObserver(entitites){
    const y = entitites[0].boundingClientRect.y;
    console.log(prevY,y)
    if(prevY>y){
      const lastUser = list[list.length - 1];
      const curPage = lastUser.id;
      getNewList(curPage);
    }
    prevY = y
  }

  getNewList(page)
  observer.observe(loading)
}
useInfiniteScroll()