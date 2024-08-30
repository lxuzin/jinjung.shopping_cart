function cartRender(){
    const cartData = JSON.parse(localStorage.getItem("cart"));
    const list = document.querySelector("#list");

    if(cartData.length === 0){
        // console.log('hi')
        const noContent = document.createElement('p');
        noContent.style.color = 'gray';
        noContent.style.fontSize = '14px';
        noContent.textContent = '장바구니가 비었어요 😭';

        list.appendChild(noContent);

    } else {
        cartData.forEach((e)=>{

            const div = document.createElement('div');
            div.className = "list-item";
            
            const img = document.createElement('img');
            img.src = `./image/${e[0].image}`;
            img.style.width = '150px';
            img.style.height = '150px';
    
            const divForText = document.createElement('div');
            divForText.className= "text";
    
            const h3 = document.createElement('h3');
            h3.textContent = e[0].name;
            h3.addEventListener('click', ()=>{
                localStorage.setItem('clickedItem', JSON.stringify(e[0]));
                window.location.href = "./detail.html";
            })
    
            const p = document.createElement('p');
            p.textContent = e[0].content;
    
            const divForActions = document.createElement("div");
            divForActions.className = "actions";
    
            const input = document.createElement('input');
            input.defaultValue = e[1];
            input.type = 'number';
            input.min = 1;
            input.id = e[0].id;
    
            const button = document.createElement('button');
            button.textContent = '수량 변경';
    
            button.addEventListener('click', function() {
                const newQuantity = parseInt(input.value); // 새로운 수량 가져오기
                list.innerHTML = '';
                const title = document.createElement('h3');
                title.textContent = '장바구니'
                list.appendChild(title);
                updateQuantity(e[0].id, newQuantity); // 수량 업데이트 함수 호출
            });
            
            const button2 = document.createElement('button');
            button2.textContent = '삭제';
    
            button2.addEventListener('click', ()=>{
                const updatedCartData = cartData.filter(c => c.id === e[0].id);
        
                // 업데이트된 장바구니 데이터를 로컬 스토리지에 저장
                localStorage.setItem('cart', JSON.stringify(updatedCartData));
                
                list.innerHTML = '';
                const title = document.createElement('h3');
                title.textContent = '장바구니'
                list.appendChild(title);
                cartRender();
            })
    
            divForActions.appendChild(input);
            divForActions.appendChild(button);
            divForActions.appendChild(button2);
            
            const p2 = document.createElement('p');
            p2.textContent = e[0].price * e[1] + '원';
    
            divForText.appendChild(h3);
            divForText.appendChild(p);
            divForText.appendChild(divForActions);
            divForText.appendChild(p2);
    
            div.appendChild(img);
            div.appendChild(divForText);
    
            list.appendChild(div);
        })
    }
    

    
}

function updateQuantity(id, newQuantity) {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const itemToUpdate = cartData.find(e => e[0].id === id);

    if (itemToUpdate) {
        itemToUpdate[1] = newQuantity;

        localStorage.setItem('cart', JSON.stringify(cartData));
        // alert('수량이 변경되었습니다.');
        cartRender(); // 화면을 갱신하여 변경사항 반영
    }
}

cartRender();
