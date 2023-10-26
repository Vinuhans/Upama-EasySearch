import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";



function DataTable({ data }) {
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        console.log("Data on table", data);
        setRows(data);
    }, [data]);
    if (data.length > 0) {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="data-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Metaphor</TableCell>
                            <TableCell align="right">Simile</TableCell>
                            <TableCell align="right">Poet</TableCell>
                            <TableCell align="right">Source Domain</TableCell>
                            <TableCell align="right">Target Domain</TableCell>
                            <TableCell align="right">Meaning</TableCell>
                            <TableCell align="right">Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{
                                    "&:last-child td, &:last-child th": { border: 0 }}}
                            >
                                <TableCell component="th" scope="row">
                                    {row._source["Poem Name"]}
                                </TableCell>
                                <TableCell align="right">
                                    {row._source["metaphorical terms"]}
                                </TableCell>
                                <TableCell align="right">
                                    {row._source["Simile term"]}
                                </TableCell>
                                <TableCell align="right">
                                    {row._source["Poet"]}
                                </TableCell>
                                <TableCell align="right">
                                    {row._source["Source Domain"]}
                                </TableCell>
                                <TableCell align="right">
                                    {row._source[" Target Domain"]}
                                </TableCell>
                                <TableCell align="right">
                                    {row._source[" Meaning"]}
                                </TableCell>
                                <TableCell align="right">
                                    {row._source[" Year"]}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return <Typography>No results Found</Typography>;
    }
}

export default DataTable;
