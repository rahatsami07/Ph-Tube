// create loadCategories async function
const loadCategories= async() =>{
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(err=> console.error(err))
    
}

// videos------------
// create loadVideos async function
const loadVideos= async(searchId = "") =>{
    // fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchId}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(err=> console.error(err))
    
}
// 
function getTimeString(time){
    
    const hour = parseInt(time / 3600);
    let remainingSecound = time % 3600;
    const minute = parseInt(remainingSecound / 60);
    remainingSecound = remainingSecound % 60;

    return `${hour} hour ${minute} minute ${remainingSecound} secound ago`
}

// 
const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName('category-btn');
    for(let btn of buttons){
        btn.classList.remove('active')
    }
}


// {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// }

// --------------

const loadVideosDetails = async(videoId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    const data = await res.json();
   displayVideoDetails(data.video)
};

const displayVideoDetails = (video) =>{
    console.log(video)
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = 

    `
        <img src=${video.thumbnail} alt="">
        <h2 class = "text-3xl font-bold">${video.title}</h2>

    `

    // way-1
    // document.getElementById('showModalData').click()
    
    // wway-2
    document.getElementById('customModal').showModal()
}

// ------------

const loadVideoCategory = (id) =>{
    // alert(id)
     fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data =>{

        // remove active btn from all
        removeActiveClass()
        // add active btn 

        const activeBtn = document.getElementById(`btn-${id}`);
        console.log(activeBtn);
        activeBtn.classList.add('active')
         displayVideos(data.category)
    })
    .catch(err=> console.error(err))

}

// display Videos
const displayVideos = videos =>{
 console.log(videos)
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if(videos.length == 0){
        videoContainer.classList.remove('grid')
         videoContainer.innerHTML = `
         <div class = "min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
            <img src = "assets/Icon.png"/>
            <h2 class = "text-5xl font-bold text-center">
                Oops!! Sorry, There is no <br/> content here
            </h2>
         </div>
         `;
    }else{
        videoContainer.classList.add('grid')
    }


    // ------
    videos.forEach(video => {
        console.log(video)
        const card = document.createElement('div');
        card.classList = 'card'
        card.innerHTML =
        `
  <figure class="h-[200px] relative">
        <img 
        class ="h-full w-full object-cover"
        src=${video.thumbnail}
        alt="Shoes" />
        ${
            video.others.posted_date?.length == 0? "" : `
            <span class = "absolute right-2 bottom-2 text-xs bg-gray-700 text-white p-1 rounded ">${getTimeString(video.others.posted_date)}</span>
            `
        }
        
  </figure>
  <div class="px-0 py-2 flex gap-2">
        <div>
        </div>
        <img class ="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="">
        <div>
        <h2 class = "text-xl font-bold">${video.title}</h2>
        <div class = "flex items-center gap-3">
        <p class = "text-lg text-gray-400">${video.authors[0].profile_name}</p>
        ${
            video.authors[0].verified == true ? '<img class ="w-5 " src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="">' : ""
        }
        </div>
        <p>
        <button onclick = "loadVideosDetails('${video.video_id}')" class="btn bg-[#ff2442] text-white">Details</button>
        </p>
        </div>

  </div>
        `
    videoContainer.append(card)

    })
}

// create displayCategories
const displayCategories = (categories) =>{

    const categoryContainer = document.getElementById('categories')
    
    categories.forEach((item)=>{
        console.log(item)
        // create button for display on UI
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = 
        
        `
        <button id="btn-${item.category_id}" onclick ="loadVideoCategory(${item.category_id})" class ="btn category-btn">
        ${item.category}
        </button>

        `

        // add button 

        categoryContainer.append(buttonContainer)


    } )

}


document.getElementById('search-input').addEventListener('keyup', (e)=>{
    loadVideos(e.target.value)
})

loadVideos()
loadCategories()