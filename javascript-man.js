//
//
//
//
const target = document.querySelectorAll("#container")
let lastScrollTop = 0;
let espacoSection = 100;
let botaoMenu = true;
let contadorSection = false;

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

fetch("dadosProjetos.json").then((response)=> {
    response.json().then((dados)=> {
        let itens = dados.tecnologias;
        let Qimage = itens.length
        for(let i = 0; i < Qimage; i++) {
            document.getElementById("Area-ferramentas").innerHTML += `<section class="image-tec"><img src="${itens[i].image}" alt=""></section>`

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
window.addEventListener("scroll", (e) => {
    scrollAnimetion()

    if (this.scrollY < lastScrollTop) {
        document.querySelector("#sectionMenu").classList.remove("menuAnimetion")
    } else {
        document.querySelector("#sectionMenu").classList.add("menuAnimetion")
    }
    lastScrollTop = this.scrollY;

})

