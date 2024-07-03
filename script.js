let Key = "f92f5bf8f9eb159e0778bf9ee9f451a1"
let name = "popular"
const API_IMG = "https://image.tmdb.org/t/p/w500"
const articleRow = document.querySelector(".articleRow")
const recommendedRow = document.querySelector(".recommendedRow")
const input = document.querySelector("input")
fetch(`https://api.themoviedb.org/3/movie/${name}?api_key=${Key}&language=en-US&page=1`)
    .then((response) => response.json())
    .then(data => {
        console.log(data.results);

        if (recommendedRow) {
            data.results.slice(0, 4).forEach(element => {
                recommendedRow.innerHTML += `
              <article class="secondPageArticle">
                    <div class="imgBox" id=${element.id}>
                        <img src=${API_IMG + element.poster_path} alt="movie image" class="movieImage">
                        <div class="absoConta">
                            <div class="rateBox">
                                <i class="fa-regular fa-star"></i>
                                <div class="ratingNumber">7.2</div>
                            </div>
                            <div class="likeBox">
                                <i class="fa-regular fa-heart"></i>
                            </div>
                        </div>
                    </div>
                    <div class="bottomPart">
                        <div class="movieTitle">${element.title}</div>
                        <i class="fa-solid fa-tag"></i>
                </article>
            `
            });
        }

        function getAPI(handleData) {
        articleRow.innerHTML = "" 
        handleData.forEach(element => {
            articleRow.innerHTML += `
            <article class="secondPageArticle">
                <div class="imgBox" id=${element.id}>
                    ${element.image ? `<img src=${element.image} alt="movie image" class="movieImage">`  :  `<img src=${API_IMG + element.poster_path} alt="movie image" class="movieImage">`}
                    <div class="absoConta">
                        <div class="rateBox">
                            <i class="fa-regular fa-star"></i>
                            <div class="ratingNumber">${element.vote_average}</div>
                        </div>
                        <div class="likeBox">
                            <i class="fa-regular fa-heart"></i>
                        </div>
                    </div>
                </div>
                <div class="bottomPart">
                <div class="movieTitle">${element.title}</div>
                <i class="fa-solid fa-tag"></i>
                </div>
                                    </div>
                    <div class="contaBtn">
                    <button id=${element.id} class="read">Read</button>
                    <button id=${element.id} class="update">Update</button>
                    <button id=${element.id} class="delete">Delete</button>
                </div>
            </article>
            `
        });

        const modal2 = document.querySelector(".modal2");
        const boxBtn = document.querySelector(".boxBtn button");

        boxBtn.addEventListener("click",() =>{
            modal2.style.display = "flex";
            setTimeout(() => {
                modal2.style.opacity = "1";
            }, 300)
            modal2.innerHTML = `
                        <div class="modalBox2">
                            <span class="close2"> X </span>
                            <form class="editForm2" action="">
                                <input class="editImg2" type="file" name="" id="">
                                Title:<input class="editTitle2" type="text">
                                Rate:<input class="editVote2" type="number">
                                <button>Create Movie</button>
                            </form>
                         </div>
                     `

                        const editForm2 = document.querySelector(".editForm2");
                        const editImg2 = document.querySelector(".editImg2");
                        const editTitle2 = document.querySelector(".editTitle2");
                        const editOwer2 = document.querySelector(".editOwer2");
                        const editVote2 = document.querySelector(".editVote2");
                        let img2 = null;
                        editImg2.addEventListener("change", (e) => {
                            img2 = URL.createObjectURL(e.target.files[0]);
                         
                        });

                        editForm2.addEventListener("submit", (e) => {
                            e.preventDefault();
                            const createMoviesData = {
                                adult:false,
                                id:Math.floor(Math.random()* 100000 ),
                                title:editTitle2.value,
                                vote_average:editVote2.value,
                                image:img2
                            };
                            handleData.unshift(createMoviesData);
                            getAPI(handleData);
                            modal2.style.display = "none";
                        });

                       


                        const closeX2 = document.querySelector(".close2");
                        closeX2.addEventListener("click", () => {
                            modal2.style.opacity = "0";
                            setTimeout(() => {
                                modal2.style.display = "none";
                            }, 700)
                        })
        })

        const updateBtnAll = document.querySelectorAll(".update")
        const modal1 = document.querySelector(".modal1")
        updateBtnAll.forEach(btn => {
            btn.addEventListener("click", (e) => {
                modal1.style.display = "flex";
                setTimeout(() => {
                    modal1.style.opacity = "1"
                }, 300)
                const id = Number(e.target.id);

                data.results.map(item => {
                    if (item.id === id) {
                        modal1.innerHTML = `
                        <div class = "modalBox1">
                        <span class = "close1">X</span>
                        <div class = "imgBox1">
                        ${item.image ? `<img src=${item.image} alt = ""` : `<img src=${API_IMG + item.poster_path} alt="">`}
                        </div>
                        <form id = ${item.id} class = "editForm" action="">
                        <input class="editImg" type="file" name="" id = "">
                        Title: <input class="editTitle" type="text">
                        Overview: <input class="editOwer" type="text">
                        Vote: <input class="editVote" type="number">
                        <button>Update Movie</button>
                        </form>
                        </div>
                        `

                        const editForm = document.querySelector(".editForm")
                        const editImg = document.querySelector(".editImg")
                        const editTitle = document.querySelector(".editTitle")
                        const editOwer = document.querySelector(".editOwer")
                        const editVote = document.querySelector(".editVote")
                        editTitle.value = item.title;
                        editOwer.value = item.overview;
                        editVote.value = item.vote_average;
                        let img = null;
                        editImg.addEventListener("change", (e) => {
                            img = URL.createObjectURL(e.target.files[0]);
                        });

                        editForm.addEventListener("submit", (e) => {
                            e.preventDefault();
                            const idx = Number(e.target.id);
                            handleData = handleData.map(itemX => {
                                if (itemX.id === idx) {
                                    return {
                                        ...itemX,
                                        title: editTitle.value,
                                        overview: editOwer.value,
                                        vote_average: editVote.value,
                                        image: img,
                                    };
                                }
                                return itemX
                            });

                            getAPI(handleData);
                            modal1.style.display = "none";
                        });

                        const closeX1 = document.querySelector(".close1");
                        closeX1.addEventListener("click", () => {
                            modal1.style.opacity = "0";
                            setTimeout(() => {
                                modal1.style.display = "none";
                            }, 700)
                        })
                    }
                }
                )

            })
        })

        const deleteBtnAll = document.querySelectorAll(".delete");
        deleteBtnAll.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = Number(e.target.id);
                data.results = data.results.filter(item => item.id !== id)
                console.log(data.results);
                getAPI(data.results)
            })
        });

        const readBtnAll = document.querySelectorAll(".read")
        const modal = document.querySelector(".modal")
            readBtnAll.forEach(btn => {
            btn.addEventListener("click", (e) => {
                modal.style.opacity = "1";
                modal.style.display = "flex"
                const id = Number(e.target.id);
                data.results.map(item => {
                    if(item.id === id) {
                        modal.innerHTML = `
                        <div class = "modalBox">
                        <span class = "close">X</span>
                        <div class = "imgBox">
                        <img src=${API_IMG + item.poster_path} alt="">
                        </div>
                        <h1>${item.title}</h1>
                        <span>${item.original_language}</span>
                        <span>${item.vote_count}</span>
                        <p>${item.release_date}</p>
                        <p>${item.overview}</p>
                        </div>
                        `
                    }
                    const close = document.querySelector(".close")
                    if (close) {
                        close.addEventListener("click", (e) => {
                            modal.style.display = "none"
                        })
                    }
                })
            })

        })   
    }

        getAPI(data.results);



        const allBox = document.querySelectorAll(".imgBox")
        console.log(allBox);
        allBox.forEach(box => {
            box?.addEventListener("click", (e) => {
                location.href = "details.html"
                let handleId = Number(e.target.parentNode.id);
                data.results.forEach((item) => {
                    if (item.id === handleId) {
                        console.log(item);
                        localStorage.setItem("d", JSON.stringify(item));
                    }
                })
            })
        }
        )


    });



