const http = require("http");
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs')

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'nodelogin'
});
const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')));
app.use(morgan('dev'))
app.set('port', process.env.PORT || 4300);



app.post('/auth', function (request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?',
			[username, password], function (error, results, fields) {
				// If there is an issue with the query, output the error
				if (error) throw error;
				// If the account exists
				if (results.length > 0) {

					// Authenticate the user
					request.session.loggedin = true;
					request.session.username = username;

					// Redirect to home page
					response.redirect('/home');

				} else {
					response.redirect('/');
				}
				response.end();

			});
	} else {
		response.send('Please enter Username and Password!');
		response.end();

	}

});

app.post('/newForm', async function (request, response) {
	const body = request.body;
	let customer = body.customer;
	carrier = body.carrier;
	volume = body.volume;
	rawMaterial = body.rawMaterial;
	etc = body.etc;
	let dott;
	const query = (connection, queryFst, argsFst, queryScd) => {
		return new Promise((resolve, reject) => {
		  connection.query(queryFst, argsFst, (err, res) => {
			if (err) reject  (err);
			
			if(err === null){
				dott = res.insertId;
				connection.query(queryScd, [customer, carrier, dott], (err, res) => {
					if (err) reject  (err);
					resolve(res)
			  });}
		  });
		});
	  };

	  try {
		await query(
		  connection,
		  "INSERT INTO `nodelogin`.`newForm` ( `Заказчик`, `Перевозчик`, `Объем`, `Сырье`, `и тд.`) VALUES (?, ?, ?, ?, ?); ",
		  [customer, carrier, volume, rawMaterial, etc],
		  "INSERT INTO cars (`Заказчик`, `Перевозчик`, `orderId`) VALUES (?, ?, ?)"
		);
	  } catch (error) {
	 console.log(error)
	  }

	response.redirect('/home');
})



app.post("/update", async function (request, response) {
  const body = request.body;
  let dott = body.changerId;
  let customer = body.changeCustomer;
  carrier = body.changeCarrier;
  volume = body.changeVolume;
  rawMaterial = body.changeRawMaterial;
  etc = body.changeEtc;
  const query = (connection, query, args) => {
    return new Promise((resolve, reject) => {
      connection.query(query, args, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  };

  try {
    await query(
      connection,
      "UPDATE newForm SET `Заказчик` = ?, `Перевозчик` = ?, `Объем` = ?, `Сырье` = ?, `и тд.` = ? WHERE id = ?",
      [customer, carrier, volume, rawMaterial, etc, dott]
    );
  } catch (error) {
 console.log(error)
  }

  response.redirect("/home");
});

app.post('/delete', async function (request, response) {
	let dott = request.body.deleteOrder;
	
	connection.query("DELETE FROM `cars` WHERE `cars`.`orderId` = ?", [dott], async function (err, result, fields) {
		if (err) throw err;
		
	})
	connection.query(" DELETE FROM newForm WHERE `newForm`.`id` = ?", [dott], async function (err, result, fields) {
		if (err) throw err;
	})
	
	response.redirect('/home')

})

app.post('/deleteCar', async function (request, response) {
	const body = request.body;
	let dott = body.deleteCar;
	let carId=body.carOrderId;
	
		connection.query("DELETE FROM cars WHERE `id` = ? ", [dott], async function (err, result, fields) {
			if (err) throw err;
		})
		 if(carId === 'undefined'){
			response.redirect('/home')
		 } else {
			response.redirect(`/carList?carList=${carId}`)
		 }
		
			
	
		
		
	});

app.post('/addCar', async function (request, response) {
	response.statusCode = 200;
	const body = request.body;
	let carId = body.carId;
	let carNumber = body.carNumber;
	let carVolume = body.carVolume;
	let carCustomer;
	let carCarier;
		const query = (connection, queryFst, argsFst, queryScd) => {
			return new Promise((resolve, reject) => {
			  connection.query(queryFst, argsFst, (err, res) => {
				if (err) reject  (err);
				if(err === null){
					carCustomer = res[0]['Заказчик'];
					carCarier = res[0][`Перевозчик`];
				
					connection.query(queryScd, [carCustomer,carCarier, carNumber, carVolume, carId], (err, res) => {
						if (err) reject  (err);
						resolve(res);
				  });
				}
			  });
			});
		  };
	
		  try {
			await query(
			  connection,
			  "SELECT  `Заказчик`, `Перевозчик` FROM `cars` WHERE `Объем, м3` = 0 AND `orderId` = ?",
			  [carId],
			  "INSERT INTO cars (`Заказчик`, `Перевозчик`,`Номер машины`, `Объем, м3`, `orderId`) VALUES (?, ?, ?, ?, ?)",
			  [carCustomer,carCarier, carNumber, carVolume, carId]
			);
		  } catch (error) {
		 console.log(error)
		  }
		
			
		
		response.redirect(`/carList?carList=${carId}`)
});

app.post('/moveCars', async function (request, response) {
	response.statusCode = 200;
	let dott =request.body.carId;
	connection.query(
		'UPDATE cars SET `onObject` = 0 WHERE id = ?',
		[dott],
		function (error, results) {
			if (error) throw error;
		}
		
	)
	response.end()
});

app.post('/moveCarsBack', async function (request, response) {
	response.statusCode = 200;
	let dott =request.body.carId;
	connection.query(
		'UPDATE cars SET `onObject` = 1 WHERE id = ?',
		[dott],
		function (error, results) {
			if (error) throw error;
		}
		
	)
	response.end()
});

app.get('/', function (request, response) {
	// Render login template	
	response.sendFile(path.join(__dirname + '/Index/login.html'));

});

app.get('/home', function (request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/Index/home.html'))
	} else {
		// Not logged in
		response.redirect('/');;
	}
})

app.get('/admin', function (request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/Index/admin.html'));
	} else {
		// Not logged in
		response.redirect('/');
	}
});

app.get('/newForm', function (request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/Index/newForm.html'));
	} else {
		// Not logged in
		response.redirect('/');

	}
});

