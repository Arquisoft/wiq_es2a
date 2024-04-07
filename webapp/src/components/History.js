import React, { useState } from 'react';
import { Container} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useEffect } from 'react';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const History = () => {

    const getHistory = async () => {
      try {
        let result = await axios.post(`${apiEndpoint}/getRecords`, {
          username: username,
        });
        console.log(result)
  
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

    return (
        <Container component="main">
        
        </Container>
      )
};

export default History;
  
