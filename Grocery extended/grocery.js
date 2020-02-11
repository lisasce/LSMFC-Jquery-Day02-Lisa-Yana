var grocery = JSON.parse(grocery);
var caddyArray = [];
var total = 0;
var statusArray = [];

for (let i=0; i < grocery.length; i++){
status = Math.floor(Math.random() * 26);
statusArray[i] = status;
	var img = ` <div id="div${i}" class="item">
					<img class="images" id="image${i}" src="${grocery[i].img}">
					<ul>
						<li>Price/pc: <br> ${grocery[i].currency} ${grocery[i].price}</li> 
						<li>order as much you want!</li>
					</ul>
					<p  id="p${i}">${grocery[i].name} - Stock: ${status} pcs</p>
					<button class="addBtn" id="productAdd${i}">Add</button>
				</div>
				`;

	$("#content").append(img);



	if (status <= 6){
		$("#div"+i).css("background-color", "#EE6352");
		$("#div"+i+ " li:nth-of-type(2)").text("nearly out of stock!")
	}
	else if (status <= 12){
		$("#p"+i).parent().css("background-color", "#FAC05E");
		$("#div"+i+ " li:nth-of-type(2)").text("order fast before we get out of stock!")
	}


	if(status == 0){
		continue;
	}
	$("#productAdd"+i).click(addProductCont);


	function addProductCont(){


		for (j in caddyArray){
			if (caddyArray[j].name === grocery[i].name){
				if(caddyArray[i].qty == statusArray[i]){
					return;
				}
				caddyArray[j].qty += 1;
				$("#qtySpan"+i).text(caddyArray[j].qty);
				calcTotal(caddyArray[i].price, 1);
				return;
			}
		}

		caddyArray[i]= {"name": grocery[i].name, "price":grocery[i].price, "qty": 1};
		console.table(caddyArray);
		var data = `
		<div class="products">
			<div>
				<img width=100% height=auto class="smallImg" src="${grocery[i].img}">
			</div> 
			<div>${grocery[i].name}</div> 
			<div>EUR: ${grocery[i].price} /pcs</div>
			<div>
				<span id="qtySpan${i}">1</span>
				<button id="plusBtn${i}">➕</button>
				<button id="minusBtn${i}">➖</button>
			</div>
			<hr> 
		</div> 
		`;
		console.log(caddyArray);

		$("#productList").append(data);
		calcTotal(caddyArray[i].price, 1);

		$("#plusBtn"+i).click(function(){
			if(caddyArray[i].qty == statusArray[i]){
				return;
			}
			caddyArray[i].qty += 1;
			$("#qtySpan"+i).text(caddyArray[i].qty);
			calcTotal(caddyArray[i].price, 1);
		});

		$("#minusBtn"+i).click(function(){
			caddyArray[i].qty -= 1;
			$("#qtySpan"+i).text(caddyArray[i].qty);
			calcTotal(caddyArray[i].price, -1);
			if (caddyArray[i].qty === 0){
				var divTOdelete = (this.parentElement.parentElement);
				divTOdelete.remove();
				caddyArray.splice(i, 1);
			}
		});

	};


}


$("#closebtn").click(function(){
	$("#caddyContent").toggle();
});

$("#caddy").click(function(){
	$("#caddyContent").css("display","block");
});


$("#emptybtn").click(function(){
	caddyArray = [];
	$("#productList").empty();

});


function calcTotal(price, qty){
	total += price * qty;
	$("#total").text(total.toFixed(2));
}

