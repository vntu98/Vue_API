console.log('-------------------------')

// function first() {
//     setTimeout(() => {
//         console.log("Tương tác với server");
//     }, 2000);
// }

// function second() {
//     console.log("Before first() run");
//     first();
//     console.log("After first() run");
// }

// second();

function login(username, password) {
    return new Promise( (resolve, reject) => {
        console.log("server đang xử lý");
        setTimeout(() => {
            
            console.log("server xử lý thành công");
            let data = {
                username: username,
                password: 'lkasjdiouo-32k4jhkjshdf',
                isLogin: true,
                userId: ';lkasodsiopaapasodn72384g'
            }
            resolve(data);
            
           /*
            console.log("server xử lý that bai");
            let data = {
                error: 'dang nhap that bai',
                isLogin: 'false'
            }
           reject(data);
           */
        }, 2000);
    });
}

function getPostByUserId(userId) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log('Server getPostUserById xu li thanh cong, userId = ', userId);
            let data = [
                {
                    postId: 1,
                    content: 'asdfds'
                },
                {
                    postId: 2,
                    content: 'pioxcv'
                }
            ];
            // resolve(data);
            reject({
                data,
                error: 'xu li post by user id'
            });
        }, 4000);
    })
}
/* 
login('admin', 'admin').then(function(data) {
    console.log("server sau khi xử lý");
    return {
        demo: 'abc',
        demo2: 'xử lý công việc 2',
        data: data

    }
}).then(function(data)  {
    console.log('xu li lan thu 3', data);
}) 
*/

/*
login('admin', 'password')
.then(function(data) {
    console.log("Success", data);
    getPostByUserId(data.userId).then(function(data) {
        console.log("data getPost = ", data);
    });
})
.catch(function(error) {
    console.log("error", error);
})
*/

async function handleLoginUser() {
    try {
        var resultLogin = await login('admin', 'admin');
        console.log("result login = ", resultLogin);
        var resultPost = await getPostByUserId(resultLogin.userId);
        console.log('result Post = ', resultPost);
    } catch(error) {
        console.log("error: ", error);
    }
}

// handleLoginUser();

let resultPost = fetch('http://api-meme-zendvn-01.herokuapp.com/api/post/getListPagination.php?pagesize=3&currPage=1');

let start = new Date().getTime();
resultPost.then(function(res) {
    let end = new Date().getTime();
    console.log('time: ', end - start);
    console.log(res.json)
    return res.json();
}).then(data => {
    console.log(data);
});

console.log('-------------------------')
