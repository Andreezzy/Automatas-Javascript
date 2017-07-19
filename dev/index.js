class Cliente {
	constructor(text) {
		this.text = text;
		this.productos = [
							{name:"Leche",precio:3.10},
							{name:"Aceite",precio:4.60},
							{name:"Azucar",precio:5.60}
						];
		this.carrito = [];
	}
	buscarLetra(Objetivo, Entrada) {
		for(var i = 0; i < Objetivo.length; i++) {
			if (Objetivo[i] != Entrada[i]) {
				return i;
			}
		}
		return true;
	}
	buscarProducto(producto){
		for (var i = 0; i < this.productos.length; i++) {
			if(producto == this.productos[i].name){
				return true;
			}
		}
		return false;
	}
	precioProducto(producto){
		for (var i = 0; i < this.productos.length; i++) {
			if(producto == this.productos[i].name){
				return this.productos[i].precio;
			}
		}
	}
	pagarProductos(){
		var total = 0;
		for (var i = 0; i < this.carrito.length; i++) {
			total+=this.precioProducto(this.carrito[i]);
		}
		return total;
	}
	vaciarCarrito(){
		this.carrito = [];
	}
	lexico(){
		var regExp = /^[A-Za-z0-9;:]+$/;
  		return (regExp.test(this.text));
	}
	sintactico(){
		var c = 0;
		var estado = 0;
		var simbolo;
		var error = false;
		var busqueda;
		while(c < this.text.length){
			if(estado == 0) {
				console.log("----------------------------------");
				console.log("ESTADO 0");
				simbolo = this.text.slice(0,13);
				console.log("Simbolo0 => ",simbolo);
				busqueda = this.buscarLetra("EntrarTienda;",simbolo)
				if(busqueda === true) {
					estado = 1;
					c+=12;
				}else{
					console.log("----------------------------------");
					console.log("Error en estado 0");
					error = true;
					break;
				}
			}else if(estado == 1){
				console.log("----------------------------------");
				console.log("ESTADO 1");
				simbolo = this.text.slice(c);
				console.log("Simbolo1 => ",simbolo);
				var i = 0;
				var sub = "";
				while(i <= simbolo.length - 1){
					sub+=simbolo[i];
					i++;
					if (simbolo[i] == ";") {
						sub+=simbolo[i];
						break;
					}
				}
				console.log("VALOR DE SUB: ",sub);

				var producto;
				var sentence;
				
				sentence = sub.slice(0,sub.indexOf(":")+1);
				console.log("VALOR DE SENTENCIA: ",sentence);
				
				var busquedaSentencia = this.buscarLetra("AgregarProducto:",sentence);
				var busquedaSentencia2 = this.buscarLetra("MirarProducto:",sentence);

				if(busquedaSentencia === true) {
					producto = sub.slice(sub.indexOf(":")+1,sub.length - 1);
					console.log("VALOR DE PRODUCTO: ",producto);
					busqueda = this.buscarProducto(producto);
					if (busqueda) {
						this.carrito.push(producto);
						console.log("----------------------------------");
						console.log("PRODUCTO AGREGADO: ",producto);
						console.log("PASAMOS AL ESTADO 2");
						console.log("ESTADO CARRITO: ", this.carrito);
						estado = 2;
						c+=sub.length-1;
					}else{
						console.log("----------------------------------");
						console.error("ERROR: No se encontro producto");
						console.info("No se encontro el producto: ",producto);
						error = true;
						break;
					}
				}else if(busquedaSentencia2 === true){
					producto = sub.slice(sub.indexOf(":")+1,sub.length - 1);
					console.log("VALOR DE PRODUCTO: ",producto);
					busqueda = this.buscarProducto(producto);
					if (busqueda) {
						console.log("----------------------------------");
						console.log("PRODUCTO VISTO: ",producto);
						console.log("PRECIO: ", this.precioProducto(producto));
						console.log("PASAMOS AL ESTADO 3");
						estado = 3;
						c+=sub.length-1;
					}else{
						console.log("----------------------------------");
						console.error("ERROR: No se encontro producto");
						console.info("No se encontro el producto: ",producto);
						error = true;
						break;
					}
					
				}else{
					console.log("----------------------------------");
					console.error("Error en estado 1");
					error = true;
					break;
				}
			}else if(estado == 2) {
				console.log("----------------------------------");
				console.log("ESTADO 2");
				simbolo = this.text.slice(c);
				console.log("Simbolo2 => ",simbolo);
				var i = 0;
				var sub = "";
				while(i <= simbolo.length - 1){
					sub+=simbolo[i];
					i++;
					if (simbolo[i] == ";") {
						sub+=simbolo[i];
						break;
					}
				}
				console.log("VALOR DE SUB: ",sub);

				var producto;
				var sentence;
				
				sentence = sub.slice(0,sub.indexOf(":")+1);
				console.log("VALOR DE SENTENCIA: ",sentence);
				
				var busquedaSentencia = this.buscarLetra("AgregarProducto:",sentence);
				var busquedaSentencia2 = this.buscarLetra("VaACaja;",sub);

				if(busquedaSentencia === true) {
					producto = sub.slice(sub.indexOf(":")+1,sub.length - 1);
					console.log("VALOR DE PRODUCTO: ",producto);
					busqueda = this.buscarProducto(producto);
					if (busqueda) {
						this.carrito.push(producto);
						console.log("----------------------------------");
						console.log("PRODUCTO AGREGADO: ",producto);
						console.log("PASAMOS AL ESTADO 2");
						console.log("ESTADO CARRITO: ", this.carrito);
						estado = 2;
						c+=sub.length-1;
					}else{
						console.log("----------------------------------");
						console.error("ERROR: No se encontro producto");
						console.info("No se encontro el producto: ",producto);
						error = true;
						break;
					}
				}else if(busquedaSentencia2 === true){
					console.log("----------------------------------");
					console.log("YENDO A CAJA....!");
						estado = 4;
						c+=sub.length-1;
				}else{
					console.log("----------------------------------");
					console.error("Error en estado 2");
					error = true;
					break;
				}
			}else if(estado == 3){
				console.log("----------------------------------");
				console.log("ESTADO 3");
				simbolo = this.text.slice(c);
				console.log("Simbolo3 => ",simbolo);
				var i = 0;
				var sub = "";
				while(i <= simbolo.length - 1){
					sub+=simbolo[i];
					i++;
					if (simbolo[i] == ";") {
						sub+=simbolo[i];
						break;
					}
				}
				console.log("VALOR DE SUB: ",sub);

				var producto;
				var sentence;
				
				sentence = sub.slice(0,sub.indexOf(":")+1);
				console.log("VALOR DE SENTENCIA: ",sentence);
				
				var busquedaSentencia = this.buscarLetra("AgregarProducto:",sentence);
				var busquedaSentencia2 = this.buscarLetra("MirarProducto:",sentence);
				var busquedaSentencia3 = this.buscarLetra("SalirTienda;",sub);

				if(busquedaSentencia === true) {
					producto = sub.slice(sub.indexOf(":")+1,sub.length - 1);
					console.log("VALOR DE PRODUCTO: ",producto);
					busqueda = this.buscarProducto(producto);
					if (busqueda) {
						this.carrito.push(producto);
						console.log("----------------------------------");
						console.log("PRODUCTO AGREGADO: ",producto);
						console.log("PASAMOS AL ESTADO 2");
						console.log("ESTADO CARRITO: ", this.carrito);
						estado = 2;
						c+=sub.length-1;
					}else{
						console.log("----------------------------------");
						console.error("ERROR: No se encontro producto");
						console.info("No se encontro el producto: ",producto);
						error = true;
						break;
					}
				}else if(busquedaSentencia2 === true){
					producto = sub.slice(sub.indexOf(":")+1,sub.length - 1);
					console.log("VALOR DE PRODUCTO: ",producto);
					busqueda = this.buscarProducto(producto);
					if (busqueda) {
						console.log("----------------------------------");
						console.log("PRODUCTO VISTO: ",producto);
						console.log("PRECIO: ", this.precioProducto(producto));
						console.log("PASAMOS AL ESTADO 3");
						estado = 3;
						c+=sub.length-1;	
					}else{
						console.log("----------------------------------");
						console.error("ERROR: No se encontro producto");
						console.info("No se encontro el producto: ",producto);
						error = true;
						break;
					}
				}else if(busquedaSentencia3 === true){
					console.log("----------------------------------");
					console.log("SALIENDO DE LA TIENDA");
					console.log("PASAMOS AL ESTADO 7");
					console.log("----------------------------------");
					estado = 7;
					c+=sub.length-2;
					
				}else{
					console.log("----------------------------------");
					console.error("Error en estado 1");
					error = true;
					break;
				}
			}else if(estado == 4){
				console.log("----------------------------------");
				console.log("ESTADO 4");
				simbolo = this.text.slice(c);
				console.log("Simbolo4 => ",simbolo);
				var i = 0;
				var sub = "";
				while(i <= simbolo.length - 1){
					sub+=simbolo[i];
					i++;
					if (simbolo[i] == ";") {
						sub+=simbolo[i];
						break;
					}
				}
				console.log("VALOR DE SUB: ",sub);

				var producto;
				var sentence;
				
				sentence = sub.slice(0,sub.indexOf(":")+1);
				console.log("VALOR DE SENTENCIA: ",sentence);
				
				var busquedaSentencia = this.buscarLetra("CancelarCompra;",sub);
				var busquedaSentencia2 = this.buscarLetra("PagoTarjeta;",sub);
				var busquedaSentencia3 = this.buscarLetra("PagoEfectivo;",sub);

				if(busquedaSentencia === true) {
					console.log("----------------------------------");
					console.log("CANCELANDO COMPRA....");
					console.log("PASAMOS AL ESTADO 3");
					this.vaciarCarrito();
					console.log("ESTADO CARRITO: ", this.carrito);
					estado = 3;
					c+=sub.length-1;
				}else if(busquedaSentencia2 === true){
					console.log("----------------------------------");
					console.log("PAGANDO CON TARJETA");
					console.log("Precio total: ", this.pagarProductos());
					console.log("PASAMOS AL ESTADO 5");
					estado = 5;
					c+=sub.length-1;
				}else if(busquedaSentencia3 === true){
					console.log("----------------------------------");
					console.log("PAGANDO CON EFECTIVO");
					console.log("Precio total: ", this.pagarProductos());
					console.log("PASAMOS AL ESTADO 6");
					estado = 6;
					c+=sub.length-1;
				}else{
					console.log("----------------------------------");
					console.error("Error en estado 1");
					error = true;
					break;
				}
			}else if(estado == 5){
				console.log("----------------------------------");
				console.log("ESTADO 5");
				simbolo = this.text.slice(c);
				console.log("Simbolo5 => ",simbolo);
				var i = 0;
				var sub = "";
				while(i <= simbolo.length - 1){
					sub+=simbolo[i];
					i++;
					if (simbolo[i] == ";") {
						sub+=simbolo[i];
						break;
					}
				}
				console.log("VALOR DE SUB: ",sub);

				var sentence;
				
				console.log("VALOR DE SENTENCIA: ",sub);
				
				var busquedaSentencia = this.buscarLetra("SalirTienda;",sub);

				if(busquedaSentencia === true) {
					console.log("----------------------------------");
					console.log("SALIENDO DE LA TIENDA....");
					console.log("PASAMOS AL ESTADO 7");
					estado = 7;
					c+=sub.length-2;
				}else{
					console.log("----------------------------------");
					console.error("Error en estado 1");
					error = true;
					break;
				}
			}else if(estado == 6){
				console.log("----------------------------------");
				console.log("ESTADO 6");
				simbolo = this.text.slice(c);
				console.log("Simbolo6 => ",simbolo);
				var i = 0;
				var sub = "";
				while(i <= simbolo.length - 1){
					sub+=simbolo[i];
					i++;
					if (simbolo[i] == ";") {
						sub+=simbolo[i];
						break;
					}
				}
				console.log("VALOR DE SUB: ",sub);

				var sentence;
				
				console.log("VALOR DE SENTENCIA: ",sub);
				
				var busquedaSentencia = this.buscarLetra("SalirTienda;",sub);

				if(busquedaSentencia === true) {
					console.log("----------------------------------");
					console.log("SALIENDO DE LA TIENDA....");
					console.log("PASAMOS AL ESTADO 7");
					estado = 7;
					c+=sub.length-2;
				}else{
					console.log("----------------------------------");
					console.error("Error en estado 6");
					error = true;
					break;
				}
			}else if(estado == 7 && error == false){
				console.log("----------------------------------");
				console.log("ESTADO 7");
				console.info("[OK] Analisis sintactico");
			}else{
				console.log("----------------------------------");
				console.error("Error en estado 7");
				error = true;
			}
			c++;
		}
		if (error == true) {
			console.log("Error Sintactico en linea: ", busqueda+c, ", en caracter: ", this.text[busqueda+c]);
		}
		return !error
	}
	ejecutar(){
		if (this.lexico() == true) {
			console.info("[OK] Analisis Lexico");
			if (this.sintactico() == true) {
				console.info("CADENA => ",this.text);
				console.info("RECONOCIDA");
			}
		}else{
			console.error("ERROR LEXICO");
			console.info("CADENA => ",this.text);
			console.error("NO RECONOCIDA...");
		}
	}
}

let a = new Cliente("EntrarTienda;AgregarProducto:Leche;VaACaja;CancelarCompra;AgregarProducto:Leche;VaACaja;PagoTarjeta;SalirTienda;")

console.log(a.ejecutar());