app.get('/changeForm', async function (request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/Index/changeForm.html'));
	} else {
		// Not logged in
		response.redirect('/');

	}
	
});

app.get('/carList', function (request, response) {
	if (request.session.loggedin) {
		response.statusCode =200;
		response.sendFile(path.join(__dirname + '/Index/carList.html'))
		
	} else {
		// Not logged in
		response.redirect('/');;
	}
})

app.get('/operator', function (request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/Index/operator.html'))
	} else {
		// Not logged in
		response.redirect('/');;
	}
})

app.get('/printTTN',function (request,response){
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/Index/printTTN.html'))
	} else {
		// Not logged in
		response.redirect('/');;
	}
})

app.get('/carsData',function (request,response){
	response.statusCode =200;
	response.setHeader('Content-Type', 'aplication/json')
	connection.query("SELECT * FROM cars", async function (err, result, fields) {
		if (err) throw err;
		let data = JSON.stringify(result);
		response.end(data);
	})})

app.get('/carListData', function (request, response) {
	response.statusCode =200;
	
	response.setHeader('Content-Type', 'aplication/json')
connection.query("SELECT * FROM cars", async function (err, result, fields) {
	if (err) throw err;
	let data = JSON.stringify(result);
	response.end(data);
});
})

app.post('/orderData', function(request, response){
	response.statusCode =200;
	const body = request.body;
	let dott = body.changeOrder;
	connection.query("SELECT * FROM newForm WHERE id = ?", [dott], async function (err, result, fields) {
		if (err) throw err;
		let data = JSON.stringify(result);
		response.end(data);
	});
})

app.get('/homeData', function (request,response){
	response.statusCode =200;
	connection.query("SELECT * FROM newForm", async function (err, result, fields) {
		if (err) throw err;
		let data = JSON.stringify(result);
		console.log(result);
		response.end(data);
	});
})

// app.post('/volumeChange', function(request,response){

// })


http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});

