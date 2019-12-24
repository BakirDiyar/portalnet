
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
    let maint = document.querySelector('.maintenance')
    let maintTop = null
    if(maint){ maintTop = maint.getBoundingClientRect().top}
    let cards = document.querySelectorAll('.maintenance .card')
    let screenWidth = getScreenWidth()
  
    if(screenWidth >= 993){
       if(top>580){
           menu.classList.add('sticky')
           menu.classList.add('fade-in')
           menu.classList.remove('fade-out')
        }else{
            menu.classList.add('fade-out') 
            menu.classList.remove('fade-in') 
            menu.classList.remove('sticky') 
        } 
    }
    if(maint && maintTop!=null){
        
        if(maintTop<=320){
            cards.forEach(m=> m.classList.add('fade-in'))
            cards.forEach(m=> m.classList.remove('fade-out'))
        }else{
            cards.forEach(m=> m.classList.add('fade-out'))
            cards.forEach(m=> m.classList.remove('fade-in'))
        } 
     
    }
    
    
}

Effects.prototype.scrolling = function(){
    this.el.addEventListener('scroll', (e)=>{
        let ofY =this.el.pageYOffset
        this.fadeIn(ofY)
        this.interactionTabMenu()
    })
}

Effects.prototype.interactionTabMenu = function(){
    let sects = [] = document.querySelectorAll('.sect')
    let links  = [] = document.querySelectorAll('.navbar-nav .nav-link')
    if(sects &&  sects.length>0){
        sects.forEach(sect=>{
            let top  = sect.getBoundingClientRect().top
            if(top<=120){
                let id = sect.id 
                if(links && links.length>0){
                    links.forEach(link=>{
                        let href = link.href.split('#')[1]
                        if('#'+href == '#'+id){
                            link.classList.add('link-active')
                        }else{
                            link.classList.remove('link-active')
                        }
                    })
                }
            }
        })
    }
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
  let carRows= document.querySelectorAll('.infrastructure .row-carousel')

Carousel.prototype.move= function(){
    let count = 0 
    let move = 0
    this.btnR.addEventListener('click', (e)=>{
    
    if(carRows && carRows.length>0){
        carRows.forEach((carRow, ind)=>{
        
            let childrenRow = carRow.children
            if(childrenRow && childrenRow.length>2) {
        
                let elementChildren = document.querySelectorAll('#'+carRow.id+' .'+childrenRow[count].className)
                
                let clonedElement = elementChildren[count].cloneNode(true)
                carRow.append(clonedElement)
                    count++
                if(count>= 3){
                    count=0
                }
            
            }
        })
    }
        
     
        let carousel = document.querySelector('.wrp-carousel')

        if(carousel){
                let left = getLeftCarousel(carousel)
        e.stopPropagation()
       
        if(left<=0  /*|| left <= -250*/){
            move = move -450
        }

        carousel.animate([
          { transform: 'translateX('+left+'px)' }, 
          { transform: 'translateX('+move+'px)' }
        ], { 
          duration: 200,fill: 'both'
        });  
        }
  
    })

    this.btnL.addEventListener('click', (e)=>{
        let carousel = document.querySelector('.wrp-carousel')
     
        let left = getLeftCarousel(carousel)
        e.stopPropagation()
        console.log('left ',left);
        let move = 0
        if(left<0  || left <= -250){
            move = left +450
        }

        carousel.animate([
          { transform: 'translateX('+left+'px)' }, 
          { transform: 'translateX('+move+'px)' }
        ], { 
          duration: 200,fill: 'both'
        });
    })
}

MenuNav.prototype.toggleMenu = function(){
    this.element.addEventListener('click', (e)=>{
        let screenWidth = getScreenWidth()
        let menu = document.querySelector('.navbar-nav')
        if(screenWidth<1200){
            menu.classList.toggle('toggleOpen')
        }
    })
}

MenuNav.prototype.closeMenu = function(){
    let screenWidth = getScreenWidth()
    let menu = document.querySelector('.navbar-nav')
    if(screenWidth<=1200){
        this.element.forEach(link =>{
            link.addEventListener('click', (e)=>{
                menu.classList.toggle('toggleOpen')

            })
        })
    }
}
 
MenuNav.prototype.smooth = function(e){

    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

    e.preventDefault();
    let links = document.querySelectorAll('.navbar-nav .nav-link')
    if(links && links.length>0){ links.forEach(link=>link.classList.remove('link-active'))}
    e.target.classList.add('link-active')

    const targetID = e.target.getAttribute("href");
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor)-90;
  
    window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
  
    const checkIfDone = setInterval(function() {
      const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight +100;
      console.log('atb ',atBottom);
      if (distanceToTop(targetAnchor)+105 === 0 || atBottom) {
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
let navLinksMenu = document.querySelectorAll('.navbar-nav .nav-link')
let scrollPage = new Effects(window)
if(btnL && btnR){
    let carousel = new Carousel({left : btnL, right: btnR})
    carousel.move()
}
let toggleBtn = new MenuNav(btnTogle)
let menuPhone = new MenuNav(navLinksMenu)
let smoothPage = new MenuNav(navLinks)
toggleBtn.toggleMenu()
menuPhone.closeMenu()
smoothPage.scrool()
scrollPage.scrolling()