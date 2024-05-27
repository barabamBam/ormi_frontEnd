# ormi_frontEnd

# 호두 페이지 🐈
![video](https://github.com/st-minju/ormi_frontEnd/assets/hodu.mp4)

📝 Image 기능 설명
1. 6개의 사진이 기본으로 보여짐
2. 이후 20개까지의 사진은 저장되어있는 사진이 보여짐
3. 이때 show more 버튼을 누른 상태에서 저장되어있는 사진이 6개가 아니라면 6개에 맞춰서 고양이 api를 이용하여 사진을 가져옴
4. 2번 정도 더 고양이 api에서 사진을 불러옴 (사진은 6개씩 묶어서 한번으로 침)
5. 고양이 사진을 다 불러오면 show more 버튼이 close 버튼으로 바뀜
6. close 버튼 클릭 시 로딩된 사진이 모두 없어지고 처음에 보여진 사진 6개만 보여짐

📝 Map 기능 설명
1. 아래와 같이 위치 기능이 차단되었을 경우: 기본적으로 설정되어있는 위치가 지도에 뜨게 됨
![image](https://github.com/st-minju/ormi_frontEnd/assets/72141158/b26954b8-d254-4a6f-97b0-bb30272909f5)
![image](https://github.com/st-minju/ormi_frontEnd/assets/72141158/58d906ae-5839-45d8-8b3d-6470f581088a)

2. 아래와 같이 위치 기능이 차단되지 않았을 경우: <code>navigator.geolocation.getCurrentPositon() </code>을 통해 현재 위치가 지도에 뜨게 됨
![image](https://github.com/st-minju/ormi_frontEnd/assets/72141158/2ff64100-91bb-42e9-bc44-8ccac055e603)

📝 subscribe 창: main 태그의 크기가 변화할 때마다 top의 위치에 변화를 주어 위치 조정 -> subscribe 버튼 클릭 시 modal 창 띄움 (이 때 뒤에 overlay 창으로 블러 처리)
![image](https://github.com/st-minju/ormi_frontEnd/assets/72141158/0c2c2cb7-2578-42d6-8c82-73b2f97a0b39)

📝 header 부분의 nav 창: 창의 크기가 작아졌을 때 생김, animation 기능 추가
