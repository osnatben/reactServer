import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(8787, () => {
    console.log("Server started!");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
}
);

let users = [{name: "osnat", password:"1234"},{name: "dvori", password:"5678"}]

//add get request that check if the request body has name = "admin" and password = 123456
//path: localhost:8787/login
app.post("/login", (req, res) => {
    const body = req.body;
  
    if (body.name == "admin" && body.password == "123456") {
        res.statusCode = 200;
        res.send('1');
    } else if (users.find(u => u.name == body.name && u.password == body.password)) {
        res.statusCode = 200;
        res.send('2')
        
    }
    else {
        res.statusCode = 200;
        res.send('0');
        
    }
});

// add post request that add new appointment to the appointments array and check in the array if the time is available or not
const appointments = [];//פגישות -אירועים

app.post("/appointment", (req, res) => {
    const body = req.body;
    let isAvailable = true;
    // from foreach loop to for of loop
    for (const appointment of appointments) {
        if (appointment.dateTime === body.dateTime) {
            isAvailable = false;
        }
    }

    if (isAvailable) {
        appointments.push(body);
        res.statusCode = 200;
        res.send("Appointment added successfully!");
    } else {
        res.statusCode = 400;
        res.send("Appointment is not available!");
    }
});

// add get request that return all appointments
app.get("/appointments", (req, res) => {
    res.send(appointments);
});

let services = []; //שרותים -נותני תקציב

app.post("/service", (req, res) => {
    const serviceExists = services.find((service) => service.name === req.body.name);
    if (serviceExists) {
        res.statusCode = 400;
        res.send("Service already exists!");
        return;
    }
    const body = req.body;
    services.push(body);
    res.statusCode = 200;
    res.send("Service added successfully!");
});

app.get("/services", (req, res) => {
    res.send(services);
});

let businessData = {};

app.post("/businessData", (req, res) => {
    const body = req.body;
    businessData = body;
    res.statusCode = 200;
    res.send(businessData);
});


app.put("/businessData", (req, res) => {
    const body = req.body;
    businessData = body;
    res.statusCode = 200;
    res.send(businessData);
});

app.get("/businessData", (req, res) => {
    res.send(businessData);
});
