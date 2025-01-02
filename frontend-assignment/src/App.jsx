import { useEffect, useState } from "react";
import "./App.css";
import ProjectTable from "./components/ProjectTable/ProjectTable";
const URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
function App() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const newData = await fetch(URL);
    const json = await newData.json();
    setData(json);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <ProjectTable data={data} />
    </>
  );
}

export default App;
