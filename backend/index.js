const express = require('express');
const app = express();
// const app = require('express')

const path = require('path')

const cors = require('cors')

const shortid = require('shortid')

const Razorpay = require('razorpay')


//initialise razorpay credentials

const razorpay = new Razorpay({
    key_id: "rzp_test_zXoOe6U2B8fZGJ",
    key_secret: "ucQw0ZlFWR0PBANIqnoeY9F2"
});

app.use(cors())

app.get('/logo.jpg', (req, res) => {
    res.sendFile(path.join(__dirname,"logo.jpg"))
})

app.post('/razorpay', async (req, res) => {
    const payment_capture = 1
    const amount = 299
    const currency = 'INR'

    const options = {
        amount: amount * 100,
        currency: currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try {
        
        const response = await razorpay.orders.create(options)
        console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    }

    catch (error) {
        console.log(error)
    }
})

app.listen(4000, () => {
    console.log("app is listening on port 4000")
} )