const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('welcome to server');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vzza0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const adminCollection = client.db(process.env.DB_NAME).collection("admin");
    const serviceCollection = client.db(process.env.DB_NAME).collection("services");
    const orderCollection = client.db(process.env.DB_NAME).collection("orders");
    const reviewCollection = client.db(process.env.DB_NAME).collection("reviews");

    //add admin
    app.post('/addAdmin', (req, res) => {
        const data = req.body;
        isAdminOrNot(req.headers.user)
            .then(status => {
                if (status) {
                    adminCollection.insertOne(data)
                        .then((result) => {
                            if (result.insertedCount > 0) {
                                res.send({ status: result.insertedCount > 0 })
                            }
                            else { res.send({ statue: false }) }
                        })
                } else {
                    res.send({ message: 'unAuthorized' });
                }
            })
            .catch((err) => {
                res.send({ err })
            })
    })

    //add review
    app.post('/addReview', (req, res) => {
        const data = req.body;
        reviewCollection.insertOne(data)
            .then((result) => {
                if (result.insertedCount > 0) {
                    res.send(result.insertedCount > 0)
                }
                else { res.send(false) }
            })
            .catch((err) => {
                res.send(false)
            })
    })

    //get review
    app.get('/reviews', (req, res) => {
        reviewCollection.find({})
            .toArray((err, docs) => {
                res.send(docs)
            })
    })

    //add order
    app.post('/addOrder', (req, res) => {
        const data = req.body;
        orderCollection.insertOne(data)
            .then((result) => {
                if (result.insertedCount > 0) {
                    res.send(result.insertedCount > 0)
                }
                else { res.send(false) }
            })
            .catch(err => {
                res.send(false)
            })
    })

    //get all order
    app.get('/allOrders', (req, res) => {
        const email = req.headers.email;
        isAdminOrNot(email)
            .then(status => {
                if (status) {
                    orderCollection.find({})
                        .toArray((err, docs) => {
                            res.send(docs)
                        })
                } else {
                    res.send({ message: 'unAuthorized' });
                }
            })
            .catch((err) => {
                res.send({ err })
            })
    })

    //get all order
    app.patch('/updateOrder/:id', (req, res) => {
        const id = req.params.id;
        const email = req.headers.email;
        const statusInfo = req.headers.status;
        isAdminOrNot(email)
            .then(status => {
                if (status) {
                    orderCollection.updateOne({ _id: ObjectId(id) }, { $set: { status: statusInfo } })
                        .then((result) => {
                            if (result.modifiedCount > 0) {
                                res.send(result.modifiedCount > 0)
                            } else {
                                res.send(false)
                            }
                        })
                } else {
                    res.send({ message: 'unAuthorized' });
                }
            })
            .catch((err) => {
                res.send({ err })
            })
    })

    //get order by email
    app.get('/orders', (req, res) => {
        const email = req.headers.email;
        orderCollection.find({ "user.email": email })
            .toArray((err, docs) => {
                res.send(docs)
            })
    })

    //add service
    app.post('/addService', (req, res) => {
        const data = req.body;
        isAdminOrNot(req.headers.user)
            .then(status => {
                console.log("in side status", status);
                if (status) {
                    serviceCollection.insertOne(data)
                        .then((result) => {
                            if (result.insertedCount > 0) {
                                res.send({ status: result.insertedCount > 0 })
                            }
                            else { res.send({ statue: false }) }
                        })
                } else {
                    res.send({ message: 'unAuthorized' });
                }
            })
            .catch((err) => {
                res.send({ err })
            })
    })

    //delete service
    app.delete('/deleteService/:id', (req, res) => {
        const id = req.params.id;
        const email = req.headers.email;

        isAdminOrNot(email)
            .then(status => {
                if (status) {
                    serviceCollection.deleteOne({ _id: ObjectId(id) })
                        .then((result) => {
                            if (result.deletedCount > 0) {
                                res.send(result.deletedCount > 0)
                            }
                            else { res.send(false) }
                        })
                } else {
                    res.send({ message: 'unAuthorized' });
                }
            })
            .catch((err) => {
                res.send({ err })
            })
    })

    //get services
    app.get('/services', (req, res) => {
        serviceCollection.find({})
            .toArray((err, docs) => {
                res.send(docs)
            })
    })

    //get single service
    app.get('/singleService/:id', (req, res) => {
        const id = req.params.id;
        serviceCollection.find({ _id: ObjectId(id) })
            .toArray((err, docs) => {
                res.send(docs[0])
            })
    })

    //check is admin or not
    const isAdminOrNot = (email) => {
        return fetch('http://localhost:5000/admin', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'email': email
            },
        }).then(res => res.json())
            .then(status => {
                console.log("status", status);
                return status;
            })
            .catch(err => {
                console.log(err);
                return false;
            })
    }

    //get admin
    app.get('/admin', (req, res) => {
        const email = req.headers.email;
        console.log(email, "admin");
        adminCollection.findOne({ email: email })
            .then((result) => {
                const isAdmin = (result?.email === email);
                res.send(isAdmin);
            })
            .catch(err => {
                console.log(err);
                res.send(false);
            })
    })

    // client.close()
});


app.listen(process.env.PORT || 5000);