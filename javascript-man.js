//
//
//
//
const target = document.querySelectorAll("#container")
const el = document.querySelector("#area-text span");
const text = "Bem-vindo!";
const inteval = 300;
let lastScrollTop = 0;
let espacoSection = 100;
let botaoMenu = true;
let contadorSection = false;

function textAuto(el, text, inteval) {
    const char = text.split("").reverse();

    el.innerHTML = '';
    const type = setInterval(() => {
        if (!char.length) {
            return clearInterval(type)
        }
        const next = char.pop();
        el.innerHTML += next;
    }, inteval)
}
textAuto(el, text, inteval)

window.onresize = () => {
    if (document.querySelector("body").clientWidth > 840) {
        document.querySelector("#menuRigth").style.display="flex"
    }
}
document.querySelector("#botao-menu").addEventListener("click", ()=> {
        
    if (botaoMenu == true) {
        document.querySelector("#menuRigth").style.display="flex"
        botaoMenu = false
    } else {
        document.querySelector("#menuRigth").style.display="none"
        botaoMenu = true
    }
})

setTimeout(() => {
    setInterval(() => {
        let marcador = document.querySelector(".marcador")
        let porMarcador = document.querySelector(".autoEscrita div")
        if (marcador) {
            document.querySelector(".marcador").classList.remove("marcador")
        } else {
            porMarcador.classList.add("marcador")
        }
    }, 500)
}, text.length * inteval)

fetch("dadosProjetos.json").then((response)=> {
    response.json().then((dados)=> {
        let itens = dados.tecnologias;
        let Qimage = itens.length
        for(let i = 0; i < Qimage; i++) {
            document.getElementById("Area-ferramentas").innerHTML += `<section class="image-tec"><img src="${itens[i].image}" alt=""></section>`
            console.log("foi", Qimage)

            // document.querySelectorAll("image-tec").forEach((element)=> {
            //     element.addEventListener("mouseover", (iten)=> {
            //         iten.currentTarget.querySelector("image-tec").style.display ="flex";
            //     })
            // })
        }

    })
})

//--------------------------- area de projetos

fetch("dadosProjetos.json").then((response)=> {
    response.json().then((dados)=> {
     
        let itens = dados.projetosList;
        for (let i=0; i < 3;i++) {
                document.getElementById("area-project").innerHTML += `
                <a href="${itens[i].link}" target="_blank" ><article class="projeto" id="section-projeto" style="background-image: url('${itens[i].image}');">
                                <div class="area-texto-descricao">${itens[i].descricao}</div>
                            </article></a>
                `
                document.querySelectorAll(".projeto").forEach((element)=> {
                    element.addEventListener("mouseover", (iten)=> {
                            iten.currentTarget.querySelector(".area-texto-descricao").style.opacity= 1;  
                        iten.currentTarget.querySelector(".area-texto-descricao").style.display= "flex";  
                    })
                    element.addEventListener("mouseleave", (iten)=> {
                        iten.currentTarget.querySelector(".area-texto-descricao").style.opacity= 0;
                    })
                })
                
            }
    })
})

function scrollAnimetion() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
    const menuHeight = document.querySelector("#menuStaick").clientHeight;
    let distaciaItensTop = parseInt(window.pageYOffset) + menuHeight;

    document.querySelectorAll("[data-section]").forEach((i) => {

        if (i.offsetTop + menuHeight >= distaciaItensTop && i.offsetTop + menuHeight <= distaciaItensTop + 300) {
            let Section = i.getAttribute("data-section")

            if (document.querySelector(".itensMenu.show")) {
                document.querySelector(".itensMenu.show").classList.remove("show")
            }

            document.querySelector("[data-menu=" + Section + "]").classList.add("show")
        }

    });


    target.forEach((itens) => {
        itens.querySelectorAll("[data-mostrar]").forEach((i) => {
            if ((windowTop) > itens.offsetTop) {
                i.classList.add("mostrar")
            } else {
                i.classList.remove("mostrar")
            }
        })
    })
}

document.querySelector(".mostrarEsconder").addEventListener("click", () => {
    if (document.querySelector(".mostrarEsconder").style.transform === "rotate(180deg)") {
        document.querySelector("#section-botao").style.transform = `translateX(-${document.querySelector(".redesSociais").clientWidth}px)`
        document.querySelector(".mostrarEsconder").style.transform = "rotate(0deg)"
    } else {
        document.querySelector(".mostrarEsconder").style.transform = "rotate(180deg)"
        document.querySelector("#section-botao").style.transform = "translateX(0px)"
    }
})

window.addEventListener("scroll", (e) => {
    scrollAnimetion()

    if (this.scrollY < lastScrollTop) {
        document.querySelector("#sectionMenu").classList.remove("menuAnimetion")
    } else {
        document.querySelector("#sectionMenu").classList.add("menuAnimetion")
    }
    lastScrollTop = this.scrollY;

})

