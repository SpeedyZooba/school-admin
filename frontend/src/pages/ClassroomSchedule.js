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

export default function ClassroomSchedule() {
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [selectValueError, setSelectValueError] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [rows, setRows] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const columns = [
        { field: 'RoomId', headerName: 'Sınıf Numarası', width: 150, type: 'number' },
        { field: 'Capacity', headerName: 'Kapasite', width: 150, type: 'number' },
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
      let inputArray = [];
      inputArray.push(JSON.parse(input));
      let id = 0;
      let arr = [];
      let template = {id: '', rowHour: '', Pzt:'', Sal: '', Car: '', Prs: '', Cum: ''};

      for(let hour = 8; hour < 17; hour++){
          let tempTemplate = template;
          for(let day = 0; day < 5; day++){
              let hourStr = hour + ':00 - ' + hour + ':50'
              for(let i = 0; i < inputArray.length; i++){
                  let temp = inputArray[i];
                  if(temp.ClassHour == hour && temp.ClassDay == days[day]){
                      tempTemplate = {...tempTemplate, rowHour: hourStr, [days[day]]: temp.CourseName + '.' + temp.SectionId};
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
    
    const getSchedule = () => {
        setSchedule([]);
        if(rowSelectionModel.length == 0) setSelectValueError(true);
        else{
            const roomId = rows.find(row => row.id === rowSelectionModel[0]).RoomId;
            console.log(rows.filter(row => row.id == rowSelectionModel[0])[0].RoomId);
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:8080/schedule/class?RoomId=${roomId}`);
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                  console.log(xhr.responseText);
                  setSuccess(true);
                  setSchedule(createScheduleData(xhr.responseText))
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