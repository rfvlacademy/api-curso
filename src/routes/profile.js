const express = require("express");
const fileRoute = express.Router();
const {initializeApp, cert} = require('firebase-admin/app');
const {getFirestore, Timestamp, FieldValue} = require('firebase-admin/firestore');
const serviceAccount = require("./credential.json");
initializeApp({
    credential: cert(serviceAccount)
});
const db = getFirestore();
fileRoute.post("/profile", async (req, res) => {
    console.log(req.body);
    await db.collection('cities').doc(req.body.stringExample).set(req.body)
        .then(result => res.json({message: 'datos ingresados'}))
        .catch(error => res.json({error: err}))
    ;
})
fileRoute.get("/profile/:id", async (req, res) => {
    const {id} = req.params;
    const cityRef = db.collection('cities').doc(id);
    const doc = await cityRef.get();
    if (!doc.exists) {
        res.json({message: 'el cv no existe'})
    } else {
        res.json(doc.data());
    }
});

module.exports = fileRoute;