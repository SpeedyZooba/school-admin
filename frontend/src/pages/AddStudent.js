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
    FirstName: '',
    LastName: '',
    Sex: 'M',
    BirthDate: '',
    PhoneNo: '',
    Email: '',
    IsActive: true,
    GradDate: null,
    ParentPhoneNumber: '',
    FreeHour: ''
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

const daysInitial = {
    morning: false,
    noon: false
}

export default function AddStudent() {
    const [addForms, setAddForms] = useState(initialForm);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [selectValueError, setSelectValueError] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const [monday, setMonday] = useState(daysInitial);
    const [tuesday, setTuesday] = useState(daysInitial);
    const [wednesday, setWednesday] = useState(daysInitial);
    const [thursday, setThursday] = useState(daysInitial);
    const [friday, setFriday] = useState(daysInitial);

    const [rows, setRows] = useState([]);

    const columns = [
        { field: 'StudentId', headerName: 'ID', width: 120 },
        { field: 'FirstName', headerName: 'Ad', width: 130 },
        { field: 'LastName', headerName: 'Soyad', width: 130 },
        { field: 'Sex', headerName: 'Cinsiyet', width: 100, 
            valueGetter: (params) => {
                if(params.row.Sex == 'M') return 'Erkek'; 
                else return 'Kadın';
            }
        },
        { field: 'BirthDate', headerName: 'Doğum Tarihi', width: 100 },
        { field: 'PhoneNo', headerName: 'Telefon Numarası', width: 150, type: 'number' },
        { field: 'Email', headerName: 'E-Mail', width: 180 },
        { field: 'IsActive', headerName: 'Durum', width: 130,
            valueGetter: (params) => {
                if(params.row.IsActive) return 'Aktif'; 
                else return 'Pasif';
            } 
        },
        { field: 'GradDate', headerName: 'Mezuniyet Tarihi', width: 130 }
    ];

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} {...props} />;
    });
    
    const formsChange = (name, value) => { setAddForms({ ...addForms, [name]: value });}
    const freeHoursChange = (day, time, value) => { 
        if(day == 'monday') setMonday({...monday, [time]: value});
        if(day == 'tuesday') setTuesday({...tuesday, [time]: value});
        if(day == 'wednesday') setWednesday({...wednesday, [time]: value});
        if(day == 'thursday') setThursday({...thursday, [time]: value});
        if(day == 'friday') setFriday({...friday, [time]: value});
    }

    const createFreeHoursArray = () => {
        let str = '';
        let morning = "8-9-10-11";
        let noon = "13-14-15-16";
        let fullday = "8-9-10-11-13-14-15-16";

        if(monday.morning && monday.noon) str += fullday;
        else if(monday.morning) str += morning;
        else if(monday.noon) str += noon;

        str += ',';

        if(tuesday.morning && tuesday.noon) str += fullday;
        else if(tuesday.morning) str += morning;
        else if(tuesday.noon) str += noon;

        str += ',';

        if(wednesday.morning && wednesday.noon) str += fullday;
        else if(wednesday.morning) str += morning;
        else if(wednesday.noon) str += noon;

        str += ',';

        if(thursday.morning && thursday.noon) str += fullday;
        else if(thursday.morning) str += morning;
        else if(thursday.noon) str += noon;

        str += ',';

        if(friday.morning && friday.noon) str += fullday;
        else if(friday.morning) str += morning;
        else if(friday.noon) str += noon;
    
        return str;
    }


    useEffect(() => {

		getAllStudents();

	}, []);

    const getAllStudents = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/students");
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
        xhr.open("POST", "http://localhost:8080/students");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 201) {
              console.log(JSON.parse(xhr.responseText));
              setSuccess(true);
              getAllStudents();
            } else {
              console.log(`Error: ${xhr.status}`);
              setError(true);
            }
          };
        const body = JSON.stringify({...addForms, FreeHour: createFreeHoursArray()});
        xhr.send(body);
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
                    helperText="YYYY-AA-GG"
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
                <FormGroup sx={{display: 'flex', flexDirection: 'row', marginTop: 2}}>
                    <FormGroup sx={{display: 'flex', flexDirection: 'column'}}>
                        <FormControlLabel control={<Checkbox  value={monday.morning} onChange={() => freeHoursChange('monday', 'morning', !monday.morning)}/>} label="Pazartesi Sabah"  />
                        <FormControlLabel control={<Checkbox  value={monday.noon} onChange={() => freeHoursChange('monday', 'noon', !monday.noon)}/>} label="Pazartesi Öğlen"  />
                    </FormGroup>
                    <FormGroup sx={{display: 'flex', flexDirection: 'column'}}>
                        <FormControlLabel control={<Checkbox  value={tuesday.morning} onChange={() => freeHoursChange('tuesday', 'morning', !tuesday.morning)}/>} label="Salı Sabah"  />
                        <FormControlLabel control={<Checkbox  value={tuesday.noon} onChange={() => freeHoursChange('tuesday', 'noon', !tuesday.noon)}/>} label="Salı Öğlen"  />
                    </FormGroup>
                    <FormGroup sx={{display: 'flex', flexDirection: 'column'}}>
                        <FormControlLabel control={<Checkbox  value={wednesday.morning} onChange={() => freeHoursChange('wednesday', 'morning', !wednesday.morning)}/>} label="Çarşamba Sabah"  />
                        <FormControlLabel control={<Checkbox  value={wednesday.noon} onChange={() => freeHoursChange('wednesday', 'noon', !wednesday.noon)}/>} label="Çarşamba Öğlen"  />
                    </FormGroup>
                    <FormGroup sx={{display: 'flex', flexDirection: 'column'}}>
                        <FormControlLabel control={<Checkbox  value={thursday.morning} onChange={() => freeHoursChange('thursday', 'morning', !thursday.morning)}/>} label="Perşembe Sabah"  />
                        <FormControlLabel control={<Checkbox  value={thursday.noon} onChange={() => freeHoursChange('thursday', 'noon', !thursday.noon)}/>} label="Perşembe Öğlen"  />
                    </FormGroup>
                    <FormGroup sx={{display: 'flex', flexDirection: 'column'}}>
                        <FormControlLabel control={<Checkbox  value={friday.morning} onChange={() => freeHoursChange('friday', 'morning', !friday.morning)}/>} label="Cuma Sabah"  />
                        <FormControlLabel control={<Checkbox  value={friday.noon} onChange={() => freeHoursChange('friday', 'noon', !friday.noon)}/>} label="Cuma Öğlen"  />
                    </FormGroup>
                </FormGroup>
            </div>
            <Button variant="contained" onClick={save} sx={{ marginTop: 2 }}>Kaydet</Button>
        </Box>
    </Paper>
    <Paper sx={{ p: 2, marginTop: 2 }}>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'right', gap: 2, marginBottom: 2}}>
            {/* <Button variant="contained" color="error" onClick={erase}>SİL</Button> */}
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