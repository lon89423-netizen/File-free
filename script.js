const $ = id => document.getElementById(id)
let sidebar = $("sidebar")
let menuBtn = $("menuBtn")

menuBtn.onclick = () => sidebar.classList.toggle("show")

const PRODUCT_LINKS = {
    "IPA FREEFIRE": "https://chaptodocquyen.appinstall.cloud/FIREFREE.ipa",
    "FILE CONFIHIOS": "https://zufile.com/download/zfXmue0pbb",
    "FILE ADR": "https://zufile.com/download/DPQgBvvwJX"
}

function toast(msg){
    let t = $("toast")
    t.innerText = msg
    t.classList.remove("hidden")
    setTimeout(()=>t.classList.add("hidden"),2500)
}

function showRegister(){
    $("login").classList.add("hidden")
    $("register").classList.remove("hidden")
}

function registerOnce(){
    if(localStorage.registered) return toast("Đã đăng ký")
    if(regPass.value !== regPass2.value) return toast("Sai mật khẩu")
    localStorage.user = regUser.value
    localStorage.pass = regPass.value
    localStorage.registered = true
    $("register").classList.add("hidden")
    $("login").classList.remove("hidden")
    toast("Đăng ký thành công")
}

function login(){
    if(loginUser.value === localStorage.user && loginPass.value === localStorage.pass){
        $("login").classList.add("hidden")
        $("home").classList.remove("hidden")
        menuBtn.style.display = "block"
        toast("Đăng nhập thành công")
    } else toast("Sai tài khoản")
}

function logout(){
    $("home").classList.add("hidden")
    $("history").classList.add("hidden")
    $("login").classList.remove("hidden")
    menuBtn.style.display = "none"
    sidebar.classList.remove("show")
}

function buy(name,price){
    let list = JSON.parse(localStorage.getItem("history") || "[]")
    list.push({
        name,
        price,
        time: new Date().toLocaleString(),
        link: PRODUCT_LINKS[name]
    })
    localStorage.setItem("history", JSON.stringify(list))
    showHistory()
}

function showHistory(){
    $("home").classList.add("hidden")
    $("history").classList.remove("hidden")
    sidebar.classList.remove("show")

    let list = JSON.parse(localStorage.getItem("history") || "[]")
    $("historyList").innerHTML = list.map(i=>`
        <div class="history-item">
            <b>${i.name}</b><br>
            ${i.price}<br>
            ${i.time}
            <div class="actions">
                <a class="eye" href="${i.link}" target="_blank">👁</a>
                <div class="copy" onclick="navigator.clipboard.writeText('${i.link}');toast('Đã copy')">📋</div>
            </div>
        </div>
    `).join("")
}

function showHome(){
    $("history").classList.add("hidden")
    $("home").classList.remove("hidden")
    sidebar.classList.remove("show")
}

window.onload = () => {
    if(localStorage.user) $("login").classList.remove("hidden")
    else $("register").classList.remove("hidden")
}
