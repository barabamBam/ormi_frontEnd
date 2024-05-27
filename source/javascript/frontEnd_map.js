var container = document.querySelector("#map"); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 지도를 클릭한 위치에 표출할 마커입니다
var marker = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다
        position: map.getCenter()
    }),
    infowindow = new kakao.maps.InfoWindow({zindex: 1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

marker.setMap(map);

// 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
function setMapType(maptype) {
    var roadmapControl = document.getElementById('btnRoadmap');
    var skyviewControl = document.getElementById('btnSkyview');
    if (maptype === 'roadmap') {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
        roadmapControl.className = 'selected_btn';
        skyviewControl.className = 'btn';
    } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
        skyviewControl.className = 'selected_btn';
        roadmapControl.className = 'btn';
    }
}

// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}

// 해당 위치에 주소 영문 표기
const addr_tag = document.querySelector('.map_addr');

// 현재 위치 표시
getLocation();

function write_location(pos) {
    searchDetailAddrFromCoords(pos, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            // var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            // detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
            //
            // var content = '<div class="bAddr">' +
            //     '<span class="title">법정동 주소정보</span>' +
            //     detailAddr +
            //     '</div>';

            // 주소 영문 변환
            let addr;
            if (result[0].road_address === null)
                addr = result[0].address.address_name;
            else
                addr = result[0].road_address.address_name;

            if (!checkSearchedWord(addr)) {
                return;
            }
            convertEnglish(addr);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            // infowindow.setContent(content);
            // infowindow.open(map, marker);
        }
    })
}

// 좌표에 해당하는 위치의 주소를 영문 변환
async function convertEnglish(addr) {
    try {
        console.log(addr);
        const response = await fetch(`https://www.juso.go.kr/addrlink/addrEngApi.do?keyword=${addr}&confmKey=devU01TX0FVVEgyMDI0MDUyMTE2MzcwMDExNDc4MjU=&resultType=json`);
        if(!response.ok) throw new Error('영문 주소를 받아올 수 없습니다.');
        // 제이슨 데이터를 자바스크립트 객체로 파싱
        const data = await response.json();
        console.log(data);
        let res = data.results.juso[0].roadAddr;
        //console.log(res);
        addr_tag.innerText = res;
    }catch(error){
        console.error(error);
        addr_tag.innerText = addr;
    }

        // fetch(`https://www.juso.go.kr/addrlink/addrEngApi.do?keyword=${addr}&confmKey=devU01TX0FVVEgyMDI0MDUyMTE2MzcwMDExNDc4MjU=&resultType=json`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         let res = data.results.juso[0].roadAddr;
        //         //console.log(res);
        //         addr_tag.innerText = res;
        //     });

};

// 현재 위치 확인 후 해당 위치로 좌표 변경
function getLocation() {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
        console.log("yes");
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        // 현재 위치를 받을 수 있으면 successCallback 실행
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            // 마커 위치를 설정합니다
            marker.setPosition(locPosition);
            // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition);
            write_location(locPosition);

        }, () => {
            // 현재 위치를 받을 수 없으면 errorCallback 실행
            // GeoLocation을 사용할 수 없을 때 기본 마커 위치를 설정합니다
            // 이미 생성한 마커를 지도 위에 표시합니다
            marker.setMap(map);
            write_location(map.getCenter());
        });
    } else {
        console.log("no");
        // GeoLocation을 사용할 수 없을 때 기본 마커 위치를 설정합니다
        // 이미 생성한 마커를 지도 위에 표시합니다
        marker.setMap(map);
        write_location(map.getCenter());
    }

}

// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
    // 마커를 클릭한 위치에 표시합니다
    marker.setPosition(mouseEvent.latLng);
    marker.setMap(map);
    write_location(mouseEvent.latLng);
});


function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 도로명주소 API 호출시 검색어에 특수문자 또는 OR, INSERT, UNION 등 SQL예약어가 포함될 경우
// 보안장비가 SQL INJECTION공격으로 간주하여 해당 IP를 차단시킬 수 있습니다.
// 사용자분들은 API호출시 검색어 필터링를 적용하여 주시기 바랍니다.

//특수문자, 특정문자열(sql예약어의 앞뒤공백포함) 제거
function checkSearchedWord(obj) {
    if (obj.length > 0) {
        //특수문자 제거
        var expText = /[%=><]/;
        if (expText.test(obj) == true) {
            alert("특수문자를 입력 할수 없습니다.");
            obj = obj.split(expText).join("");
            return false;
        }

        //특정문자열(sql예약어의 앞뒤공백포함) 제거
        var sqlArray = new Array(
            //sql 예약어
            "OR", "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC",
            "UNION", "FETCH", "DECLARE", "TRUNCATE"
        );

        var regex;
        for (var i = 0; i < sqlArray.length; i++) {
            regex = new RegExp(sqlArray[i], "gi");

            if (regex.test(obj)) {
                alert("\"" + sqlArray[i] + "\"와(과) 같은 특정문자로 검색할 수 없습니다.");
                obj = obj.replace(regex, "");
                return false;
            }
        }
    }
    return true;
}
