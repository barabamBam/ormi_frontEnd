// subscribe 창 위치 조절
const subs_div = document.querySelector('#subscribe_div');
let mainHeight = document.querySelector('main').offsetHeight;
subs_div.style.top = mainHeight - 320 + 'px';

// subscribe 버튼 클릭 시 modal 창 띄우기 & ok 버튼 클릭 시 다시 hidden
const form = document.querySelector('form');
const mail = document.querySelector('#input_email');
const modal = document.querySelector('#modal');
const ok_btn = document.querySelector('.ok_btn');
let inputValue = "";
form.addEventListener('submit', function (event) {
    event.preventDefault();
    modal.style.visibility = "unset";
    inputValue = mail.value;
    mail.value = "";
});
ok_btn.addEventListener('click', (event) => modal.style.visibility = "hidden");


// show_more 버튼 클릭 시 action
const show_more = document.querySelector('#show_more');
let catNum = 7;
let childNum = 0;
let cnt = 0;

show_more.addEventListener('click', function (event) {
    let obj = document.getElementById('image_article');

    if (show_more.getAttribute("class") === "close") {
        catNum = 7;
        // 이미지 지우기
        for (let i = 0; i < obj.children.length; i++) {
            if (obj.children[i].getAttribute("class") === "show_img") {
                console.log("1");
                for (cnt; cnt >= 2; cnt--) {
                    console.log("cnt: " + cnt);
                    obj.children[childNum + 1].remove();
                    childNum--;
                }
                break;
            }
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
            // 이미지 삽입할 위치 탐색
            cnt = 0;
            for (let i = 0; i < obj.children.length; i++) {
                if (obj.children[i].getAttribute("class") === "show_img") {
                    childNum = i;
                    cnt++;

                }
            }
            let newElement = document.createElement('ul');
            newElement.setAttribute("class", "show_img");
            for (let j = 0; j < 3; j++) {
                // 파일이 없으면
                if (fileFind() === false) {
                    // show_more.style.visibility = "hidden";
                    show_more.setAttribute("class", "close");
                    show_more.innerText = "CLOSE";
                    newElement.style.width = obj.children[childNum].offsetWidth + 'px';
                    console.log(obj.children[childNum].offsetWidth);
                } else {
                    // 사진을 3개씩 묶어서 리스트로 만듧
                    let newChild = document.createElement('li');
                    let aChild = document.createElement('a');
                    let imgChild = document.createElement('img');
                    imgChild.src = `../img/cat${catNum}.jpg`;
                    imgChild.alt = "귀여운 고양이 사진";
                    aChild.href = `../img/cat${catNum}.jpg`;
                    aChild.setAttribute("download", "");
                    catNum += 1;
                    aChild.appendChild(imgChild);
                    newChild.appendChild(aChild);
                    newElement.appendChild(newChild);
                }
            }
            // 리스트 등록 및 sub 창 위치 변경
            obj.insertBefore(newElement, obj.children[childNum + 1]);

        }
    }
    mainHeight = document.querySelector('main').offsetHeight;
    subs_div.style.top = mainHeight - 320 + 'px';

    window.scrollTo({top: obj.children[childNum].offsetTop, behavior: "smooth"});
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