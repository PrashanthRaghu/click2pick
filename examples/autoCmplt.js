  var productName = "";
  var productInfo = {};
  
  $(function() {
	
	var count = 0;
	  
    var availableTags = [
      "Nexus 4",
      "Nexus 5",
      "Nexus 7",
      "Samsung Galaxy S4",
      "Samsung Galaxy S3",
      "Samsung Galaxy S2",
      "Samsung Galaxy Tablet",
      "Lenovo Touch",
      "Acer Iconia Tablet",
      "iPod touch",
      "iPad 16GB",
      "iPad 32GB",
      "iPhone 4s",
      "iPhone 5",
      "iPhone 5c",
      "microsoft xbox 360"
    ];
    
    $( "#product" ).autocomplete({
      source: availableTags,
      
      select:function(event , ui){
		   productName = "" + ui.item.value;
		    
		   $("#loading").html("Loading results from Amazon ");
		   $("#productName").html("What you might end up paying for " + productName );
		  
		  enterProduct = true;
		  
			 $.ajax({
			  url:'/amazon/price.php?hello='+productName+'&locale=com',
			  type:'POST',
			  success:function(data){
				count += 1;
				if(count == 3){
					$.fn.fullpage.moveTo('firstPage', 1);
					$("#loading").html(" ");
				}  
				data = $.parseJSON(data.replace(/\\/g, ''));
				$('#usresult').html( "$" + data.price + "<br/>" + "(USA)" + "<br/>" + "<button class='punch'>  Find Friends </button>");
				$("#loading").append(" USA,");
				
				productInfo.us = {}
				productInfo.us.url = data.url;
				productInfo.us.price = data.price;
				
			  },
			  error:function(err,code,data){
				console.log(err,code,data);
			  }
			});

			 $.ajax({
			  url:'/amazon/price.php?hello='+productName+'&locale=co.uk',
			  type:'POST',
			  success:function(data){
				count += 1;
				if(count == 3){
					$.fn.fullpage.moveTo('firstPage', 1);
					$("#loading").html(" ");
				}
				  
				data = $.parseJSON(data.replace(/\\/g, ''))
				$('#ukresult').html("£" + data.price + "<br/>" + "(UK)" + "<br/>" + "<button class='punch'>  Find Friends </button>");
				$("#loading").append(" UK,");
				productInfo.uk = {}
				productInfo.uk.url = data.url;
				productInfo.uk.price = data.price;
			  },
			  error:function(err,code,data){
				console.log(err,code,data);
			  }
			});

			 $.ajax({
			  url:'/amazon/price.php?hello='+productName+'&locale=cn',
			  type:'POST',
			  success:function(data){
				count += 1;
				
				if(count == 3){
					$.fn.fullpage.moveTo('firstPage', 1);
					$("#loading").html(" ");
				}  
				
				data = $.parseJSON(data.replace(/\\/g, ''))
				$('#cnresult').html("¥" + data.price + "<br/>" + "(China)" + "<br/>" + " <button class='punch'>  Find Friends </button> ");
				$("#loading").append(" China, ");
				
				productInfo.cn = {}
				productInfo.cn.url = data.url;
				productInfo.cn.price = data.price;
			  },
			  error:function(err,code,data){
				console.log(err,code,data);
			  }
			});
		
	  }
    });
  });
