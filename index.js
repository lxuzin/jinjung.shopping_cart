async function loadFruitData(){
    const response = await axios.get('./data.json');
    const data = response.data;
    localStorage.setItem('fruitData', JSON.stringify(data));
    
    const cartData = localStorage.getItem('cart');

    if(!cartData){
        localStorage.setItem('cart', JSON.stringify([]));
    } 
}

function renderData(){
    const data = JSON.parse(localStorage.getItem('fruitData'));
    
    const itemList = document.querySelector('#item-list');
    
    data.forEach(e => {
      
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.id = e.id;

        const imageDiv = document.createElement('div');
        imageDiv.className = 'image';

        const img = document.createElement('img');
        img.src = `./image/${e.image}`;
        img.width = 200;
        img.height = 200;
        imageDiv.appendChild(img);

        const contentDiv = document.createElement('div');

        const nameP = document.createElement('p');
        nameP.className = 'item-name';
        nameP.textContent = e.name;

        const priceP = document.createElement('p');
        priceP.className = 'item-price';
        priceP.textContent = `${e.price}원`;

        const contentP = document.createElement('p');
        contentP.className = 'item-content';
        contentP.textContent = e.content;

        
        contentDiv.appendChild(nameP);
        // contentDiv.appendChild(contentP);
        contentDiv.appendChild(priceP);
        
        itemDiv.appendChild(imageDiv);
        itemDiv.appendChild(contentDiv);
        
        itemDiv.addEventListener('click', handleClick)

        itemList.appendChild(itemDiv);
    });
}

function handleClick(e) {
    const clickedId = e.currentTarget.id;
    
    const data = JSON.parse(localStorage.getItem('fruitData'));

    localStorage.setItem("clickedItem", JSON.stringify(data.filter(e=> e.id == clickedId)[0]));
    window.location.href = "./detail.html"


}

loadFruitData()
.then(renderData)
