var grocery = JSON.parse(grocery);
var caddyArray = [];


for (let i=0; i < grocery.length; i++){
status = Math.floor(Math.random() * 26);
	var img = ` <div id="div${i}" class="item">
					<img class="images" id="image${i}" src="${grocery[i].img}">
					<ul>
						<li>Price/pc: <br> ${grocery[i].currency} ${grocery[i].price},-</li> 
						<li>order as much you want!</li>
					</ul>
					<p id="p${i}">${grocery[i].name} - Stock: ${status} pcs</p>
					<button id="productAdd${i}">Add</button>
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



	$("#productAdd"+i).click(addProductCont);

	function addProductCont(){
		caddyArray.push({"img": grocery[i].img, "name": grocery[i].name, "price":grocery[i].price});
		console.table(caddyArray);
		var data = `<div class="products">
						<div><img width=100% height=auto class="smallImg" src="${grocery[i].img}"></div> 
						<div>${caddyArray[i].name}</div> 
						<div>EUR: ${caddyArray[i].price}</div> 
					</div> <hr>`;
		console.log(data);
		$("#productList").append(data);
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


