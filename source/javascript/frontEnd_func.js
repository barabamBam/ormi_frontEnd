// subscribe 창 위치 조절
const subs_div = document.querySelector('#subscribe_div');
let mainHeight = document.querySelector('main').offsetHeight;
subs_div.style.top = mainHeight - 320 + 'px';
window.addEventListener('resize', (event) => {
    mainHeight = document.querySelector('main').offsetHeight;
    subs_div.style.top = mainHeight - 320 + 'px';
});

// subscribe 버튼 클릭 시 modal 창 띄우기 & ok 버튼 클릭 시 다시 hidden
const form = document.querySelector('form');
const mail = document.querySelector('#input_email');
const modal = document.querySelector('#modal');
const overlay = document.querySelector('#overlay');
const ok_btn = document.querySelector('.ok_btn');
overlay.style.width = document.body.offsetWidth + 'px';
overlay.style.height = document.body.offsetHeight + 'px';
let inputValue = "";
form.addEventListener('submit', function (event) {
    event.preventDefault();
    modal.style.visibility = "unset";
    overlay.style.display = "unset";
    inputValue = mail.value;
    mail.value = "";
});
ok_btn.addEventListener('click', (event) => {
    modal.style.visibility = "hidden";
    overlay.style.display = "none";
});


// show_more 버튼 클릭 시 action
const show_more = document.querySelector('#show_more');
const continueTxt = document.querySelector('#continue_txt');
let catNum = 7;
let cnt = 1;

show_more.addEventListener('click', function (event) {
    let obj = document.getElementById('image_article');
    // 이미지를 삽입할 위치 지정
    let previous = obj.lastElementChild.previousElementSibling;
    let pre_prev = previous.previousElementSibling;

    if (show_more.getAttribute("class") === "close") {
        catNum = 7;
        // 이미지 지우기
        for (cnt; cnt > 1; cnt--) {
            pre_prev = previous.previousElementSibling;
            //console.log("cnt: " + cnt);
            pre_prev.remove();
        }

        show_more.classList.remove("close");
        show_more.innerText = 'Show more';

    } else {
        // 파일이 없으면
        if (fileFind() === false) {
            //show_more.style.visibility = "hidden";
            show_more.setAttribute("class", "close");
            show_more.innerText = "CLOSE";
        } else {
            cnt++;
            // 이미지 삽입
            let newElement = document.createElement('ul');
            newElement.setAttribute("class", "show_img");
            for (let j = 0; j < 6; j++) {
                // 파일이 없으면
                if (fileFind() === false) {
                    // show_more.style.visibility = "hidden";
                    show_more.setAttribute("class", "close");
                    show_more.innerText = "CLOSE";
                    newElement.style.width = pre_prev.offsetWidth + 'px';
                    break;
                } else {
                    // 사진을 6개씩 묶어서 리스트로 만듧
                    newElement.insertAdjacentHTML('beforeend', `<li><a href="../img/cat${catNum}.jpg" download><img src="../img/cat${catNum}.jpg" alt="귀여운 고양이 사진"></a></li>`);
                    catNum += 1;
                }
            }
            // 리스트 등록 및 sub 창 위치 변경
            obj.insertBefore(newElement, previous);

        }
    }
    mainHeight = document.querySelector('main').offsetHeight;
    subs_div.style.top = mainHeight - 320 + 'px';
    pre_prev = previous.previousElementSibling;
    window.scrollTo({top: pre_prev.offsetTop, behavior: "smooth"});
});

// img 다운로드 전에 물어보기
let downImgs = document.querySelectorAll('.show_img li a');
downImgs.forEach((item) => {
    item.addEventListener('click', (event) => {
        if(!confirm('사진을 다운로드 하시겠습니까?')) event.preventDefault();
    });
});

// 파일 존재 여부 확인
function fileFind() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `../img/cat${catNum}.jpg`, false);
    xhr.send();
    if (xhr.status === 404) {
        console.log("NOT FOUND");
        return false;
    }
}