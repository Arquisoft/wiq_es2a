import React, { useState } from 'react';
import { Container} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './History.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const History = () => {
    const [historyData, setHistoryData] = useState([]);

    const getHistory = async () => {
      try {
        let result = await axios.post(`${apiEndpoint}/getRecords`, {
          username: username,
        });
        setHistoryData(result.data);
        console.log(result.data)
  
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    useEffect(() => {
        getHistory();
      }, [])

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const username = decoded.username;

    const volverHome = () => {
        window.location.href = '/home';
      };

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
            <button type="button" class="btn btn-secondary" onClick={volverHome}>Volver</button>
        </Container>
      )
};

export default History;
  
