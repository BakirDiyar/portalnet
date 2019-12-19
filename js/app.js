
function Effects (el){
    this.el = el
}

function Carousel(btns){
    this.btnL= btns.left 
    this.btnR= btns.right 
}

function MenuNav (el){
    this.element = el
}

Effects.prototype.fadeIn = function(top){
    let menu = document.querySelector('.navbar-nav')
    let screenWidth = getScreenWidth()
    if(screenWidth >= 993){
       if(top>65){
           menu.classList.add('fade-in')
        }else{
            menu.classList.remove('fade-in') 
        } 
    }
    
}

Effects.prototype.scrolling = function(){
    this.el.addEventListener('scroll', (e)=>{
        let ofY =this.el.pageYOffset
        this.fadeIn(ofY)
        this.interactionSettings()
    })
}

Effects.prototype.interactionSettings = function(){
    let settings = document.querySelector('.settings')
    let top = settings.getBoundingClientRect().top
    ////console.log('top ', top);
}

function getLeftCarousel(el){
    let styleCss = window.getComputedStyle(el)
    let transf = new WebKitCSSMatrix(styleCss.webkitTransform)
    let left = transf.m41
    return left
}

function getScreenWidth(){
    let screenWidth = window.screen.width
    return screenWidth
}
Carousel.prototype.move= function(){
    this.btnR.addEventListener('click', (e)=>{
        let carousel = document.querySelector('.wrp-carousel')
     
        let left = getLeftCarousel(carousel)
        e.stopPropagation()
        console.log('left ',left);
        let move = 0
        if(left==0  || left <= -250){
            move = -250
        }

        carousel.animate([
          { transform: 'translateX('+left+'px)' }, 
          { transform: 'translateX('+move+'px)' }
        ], { 
          duration: 500,fill: 'both'
        });
    })

    this.btnL.addEventListener('click', (e)=>{
        let carousel = document.querySelector('.wrp-carousel')
     
        let left = getLeftCarousel(carousel)
        e.stopPropagation()
        console.log('left ',left);
        let move = 0
        if(left<0  || left <= -250){
            move = left +250
        }

        carousel.animate([
          { transform: 'translateX('+left+'px)' }, 
          { transform: 'translateX('+move+'px)' }
        ], { 
          duration: 500,fill: 'both'
        });
    })
}

MenuNav.prototype.toggleMenu = function(){
    this.element.addEventListener('click', (e)=>{
        let screenWidth = getScreenWidth()
        let menu = document.querySelector('.navbar-nav')
        if(screenWidth<993){
            menu.classList.toggle('toggleOpen')
        }
    })
}

MenuNav.prototype.smooth = function(e){

    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

    e.preventDefault();

    const targetID = e.target.getAttribute("href");
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor)-100;
  
    window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
  
    const checkIfDone = setInterval(function() {
      const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight +100;
      console.log('atb ',atBottom);
      if (distanceToTop(targetAnchor)+100 === 0 || atBottom) {
        targetAnchor.tabIndex = "-1";
        targetAnchor.focus();
        window.history.pushState("", "", targetID);
        clearInterval(checkIfDone);
      }
    }, 2000);
}

MenuNav.prototype.scrool = function(){
    this.element.forEach(el =>el.addEventListener('click', this.smooth))
}

let btnL = document.querySelector('#btn-l')
let btnR = document.querySelector('#btn-r')
let btnTogle = document.querySelector('.toggleMenu')
let navLinks = document.querySelectorAll('.nav-link')
let scrollPage = new Effects(window)
let carousel = new Carousel({left : btnL, right: btnR})
let toggleBtn = new MenuNav(btnTogle)
let smoothPage = new MenuNav(navLinks)
toggleBtn.toggleMenu()
smoothPage.scrool()
scrollPage.scrolling()
carousel.move()