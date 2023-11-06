const express = require("express")
const {CustomError} = require("./errors")

const app = express()

app.use(express.json())

var people = [
  {
    FirstName: "James",
    Address: "123 Main St",
    PhoneNumber: "998-755-655",
  },
  {
    FirstName: "Anand",
    Address: "25 Koramangala",
    PhoneNumber: "555-987-6543",
  },
  {
    FirstName: "Hari",
    Address: "36 Indira Nagar",
    PhoneNumber: "990-123-456",
  },
];

app.get("/search", (req, res, next) => {
  const query = req.query
  if(!query.query) throw new CustomError("No params passed", 404)
  const qString = query.query
  let matched = []
  for(let i = 0; i < people.length; i++) {
    let g = people[i]
    if (
      g["FirstName"].match(qString) ||
      g["Address"].match(qString) ||
      g["PhoneNumber"].match(qString)
    )
      matched.push(g);
  }
  res.status(200).json({
    status: "ok",
    matched
  })
})

app.use((err, req, res, next) => {
  res.status(err.statusCode?? 500).json({
    status: "error",
    err: err.msg
  })
})
/* 
  Scenario 1: Check if the health of the server sends ok whem the server is initialized
  S2: Test the endpoint /search with empty query params for the proper status code
  S3: The people variable would be a stub with a value and check if the API returns the value when the proper query is passed with correct status code
  S4: Check if the API gives the not found status code when there are no search results found for a query
  S5: Send a request to an unknown path and check if the server handles the request with proper status codes
  S6: Mock throwing of some runtime error and check if the server handles the error properly
*/

app.listen(3040, () => {
  console.log("Server started")
})