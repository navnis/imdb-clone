
const express = require('express')
const axios = require('axios')

const app = express()


const getallUsers = (id = "") => {
    try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        return data
    } catch (error) {
        return []
    }
}

const getAllPosts = (id) => {
    return axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then(response => {
            return response.data
        })
}

const users = [{ id: 1, name: "ravi" }, { id: 2, name: "nischal" }, { id: 3, name: "shubham" }, { id: 4, name: "rahul" }, { id: 5, name: "awadh" }]

app.listen(4000, () => (console.log("Listening on PORT 4000")))
app.get('/', (req, res) => {
    res.send("Hello you  have entered here")
})


app.get('/users', async (req, res) => {
    const allUsersData = await getallUsers()
    res.send(allUsersData)
})

// app.get('/users/:id', (req, res) => {
//     const data = req.params

//     if (data.id.includes(".")) {
//         return res.send("Bhai decimal mat bej yr")
//     }

//     const convertNumber = Number(data.id)
//     if (isNaN(convertNumber)) {
//         return res.status(400).send("Bsdk sahi data bej")
//     }

//     if (convertNumber % 1 !== 0) {
//         return res.status(400).send("Is id pe tmhari maa chud rhi kya.")
//     }

//     const filteredData = users.find(user => user.id === Number(data.id))
//     if (!filteredData) {
//         return res.status(404).send("User not found")
//     }

//     res.send(filteredData) //final data
// })


app.get('/users/:id', async (req, res) => {
    const data = req.params

    if (data.id.includes(".")) {
        return res.send("Bhai decimal mat bej yr")
    }

    const convertNumber = Number(data.id)
    if (isNaN(convertNumber)) {
        return res.status(400).send("Bsdk sahi data bej")
    }

    if (convertNumber % 1 !== 0) {
        return res.status(400).send("Is id pe tmhari maa chud rhi kya.")
    }

    const filteredUser = await getallUsers(data.id)
    const filteredPosts = await getAllPosts(data.id)
    if (!filteredUser || !filteredPosts) {
        return res.status(404).send("User not found")
    }

    filteredPosts.forEach(element => {
        delete element["userId"]
    });

    res.send({ ...filteredUser, post: filteredPosts }) //final data
})

let randomData = new Map()
for (let index = 1; index < 1000000; index++) {
    randomData.set(index, index)
}

const randomNumber = 2

let found = false
const firstTime = new Date().getTime()
console.log(randomData.get(900000))

// for (let index = 0; index < randomData.length; index++) {
//     console.log("nnnn")
//     if (randomData[index] === randomNumber) {
//         found = true
//         break;
//     }

// }
// randomData.forEach(async element => {
//     const filteredUser = await getallUsers(element)
//     console.log(filteredUser.id)
// })

console.log(found, "found")
console.log(new Date().getTime() - firstTime)

function checkNumberExists(number) {
    // return randomData.includes(number)

}

app.get('/random/:randomNumber', (req, res) => {
    const data = req.params

})



