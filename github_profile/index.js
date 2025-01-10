const url = "https://api.github.com/users";
const searchInputEL = document.getElementById("searchInput");
const searchButtonEL = document.getElementById("search-Bt");
const profilecontainerEL = document.getElementById("profilecontainer");
const loadingEL = document.getElementById("loading");

const generateProfile = (profile) =>{
    return( 
    `<div class="profile-section">
        <div class="top-section">
            <div class="left-section">
                <div class="avtar">
                    <img src="${profile.avatar_url}" alt="avtar"\>
                </div>
                <div class="self">
                    <h1>${profile.name}</h1>
                    <h1>${profile.login}</h1>
                </div>
            </div>
            <a href="${profile.html_url}" target="_black">
            <button class="primary-btn">Check Profile</button>
            </a>
        </div>

        <div class="about">
            <h2>About</h2>
            <p>${profile.bio}</p>
        </div>
        <div class="status">
            <div class="status-item">
                <h3>Followers</h3>
                <p>${profile.followers}</p>
            </div>
            <div class="status-item">
                <h3>Followings</h3>
                <p>${profile.following}</p>
            </div>
            <div class="status-item">
                <h3>Repos</h3>
                <p>${profile.public_url}</p>
            </div>
        </div>

    </div>`);
};

const fetchProfile = async () => {
    const username = searchInputEL.value.trim(); // Trim to remove unnecessary spaces
    loadingEL.innerText="loading.....";
    loadingEL.style.color="black";
    if (!username) {
        console.log("Please enter a username.");
        loadingEL.innerText="please enter correct username"
        return;
    }

    try {
        const res = await fetch(`${url}/${username}`);

        if (!res.ok) { // Check if the response status is not ok (e.g., 404)
            console.log(`Error: User not found (Status: ${res.status})`);
            loadingEL.innerHTML="user not found";
            return;
        }

        const data = await res.json();

        if(data){
            loadingEL.innerText="";
            profilecontainerEL.innerHTML=generateProfile(data);
        }else{
            loadingEL.innerHTML="user not found";
            loadingEL.style.color="red";
        }


        console.log("data", data);
    } catch (error) {
        console.log("Error fetching data:", error);
        loadingEL.innerText="";
    }
};

searchButtonEL.addEventListener("click", fetchProfile);
