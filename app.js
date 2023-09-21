const shoppingCart = [];
const cartElement = document.querySelector('.cart');
  cartElement.innerHTML=`<div class="my-4">
  <hr class="my-4"><p class="font-bold inline">Total Price: <span class="font-bold text-[#11111180]">00.00TK</span></p><br>
  <p class="font-bold inline">Discount: <span class="font-bold text-[#11111180]">00.00TK</span> </p><br>
  <p class="font-bold inline">Total: <span class="font-bold text-[#11111180]">00.00TK</span></p><br> <hr class="my-4"> 
  </div>
  `;
 
  
data.forEach((element, i) => {
  const cardDiv = document.querySelector('.cardDiv');
  cardDiv.classList.add('grid','lg:grid-cols-3','md:grid-cols-2', 'gap-4', 'p-8')
  const card = document.createElement('div');
  
const cardContainer = document.querySelector('cardContainer');


card.classList.add('card', 'card-compact', 'w-auto', 'bg-base-100', 'shadow-xl');

  const movieCard = `
<figure class="h-40 bg-gray-200">${element.image}</figure>
<div class="card-body grid justify-center ">
 
  <div class="rating " onclick='event.stopPropagation()'>
  <input type="radio" name="rating-${i}" class="mask mask-star-2 bg-orange-400" checked/>
  <input type="radio" name="rating-${i}" class="mask mask-star-2 bg-orange-400"  />
  <input type="radio" name="rating-${i}" class="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-${i}" class="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-${i}" class="mask mask-star-2 bg-orange-400"  />
</div>
<h2 class="font-extrabold text-center">${element.title}</h2>
<p class="text-center font-bold">${element.description}</p>
</div>
`


  
  card.innerHTML = movieCard;
  card.addEventListener('click',function(){
    shoppingCart.push(data[i]);
      
        updateCartUI();
        const purchaseBtn = document.querySelector("#PurchaseBtn");

if (shoppingCart.length > 0) {
  purchaseBtn.removeAttribute("disabled"); 
} else {
  purchaseBtn.setAttribute("disabled", true); 
}

const discountBtn = document.querySelector("#discount-btn");
const cuponKart = document.querySelector(".cupon")

if (shoppingCart.length > 0 &&  calculation()>=200) {
  discountBtn.removeAttribute("disabled");  
  cuponKart.removeAttribute('disabled');
} else {
  discountBtn.setAttribute("disabled", true); 
  cuponKart.setAttribute("disabled",true);
}

    
        
})

if (i === 0 || i == 3 || i==6) {
    const h1 = document.createElement('div');
    if(i==0){
      h1.textContent =heading[0]
    }else if(i==3){
      h1.textContent= heading[1];
    }else{
      h1.textContent = heading[2];
    }
    
    h1.classList.add('text-xl','md:col-span-2','font-bold','lg:col-span-3');
    cardDiv.appendChild(h1);
  }
  cardDiv.appendChild(card);
 
 
  
});

function discount(){

    const cupon = document.querySelector('.cupon').value;
    const cartElement = document.querySelector('.cart');
   
    if('SELL200'===cupon){
     
      let total = calculation();
      let temptotal = (total*0.20).toFixed(2);
      total -=temptotal; 
      return temptotal;
    

    }
    return 0;
}

function updateCartUI() {
  console.log()
  const cartElement = document.querySelector('.cart');
  
  let items = 0;
  cartElement.innerHTML = '';
  shoppingCart.forEach((item, index) => {
      
      const cartItem = document.createElement('div');
      cartItem.innerHTML = `<p class="font-bold ">${++items}. ${item.title}</p>`;
      cartElement.appendChild(cartItem);
  });
  const total = parseFloat(calculation());
  const disct = parseFloat(discount());
  cartElement.innerHTML+=`<div class="my-4"><hr class="my-4"><p class="font-bold inline">Total Price: </p><span class="font-bold text-[#11111180]">${total}TK</span><br>
  <p class="font-bold inline">Discount: </p><span class="font-bold text-[#11111180]">${disct}TK</span><br>
  <p class="font-bold inline">Total: </p><span class="font-bold text-[#11111180]">${(total-disct).toFixed(2)}TK</span><br><hr class="my-4"></div>  
  `;
  
}

function calculation(){

  let total = 0;
  shoppingCart.forEach((item, index) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = item.description;
      const spanValue = parseFloat(tempDiv.querySelector('span').innerText);
      total+= spanValue;

      

    });
   
    return total.toFixed(2);

} 


