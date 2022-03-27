const express = require('express');
const cors = require('cors');
const path = require('path');

class Server {

    constructor() {

        this.port = process.env.PORT || 8080;
        this.app = express();
        this.middleware();
        this.routes();

    }

    middleware() {

        // CORS
        this.app.use(cors());

        // Directorio público
        this.app.use(express.static(path.join(__dirname, './public')));

        // Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true })); // parses application/x-www-form-urlencoded
        // this.app.use( formidableMiddleware() ); // Permite coger los datos de un form data https://www.npmjs.com/package/express-formidable

    }

    routes() {

        this.app.get('/*', function (req, res) {

            res.sendFile(path.join(__dirname, '../public/index.html'), function (err) {

                if (err) {

                    res.status(500).send(err);

                }

            });

        });

    }

    listen() {

        this.app.listen(this.port, () => {

            console.log(`Servidor corriendo en puerto ${this.port}`);

        });

    }

}

module.exports = Server;