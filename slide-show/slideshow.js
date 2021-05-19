let slideIndex = 0;
createDots();
showSlide(slideIndex);

function createDots(){
    let slides = document.getElementsByClassName("slide");
    const dotContainer = document.getElementById("dot-container");
    dotContainer.append(...new Array(slides.length).fill(1).map((_,index)=>
    {
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.onclick = ()=> showSlide(index)
        return dot
    }))
}

function showSlide(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  const prevSlideIndex = n === slideIndex ? -1 : slideIndex;
  if (n > slides.length-1) slideIndex = 0;
  else if (n < 0) slideIndex = slides.length - 1;
  else slideIndex = n;

  if (prevSlideIndex >= 0) {
      slides[prevSlideIndex].style.display = "none";
      dots[prevSlideIndex].className = dots[prevSlideIndex].className.replace(" active","")
    }
  slides[slideIndex].style.display = "block";
  dots[slideIndex].className+=" active"
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex -1);
}
  