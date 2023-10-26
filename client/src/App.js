import "./App.css";
import {
    InputLabel,
    Container,
    FormControl,
    Grid,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "./components/Table";
import axios from "axios";

function App() {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("search");
    const [start, setStart] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    const onSearchPhraseChange = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        setStart(Date.now());
        const request = { phrase: search };
        const fetchData = async () => {
            const result = await axios.post(
                `http://localhost:3001/${filter}`,
                request
            );
            console.log(result);
            setData(result.data);
            setEndTime(Date.now());
        };

        fetchData()
            .catch(console.error);
    }, [search, filter]);

    return (
        <Container>
            <Grid item container xs={12} textAlign={"center"} >
                
                <Grid item xs={12} p={3}>
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        fullWidth
                        onChange={onSearchPhraseChange}
                        helperText={`${data.length} results, time taken ${
                            endTime - start
                        } ms`}
                    />
                </Grid>
                <Grid item xs={6} pl={3} pr={2} pb={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Search On
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter}
                            label="Field"
                            onChange={handleChange}
                        >
                            <MenuItem value={"search"}>All</MenuItem>
                            <MenuItem value={"author"}>Poet</MenuItem>
                            <MenuItem value={"title"}>Title</MenuItem>
                            <MenuItem value={"source"}>Source Domain</MenuItem>
                            <MenuItem value={"target"}>Target Domain</MenuItem>
                            <MenuItem value={"meaning"}>Meaning</MenuItem>
                            <MenuItem value={"year"}>Year</MenuItem>
                            <MenuItem value={"simile"}>Simile</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} pl={2} pr={2}>
                    <DataTable data={data} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
