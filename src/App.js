import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Karakter from "./components/Karakter";
import Arama from "./Arama";
import axios from "axios";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the API in an effect hook. Remember, anytime you have a
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  const [data, setData] = useState([]);
  const [arama, setArama] = useState("");
  const [icerik, setIcerik] = useState("");
  const [page, setPage] = useState("1");
  const [pages, setPages] = useState([]);

  const totalPages = [];
  function pageSetter(page) {
    setPage(page);
  }

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people?page=" + page)
      .then((response) => {
        setData(response.data.results);
        let totalPage = response.data.count / response.data.results.length;
        for (let i = 1; i <= totalPage; i++) {
          totalPages.push(i);
        }
        setPages(totalPages);
      })
      .catch((err) => console.log(err));
  }, [page]);

  function handleClick(name) {
    setIcerik(name === icerik ? null : name);
  }

  return (
    <div className="App">
      <h1 className="Header">Karakterler</h1>
      {<Arama setArama={setArama} arama={arama} />}
      {data
        .filter((person) => {
          if (arama === "") {
            return person;
          } else if (
            person.name.toLowerCase().includes(arama.toLocaleLowerCase())
          ) {
            return person;
          }
        })
        .map((person) => {
          return (
            <Karakter
              key={person.name}
              data={person}
              handleClick={handleClick}
              icerik={icerik}
              setIcerik={setIcerik}
            />
          );
        })}
      <Pagination style={{ justifyContent: "center" }}>
        {pages.map((item) => (
          <PaginationItem onClick={() => pageSetter(item)}>
            <PaginationLink>{item}</PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </div>
  );
};

export default App;
