import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const days = [
    "Pzt",
    "Sal",
    "Car",
    "Prs",
    "Cum"
];

export default function TeacherSchedule() {
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [selectValueError, setSelectValueError] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [rows, setRows] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const columns = [
        { field: 'StaffId', headerName: 'ID', width: 70 },
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

    const columnsSchedule = [
        { field: 'rowHour', headerName: 'Saat', width: 180 },
        { field: 'Pzt', headerName: 'Pazartesi', width: 180 },
        { field: 'Sal', headerName: 'Salı', width: 180 },
        { field: 'Car', headerName: 'Çarşamba', width: 180 },
        { field: 'Prs', headerName: 'Perşembe', width: 180 },
        { field: 'Cum', headerName: 'Cuma', width: 180 }
    ];

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} {...props} />;
    });

    const createScheduleData = (input) => {
        let id = 0;
        let arr = [];
        let template = {id: '', rowHour: '', Pzt:'', Sal: '', Car: '', Prs: '', Cum: ''};

        for(let hour = 8; hour < 17; hour++){
            let tempTemplate = template;
            for(let day = 0; day < 5; day++){
                let hourStr = hour + ':00 - ' + hour + ':50'
                for(let i = 0; i < input.length; i++){
                    let temp = input[i].split('-');
                    if(temp[0] == hour && temp[1] == days[day]){
                        tempTemplate = {...tempTemplate, rowHour: hourStr, [days[day]]: temp[2] + '.' + temp[3]};
                    }else{
                        tempTemplate = ({...tempTemplate, rowHour: hourStr})
                    }
                }
            }
            tempTemplate = {...tempTemplate, id: id};
            arr.push(tempTemplate);
            id++;
        }
        return arr;
    }

    const createSchedule = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/schedule");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
              console.log(JSON.parse(xhr.responseText));
            } else {
              console.log(`Error: ${xhr.status}`);
            }
          };
        xhr.send();
      };

    useEffect(() => {

		getAllStaff();

	}, []);

    const getAllStaff = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/staff");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
              console.log(JSON.parse(xhr.responseText));
              let rows = JSON.parse(xhr.responseText);
              rows = rows.filter(row => row.StaffType == 2);
              rows.map((row, i) => row.id = i + 1); 
              setRows(rows);
              setSuccess(true);
            } else {
              console.log(`Error: ${xhr.status}`);
              setError(true);
            }
          };
        xhr.send();
    };
    
    const getSchedule = () => {
        if(rowSelectionModel.length == 0) setSelectValueError(true);
        else{
            const staffId = rows.filter(row => row.id == rowSelectionModel[0])[0].StaffId;
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:8080/schedule/teacher?TeacherId=${staffId}`);
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                  console.log(xhr.responseText);
                  setSchedule(createScheduleData(xhr.responseText))
                  setSuccess(true);
                } else {
                  console.log(`Error: ${xhr.status}`);
                  setError(true);
                }
              };
            xhr.send();
        }  
    };

    const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
        border: 0,
        color:
          theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        WebkitFontSmoothing: 'auto',
        letterSpacing: 'normal',
        '& .MuiDataGrid-columnsContainer': {
          backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
        },
        '& .MuiDataGrid-iconSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
          borderRight: `1px solid ${
            theme.palette.mode === 'light' ? '#dddddd' : '#303030'
          }`,
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
          borderBottom: `1px solid ${
            theme.palette.mode === 'light' ? '#dddddd' : '#303030'
          }`,
        },
        '& .MuiDataGrid-cell': {
          color:
            theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
        },
        '& .MuiPaginationItem-root': {
          borderRadius: 0,
        },
        '& .MuiDataGrid-footerContainer': {
            display: 'none',
        }
    }));

  return (<>
    <Paper sx={{ p: 2, marginTop: 2}}>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'right', gap: 2, marginBottom: 2}}>
            <Button variant="outlined" color="primary" onClick={createSchedule}>Program Oluştur</Button>
            <Button variant="contained" color="primary" onClick={getSchedule}>Programı Görüntüle</Button>
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
    <Paper sx={{ p: 2, marginTop: 2}}>
        <StyledDataGrid
            rows={schedule}
            columns={columnsSchedule}
            sx={{height: 580}}
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