const detailsSection1 = document.querySelector("#detailsSection1")
const detailsSection2 = document.querySelector("#detailsSection2")
const myLocalData = JSON.parse(localStorage.getItem("d"))
console.log(myLocalData);
if (detailsSection1) {
    detailsSection1.innerHTML = `
            <article class="detailsPageFirstArticleConta">
                <div class="detailsPageFirstArticleBanner">
                    <img src=${API_IMG + myLocalData.backdrop_path} alt="banner" class="detailsBannerConta">
                </div>
                <div class="detailsPageFirstArticleTitle">
                    <div class="detailsPageFirstArticleMovieSlogan">
                        Slogan
                    </div>
                    <h1 class="detailsPageFirstArticleMovieTitle">
                        ${myLocalData.original_title}
                    </h1>
                </div>
            </article>
`
}

if (detailsSection2) {
    detailsSection2.innerHTML = `
      <article class="detailsPageSecondArticleConta">
                <div class="detailsPageSecondArticleLeftConta">
                    <div class="detailsPageSecondArticlePosterConta">
                        <img src=${API_IMG + myLocalData.poster_path} alt="poster"
                            class="detailsPageSecondArticlePosterImage">
                    </div>
                </div>
                <div class="detailsPageSecondArticleRightConta">
                    <div class="detailsPageSecondArticleRightDetailsOneConta">
                        <h1 class="detailsPageSecondArticleRightDetailsOneTitleConta">
                            Description
                        </h1>
                        <div class="detailsPageSecondArticleRightDetailsOneDetailsConta">
                        ${myLocalData.overview}
                        </div>
                        <div class="detailsPageSecondArticleRightDetailsOneRatingConta">
                            <div class="rateBox2">
                                <i class="fa-regular fa-star"></i>
                                <div class="ratingNumber">${myLocalData.vote_average}</div>
                            </div>
                        </div>
                        <div class="detailsPageSecondArticleRightDetailsOneIconBox">
                            <i class="fa-regular fa-heart"></i>
                            <i class="fa-solid fa-tag"></i>
                        </div>
                    </div>
                    <div class="detailsPageSecondArticleRightDetailsTwoConta">
                        <div class="gray">Type <br> </div>

                        <div class="black">Movie <br> </div>
                        <div class="gray">Relase Date: <br> </div>

                        <div class="black">${myLocalData.release_date}<br> </div>
                        <div class="gray">Run time <br> </div>

                        <div class="black">181 min <br> </div>
                        <div class="gray">Genres <br> </div>

                        <div class="black">Adventure, Sciense Fiction, Action <br> </div>
                    </div>
                </div>
            </article>
`
}