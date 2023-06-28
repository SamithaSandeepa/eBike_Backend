import express, { json } from "express";
import cors from "cors";
import { db, rtdb } from "./firebaseConfig.js";
import axios from "axios";

const app = express();
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get a reference to the Firestore
const usersCollection = db.collection("users");

// Route handler for Firestore
app.post("/firestore", async (req, res) => {
  await usersCollection.add({ name: req.body.name, email: req.body.email });
  res.send("Data added to Firestore");
});

// Route handler for Realtime Database
app.post("/realtime", (req, res) => {
  rtdb.ref("users").push({ name: req.body.name, email: req.body.email });
  res.send("Data added to Realtime Database");
});

// Route handler for GET request
app.get("/get", async (req, res) => {
  try {
    const querySnapshot = await usersCollection.get();
    const users = [];

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    res.json(users);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("An error occurred while retrieving data");
  }
});

// Route handler for real-time updates
app.get("/realtime-updates", (req, res) => {
  const usersRef = rtdb.ref("users");

  // Listen for real-time updates
  usersRef.on(
    "value",
    (snapshot) => {
      const users = snapshot.val();
      res.json(users);
    },
    (error) => {
      console.error("Error fetching real-time data:", error);
      res.status(500).send("An error occurred while fetching real-time data");
    }
  );
});
const usersRef = rtdb.ref("users");

// // Attach a value event listener to "users" path
// usersRef.on("value", (snapshot) => {
//   // Handle the data changes
//   const usersData = snapshot.val();
//   console.log("Real-time data:", usersData);
// });

axios
  .get("http://192.168.1.33/get", {
    params: {
      message: "text",
    },
  })
  .then(function (response) {
    console.log("GET Response:", response.data);
  })
  .catch(function (error) {
    console.error("GET Error:", error);
  });

const sendGetRequest = (text) => {
  console.log(text, "safsadf");
  axios
    .get("http://192.168.1.33/get", {
      params: {
        message: text,
      },
    })
    .then(function (response) {
      console.log("GET Response:", response.data);
    })
    .catch(function (error) {
      console.error("GET Error:", error);
    });
};

app.post("/create", async (req, res) => {
  try {
    // const data = req.body;
    // await User.add(data);
    const text = "Hello ESP32! GET request received!";
    // Trigger the GET request after the "/create" route is called
    sendGetRequest(text);
    res.status(200).send("User created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
