import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const initialForm = {
    ExpenseName: '',
    Amount: '',
    ExpenseDate: ''
};

export default function AddGeneralExpense() {
    const [addForms, setAddForms] = useState(initialForm);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [selectValueError, setSelectValueError] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [rows, setRows] = useState([]);

    const columns = [
        { field: 'id', headerName: 'Satır', width: 70, type: 'number' },
        { field: 'ExpenseId', headerName: 'Gider Kodu', width: 150, type: 'number' },
        { field: 'ExpenseName', headerName: 'Gider Adı', width: 150 },
        { field: 'Amount', headerName: 'Miktar', width: 150, type: 'number' },
        { field: 'ExpenseDate', headerName: 'Tarih', width: 150 },
    ];

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} {...props} />;
    });
    
    const formsChange = (name, value) => { setAddForms({ ...addForms, [name]: value });}

    useEffect(() => {

		getAllExpense();

	}, []);

    const getAllExpense = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/generalExpenses");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
              console.log(JSON.parse(xhr.responseText));
              let rows = JSON.parse(xhr.responseText);
              rows.map((row, i) => row.id = i + 1)
              setRows(rows);
              setSuccess(true);
            } else {
              console.log(`Error: ${xhr.status}`);
              setError(true);
            }
          };
        xhr.send();
    };
    
    const save = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/generalExpenses");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 201) {
              console.log(JSON.parse(xhr.responseText));
              setSuccess(true);
              getAllExpense();
            } else {
              console.log(`Error: ${xhr.status}`);
              setError(true);
            }
          };
        const body = JSON.stringify(addForms);
        xhr.send(body);
    };
    
    const update = () => {
        if(rowSelectionModel.length == 0) setSelectValueError(true);
    };

    const erase = () => {
        if(rowSelectionModel.length == 0) setSelectValueError(true);
    };

  return (<>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '200px' },
        }}
        noValidate
        autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="name"
                    label="Gider Adı"
                    variant="standard"
                    value={addForms.ExpenseName}
                    onChange={ e => formsChange('ExpenseName', e.target.value) }
                />
                <TextField
                    required
                    id="amount"
                    label="Miktar"
                    variant="standard"
                    value={addForms.Amount}
                    onChange={ e => formsChange('Amount', e.target.value) }
                />
                <TextField
                    required
                    id="date"
                    label="Tarih"
                    variant="standard"
                    value={addForms.ExpenseDate}
                    onChange={ e => formsChange('ExpenseDate', e.target.value) }
                />
            </div>
            <Button variant="contained" onClick={save} sx={{ marginTop: 2 }}>Kaydet</Button>
        </Box>
    </Paper>
    <Paper sx={{ p: 2, marginTop: 2}}>
        <DataGrid
            rows={rows}
            columns={columns}
            onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
            sx={{height: 350}}
        />
    </Paper>
    <Snackbar open={selectValueError} autoHideDuration={2000} onClose={() => setSelectValueError(false)}>
        <Alert onClose={() => setSelectValueError(false)} severity="error" sx={{ width: '100%' }}>
            Tablodan bir satır seçiniz!
        </Alert>
    </Snackbar>
    <Snackbar open={error} autoHideDuration={2000} onClose={() => setError(false)}>
        <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
            Bir hata oluştu.
        </Alert>
    </Snackbar>
    <Snackbar open={success} autoHideDuration={2000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
            İşlem başarılı.
        </Alert>
    </Snackbar>
    </>);
}