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
    StaffType: '',
    ShiftType: '',
    Salary: ''
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

const StaffType = [
    {
        value: 1,
        label: 'İdari',
    },
    {
        value: 2,
        label: 'Öğretmen',
    },
    {
        value: 3,
        label: 'Yardımcı',
    }
];

const ShiftType = [
    {
      value: 'FULLTIME',
      label: 'Tam Zamanlı',
    },
    {
      value: 'PARTTIME',
      label: 'Yarı Zamanlı',
    }
];

export default function AddStaff() {
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
        { field: 'BirthDate', headerName: 'Doğum Tarihi', width: 120 },
        { field: 'StaffType', headerName: 'Çalışan Türü', width: 120, 
            valueGetter: (params) => {
                if(params.row.StaffType == 1) return 'Yönetici'; 
                else if(params.row.StaffType == 2) return 'Öğretmen'; 
                else return 'Yardımcı';
            }
        },
        { field: 'ShiftType', headerName: 'Mesai Türü', width: 120, 
            valueGetter: (params) => {
                if(params.row.ShiftType == 'FULLTIME') return 'Tam Zamanlı'; 
                else return 'Yarı Zamanlı';
            }
        },
        { field: 'Salary', headerName: 'Maaş', width: 80 }
    ];

    const rows = [
        { id: 1, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', PhoneNo: '05003002010', BirthDate: '06.50.1998', Email: 'b.akan@etu.edu.tr', StaffType: 1, ShiftType: 'FULLTIME', Salary: 50000 },
        { id: 2, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', PhoneNo: '05003002010', BirthDate: '06.50.1998', Email: 'b.akan@etu.edu.tr', StaffType: 1, ShiftType: 'FULLTIME', Salary: 50000 },
        { id: 3, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', PhoneNo: '05003002010', BirthDate: '06.50.1998', Email: 'b.akan@etu.edu.tr', StaffType: 1, ShiftType: 'FULLTIME', Salary: 50000 },
        { id: 4, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', PhoneNo: '05003002010', BirthDate: '06.50.1998', Email: 'b.akan@etu.edu.tr', StaffType: 1, ShiftType: 'FULLTIME', Salary: 50000 },
        { id: 5, FirstName: 'Barış', LastName: 'Akan', Sex: 'M', PhoneNo: '05003002010', BirthDate: '06.50.1998', Email: 'b.akan@etu.edu.tr', StaffType: 1, ShiftType: 'FULLTIME', Salary: 50000 }
    ];
    
    const formsChange = (name, value) => { setAddForms({ ...addForms, [name]: value });}

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} {...props} />;
    });

    const save = () => {
        console.log(addForms);
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
                    id="stafftype"
                    select
                    label="Çalışan Türü"
                    variant="standard"
                    value={addForms.StaffType}
                    onChange={ e => formsChange('StaffType', e.target.value)}
                >
                {StaffType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
                <TextField
                    required
                    id="shifttype"
                    select
                    label="Mesai Türü"
                    variant="standard"
                    value={addForms.ShiftType}
                    onChange={ e => formsChange('ShiftType', e.target.value) }
                >
                {ShiftType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
                <TextField
                    required
                    id="salary"
                    label="Maaş"
                    variant="standard"
                    value={addForms.Salary}
                    onChange={ e => formsChange('Salary', e.target.value) }
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