var value = [
    {
        username: 'thanhtoan',
        email: 'thanhtoan@gmail.com',
        password: 'thanhtoan123',
    },
    {
        username: 'thientoan',
        email: 'thientoan@gmail.com',
        password: 'thientoan123',
    },
    {
        username: 'thanhluc',
        email: 'thanhluc@gmail.com',
        password: 'thanhluc123',
    }
]

document.querySelector('.loginConfirm').onclick = () => HandleCheckLogin();

// Handle kiểm tra đăng nhập
const HandleCheckLogin = () => {
    let loginUsername = document.querySelector('.loginUsername').value;
    let loginPassword = document.querySelector('.loginPassword').value;
    console.log(`${loginUsername}\n${loginPassword}`);
}

// Start of scripts for Login and Register form
document.querySelector('.loginButton').onclick = () => {
    document.querySelector('.loginContainer').style.display = 'block';
}

document.querySelector('.overlay').onclick = () => {
    document.querySelector('.Log-RegContainer').style.display = 'none';
}

document.querySelector('.loginForm__closeButton').onclick = () => {
    document.querySelector('.loginContainer').style.display = 'none';
}

document.querySelector('.registerForm__closeButton').onclick = () => {
    document.querySelector('.registerContainer').style.display = 'none';
    document.querySelector('.loginContainer').style.display = 'block';
}

document.querySelector('.loginForm__messageRegister').onclick = () => {
    document.querySelector('.registerContainer').style.display = 'block';
    document.querySelector('.loginContainer').style.display = 'none';
}

document.querySelector('.registerForm__messageLogin').onclick = () => {
    document.querySelector('.registerContainer').style.display = 'none';
    document.querySelector('.loginContainer').style.display = 'block';
}
// End of scripts for Login and Register form

// Handle 'PLAY NOW' button
document.querySelector('#playing-game > div.box-container > input[type=button]').onclick = () => {
    window.location.href = './playingGame.html';
}

// Hanld 'Read more' button
document.querySelectorAll('#collection > div > div > button').forEach((ele) => {
    ele.onclick = () => {
        window.location.href = './Collection.html';
    }
});