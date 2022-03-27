const express = require('express');
const cors = require('cors');
const path = require('path');
const winston = require('winston')

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

        this.app.get('/quirosMedia', (req, res) => {

            console.log(path.join(__dirname, './public/quirosMedia.html'))
            res.sendFile(path.join(__dirname, './public/quirosMedia.html'), function (err) {

                if (err) {

                    winston.log('info', err);
                    res.status(500).send(err);

                }

            });
        });

        this.app.get('/noticias', (req, res) => {

            console.log(path.join(__dirname, './public/noticias.html'))
            res.sendFile(path.join(__dirname, './public/noticias.html'), function (err) {

                if (err) {

                    winston.log('info', '-------Hello log files!------------', {
                        someKey: 'some-value'
                    });
                    res.status(500).send(err);

                }

            });
        });


        this.app.get('/galeria', (req, res) => {

            console.log(path.join(__dirname, './public/galeria.html'))
            res.sendFile(path.join(__dirname, './public/galeria.html'), function (err) {

                if (err) {

                    winston.log('info', '-------Hello log files!------------', {
                        someKey: 'some-value'
                    });
                    res.status(500).send(err);

                }

            });
        });

        this.app.get('/biografia', (req, res) => {
            res.sendFile(path.join(__dirname, './public/biografia.html'), function (err) {

                if (err) {

                    winston.log('info', '-------Hello log files!------------', {
                        someKey: 'some-value'
                    });
                    res.status(500).send(err);

                }

            });
        });

        this.app.get('/*', function (req, res) {

            res.sendFile(path.join(__dirname, './public/index.html'), function (err) {

                if (err) {

                    winston.log('info', '-------Hello log files!------------', {
                        someKey: 'some-value'
                    });
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