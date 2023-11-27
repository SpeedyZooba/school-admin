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

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'FirstName', headerName: 'Ad', width: 130 },
        { field: 'LastName', headerName: 'Soyad', width: 130 },
        { field: 'Sex', headerName: 'Cinsiyet', width: 70, 
            valueGetter: (params) => {
                if(params.row.Sex == 'M') return 'Erkek'; 
                else return 'Kadın';
            }
        },
        { field: 'PhoneNo', headerName: 'Telefon Numarası', width: 150 },
        { field: 'Email', headerName: 'E-Mail', width: 180 },
    ];

    const rows = [
        { id: 1, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', PhoneNo: '05003002010', Email: 'b.akan@etu.edu.tr', Address:'12. Sokak, Çankaya/Ankara' },
        { id: 2, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', PhoneNo: '05003002010', Email: 'b.akan@etu.edu.tr', Address:'12. Sokak, Çankaya/Ankara' },
        { id: 3, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', PhoneNo: '05003002010', Email: 'b.akan@etu.edu.tr', Address:'12. Sokak, Çankaya/Ankara' },
        { id: 4, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', PhoneNo: '05003002010', Email: 'b.akan@etu.edu.tr', Address:'12. Sokak, Çankaya/Ankara' },
        { id: 5, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', PhoneNo: '05003002010', Email: 'b.akan@etu.edu.tr', Address:'12. Sokak, Çankaya/Ankara' }
    ];
    
    const formsChange = (name, value) => { setAddForms({ ...addForms, [name]: value });}

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} {...props} />;
    });

    const save = () => {};
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
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'right', gap: 2, marginBottom: 2}}>
            <Button variant="contained" color="inherit" onClick={update}>Güncelle</Button>
            <Button variant="contained" color="error" onClick={erase}>SİL</Button>
        </Box>
        <DataGrid
            rows={rows}
            columns={columns}
            onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
        />
    </Paper>
    <Snackbar open={selectValueError} autoHideDuration={2000} onClose={() => setSelectValueError(false)}>
        <Alert onClose={() => setSelectValueError(false)} severity="error" sx={{ width: '100%' }}>
            Tablodan bir satır seçiniz!
        </Alert>
    </Snackbar>
    </>);
}