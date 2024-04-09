import React, { useState } from 'react';
import { Container} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './History.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const History = () => {
    const [historyData, setHistoryData] = useState([]);

    const navigate = useNavigate();

    const getHistory = async () => {
      try {
        let token = localStorage.getItem('token');
        let decoded = jwtDecode(token);
        let username = decoded.username;
        let result = await axios.post(`${apiEndpoint}/getRecords`, {
          username: username,
        });
        setHistoryData(result.data);
  
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    useEffect(() => {
      checkUserLogin();
      }, [])

    

    const volverHome = () => {
        navigate('/home');
    };

    const checkUserLogin = () => {
      let token = localStorage.getItem('token');
      if (token==null) {
        navigate("/");
      }
      else {
        getHistory();
      }
    }

    return (
        <Container component="main">
            <h1>Historial de partidas</h1>
            <br></br>
            <table id="table">
                <thead>
                <tr>
                    <th>Preguntas acertadas</th>
                    <th>Nº preguntas</th>
                    <th>Tiempo total</th>
                    <th>Fecha</th>
                </tr>
                </thead>
                <tbody>
                {historyData.map((record,i) => (
                    <tr key={record._id}>
                        <td>{record.correctQuestions}</td>
                        <td>{record.totalQuestions}</td>
                        <td>{record.totalTime} segundos</td>
                        <td>{new Date(record.doneAt).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button type="button" className="btn btn-secondary" onClick={volverHome}>Volver</button>
        </Container>
      )
};

export default History;
  
