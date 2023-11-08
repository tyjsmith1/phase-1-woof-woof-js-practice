const dogBarContainer = document.getElementById("dog-bar")
const dogInfoContainer = document.getElementById("dog-info")
const url = "http://localhost:3000/pups"

fetch(url)
.then(response => response.json())
.then(data => {
    data.forEach((dogs) => {
        const newSpanBar = document.createElement("span")
        newSpanBar.innerHTML = dogs.name
        dogBarContainer.append(newSpanBar)

        newSpanBar.addEventListener("click", (e) => {
            dogInfoContainer.innerHTML = ""

            const newImgShowcase = document.createElement("img")
            const newNameShowcase = document.createElement("h2")
            const newButtonShowcase = document.createElement("button")

            newImgShowcase.src = dogs.image
            newNameShowcase.textContent = dogs.name
            newButtonShowcase.textContent = "Good Dog!"

            dogInfoContainer.appendChild(newImgShowcase)
            dogInfoContainer.appendChild(newNameShowcase)
            dogInfoContainer.appendChild(newButtonShowcase)

            newButtonShowcase.addEventListener("click", (e) => {
                if (newButtonShowcase.textContent === "Good Dog!") {
                    fetch((url + "/" + dogs.id), {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            isGoodDog: false
                        })
                    })
                    return newButtonShowcase.textContent = "Bad Dog!"
                } else if (newButtonShowcase.textContent === "Bad Dog!") {
                    fetch((url + "/" + dogs.id), {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            isGoodDog: true
                        })
                    })
                    return newButtonShowcase.textContent = "Good Dog!"
                }
            })
        })
    })
    
})


// When a user clicks the Good Dog/Bad Dog button, two things should happen:

// 1. The button's text should change from Good to Bad or Bad to Good
// 2. The corresponding pup object in the database should be updated to reflect the new isGoodDog value

// You can update a dog by making a PATCH request to /pups/:id and including the updated isGoodDog status 
// in the body of the request.