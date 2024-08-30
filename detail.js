document.addEventListener('DOMContentLoaded', function() {
    // 현재 보여줄 과일의 이름 (예시: "사과")
    const fruit = JSON.parse(localStorage.getItem("clickedItem"));
    // console.log(fruit);

    if (fruit) {
        document.getElementById('fruit-image').src = `./image/${fruit.image}`;
        document.getElementById('fruit-image').alt = fruit.name;
        document.getElementById('fruit-name').textContent = fruit.name;
        document.getElementById('fruit-price').textContent = `가격: ${fruit.price.toLocaleString()}원`;
        document.getElementById('fruit-content').textContent = fruit.content;
        document.getElementById('fruit-origin').textContent = `원산지: ${fruit.origin}`;
        
    } else {
        console.error("Fruit not found");
    }
});

document.querySelector("button[type=submit]").addEventListener('click', (e)=>{
    const cartData = JSON.parse(localStorage.getItem('cart')); 
    
    // console.log(cartData)
    const fruit = JSON.parse(localStorage.getItem("clickedItem"));
    const quantity = parseInt(document.querySelector("input[type=number]").value);
    
    const existingItem = cartData.find((item) => item[0].id === fruit.id);

    if (existingItem) {
        // 기존 아이템이 있으면 수량을 더해줌
        existingItem[1] += quantity;
    } else {
        // 기존 아이템이 없으면 새로운 항목 추가
        const cartItem = [fruit, quantity];
        cartData.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cartData));
    alert('장바구니에 추가되었습니다.');
})