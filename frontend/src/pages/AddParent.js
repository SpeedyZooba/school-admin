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
    FirstName: '',
    LastName: '',
    Sex: 'M',
    PhoneNo: '',
    Email: '',
    Address: ''
};

const sex = [
    {
      value: 'M',
      label: 'Erkek',
    },
    {
      value: 'F',
      label: 'Kadın',
    }
];

export default function AddParent() {
    const [addForms, setAddForms] = useState(initialForm);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [selectValueError, setSelectValueError] = useState(false);
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const columns = [
        { field: 'ParentId', headerName: 'ID', width: 70 },
        { field: 'FirstName', headerName: 'Ad', width: 130 },
        { field: 'LastName', headerName: 'Soyad', width: 130 },
        { field: 'Sex', headerName: 'Cinsiyet', width: 100, 
            valueGetter: (params) => {
                if(params.row.Sex == 'M') return 'Erkek'; 
                else return 'Kadın';
            }
        },
        { field: 'PhoneNo', headerName: 'Telefon Numarası', width: 150 },
        { field: 'Email', headerName: 'E-Mail', width: 180 },
    ];

    const formsChange = (name, value) => { setAddForms({ ...addForms, [name]: value });}

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} {...props} />;
    });

    useEffect(() => {

		getAllParents();

	}, []);

    const getAllParents = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/parents");
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
        xhr.open("POST", "http://localhost:8080/parents");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 201) {
              console.log(JSON.parse(xhr.responseText));
              getAllParents();
            } else {
              console.log(`Error: ${xhr.status}`);
            }
          };
        const body = JSON.stringify(addForms);
        xhr.send(body);
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
                    id="ad"
                    label="Ad"
                    variant="standard"
                    value={addForms.FirstName}
                    onChange={ e => formsChange('FirstName', e.target.value) }
                />
                <TextField
                    required
                    id="soyad"
                    label="Soyad"
                    variant="standard"
                    value={addForms.LastName}
                    onChange={ e => formsChange('LastName', e.target.value) }
                />
                <TextField
                    required
                    id="cinsiyet"
                    select
                    label="Cinsiyet"
                    defaultValue="M"
                    variant="standard"
                    value={addForms.Sex}
                    onChange={ e => formsChange('Sex', e.target.value) }
                >
                {sex.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
                <TextField
                    required
                    id="telNo"
                    label="Telefon Numarası"
                    variant="standard"
                    value={addForms.PhoneNo}
                    onChange={ e => formsChange('PhoneNo', e.target.value) }
                />
                <TextField
                    required
                    id="ePosta"
                    label="E-Posta Adresi"
                    variant="standard"
                    value={addForms.Email}
                    onChange={ e => formsChange('Email', e.target.value) }
                />
                <TextField
                    required
                    id="adres"
                    label="Adres"
                    variant="standard"
                    value={addForms.Address}
                    onChange={ e => formsChange('Address', e.target.value) }
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