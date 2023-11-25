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
    BirthDate: '',
    PhoneNo: '',
    Email: '',
    IsActive: true,
    GradDate: '',
    ParentPhoneNumber: ''
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

const studentStatus = [
    {
      value: false,
      label: 'Mezun',
    },
    {
      value: true,
      label: 'Aktif Öğrenci',
    }
];

export default function AddStudent() {
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
        { field: 'BirthDate', headerName: 'Doğum Tarihi', width: 100 },
        { field: 'PhoneNo', headerName: 'Telefon Numarası', width: 150 },
        { field: 'Email', headerName: 'E-Mail', width: 180 },
        { field: 'IsActive', headerName: 'Durum', width: 130,
            valueGetter: (params) => {
                if(params.row.IsActive) return 'Aktif'; 
                else return 'Pasif';
            } 
        },
        { field: 'GradDate', headerName: 'Mezuniyet Tarihi', width: 130 },
        { field: 'ParentPhoneNumber', headerName: 'Veli Telefon Numarası', width: 150 },
    ];

    const rows = [
        { id: 1, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', BirthDate: '06.05.1998', PhoneNo: '05003002010', Email: 'b.akan@etu.edu.tr', IsActive: true, GradDate: '', ParentPhoneNumber: '12345698122' },
        { id: 2, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', BirthDate: '06.05.1998', PhoneNo: '05003002010', Email: 'b.akan@etu.edu.tr', IsActive: true, GradDate: '', ParentPhoneNumber: '12345698122' },
        { id: 3, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', BirthDate: '06.05.1998', PhoneNo: '05003002010', Email: 'b.akan@etu.edu.tr', IsActive: true, GradDate: '', ParentPhoneNumber: '12345698122' },
        { id: 4, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', BirthDate: '06.05.1998', PhoneNo: '05003002010', Email: 'b.akan@etu.edu.tr', IsActive: true, GradDate: '', ParentPhoneNumber: '12345698122' },
        { id: 5, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', BirthDate: '06.05.1998', PhoneNo: '05003002010', Email: 'b.akan@etu.edu.tr', IsActive: true, GradDate: '', ParentPhoneNumber: '12345698122' }
    ];
    
    const formsChange = (name, value) => { setAddForms({ ...addForms, [name]: value });}

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} {...props} />;
    });

    const save = () => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", 'http://localhost:8080/', false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
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
                    id="dogumTarihi"
                    label="Doğum Tarihi"
                    variant="standard"
                    helperText="GG.AA.YYYY"
                    value={addForms.BirthDate}
                    onChange={ e => formsChange('BirthDate', e.target.value) }
                />
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
                    id="durum"
                    select
                    label="Öğrenci Durumu"
                    defaultValue={true}
                    variant="standard"
                    value={addForms.IsActive}
                    onChange={ e => formsChange('IsActive', e.target.value) }
                >
                {studentStatus.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
                <TextField
                    id="mezuniyetTarihi"
                    label="Mezuniyet Tarihi"
                    variant="standard"
                    helperText="GG.AA.YYYY"
                    value={addForms.GradDate}
                    onChange={ e => formsChange('GradDate', e.target.value) }
                />
                <TextField
                    id="parentPhone"
                    label="Veli Telefon Numarası"
                    variant="standard"
                    value={addForms.ParentPhoneNumber}
                    onChange={ e => formsChange('ParentPhoneNumber', e.target.value) }
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