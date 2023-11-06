import React from "react";
import "./styles.css"

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

export default function App() {

  const [matchedPeople, setMatchedPeople] = React.useState([])

  function onInputChange(e) {
    const targetValue = e.target.value
    console.log(targetValue);
    let matchedPeople = []

    for(let i = 0; i < people.length; i++) {
      let ob = people[i]
      if(ob["FirstName"].match(targetValue) || ob["Address"].match(targetValue) || ob["PhoneNumber"].match(targetValue)) matchedPeople.push(ob)
    }
    setMatchedPeople(matchedPeople)
  }

  return (
    <main className="main">
      <div>
        <input type="text" onChange={onInputChange}></input>
        <button>Submit</button>
      </div>
      <div>
        {matchedPeople.map((person) => (
          <div>{person.FirstName}</div>
        ))}
      </div>
    </main>
  );

}

/* 
  Case 1: When the page first loads, check if the state is null 
  Case 2: Write value in the text box which is present in the array. Test if the relevant data is rendered on to the screen
  Case 3: Input a value that is not present in the array and check the UI. Test whether the relevant eerror message gets printed on the screen.
*/