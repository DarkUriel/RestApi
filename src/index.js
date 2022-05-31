const express = require('express');
const app = express();
const cors = require('cors');
//Settings
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(express.json());

//Routes
app.use(require('./routes/order'));
app.use(require('./routes/customer'));
app.use(require('./routes/sale'));
app.use(require('./routes/saledetail'));
app.use(require('./routes/tmp'));
app.use(require('./routes/login'));
app.use(require('./routes/email'));

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
