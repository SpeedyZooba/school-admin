import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const initialForm = {
    Capacity: '',
};

export default function AddClassroom() {
    const [addForms, setAddForms] = useState(initialForm);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [selectValueError, setSelectValueError] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [rows, setRows] = useState([]);

    const columns = [
        { field: 'id', headerName: 'Satır', width: 150, type: 'number' },
        { field: 'RoomId', headerName: 'Sınıf Numarası', width: 150, type: 'number' },
        { field: 'Capacity', headerName: 'Capacity', width: 150, type: 'number' },
    ];

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} {...props} />;
    });
    
    const formsChange = (name, value) => { setAddForms({ ...addForms, [name]: value });}

    useEffect(() => {

		getAllClassroom();

	}, []);

    const getAllClassroom = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/classroom");
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
        xhr.open("POST", "http://localhost:8080/classroom");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 201) {
              console.log(JSON.parse(xhr.responseText));
              setSuccess(true);
              getAllClassroom();
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
                    id="kapasite"
                    label="Sınıf Kapasitesi"
                    variant="standard"
                    value={addForms.Capacity}
                    onChange={ e => formsChange('Capacity', e.target.value) }
                />
            </div>
            <Button variant="contained" onClick={save} sx={{ marginTop: 2 }}>Kaydet</Button>
        </Box>
    </Paper>
    <Paper sx={{ p: 2, marginTop: 2}}>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'right', gap: 2, marginBottom: 2}}>
            <Button variant="contained" color="error" onClick={erase}>SİL</Button>
        </Box>
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