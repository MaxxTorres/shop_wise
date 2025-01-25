import axios from 'axios'

export default axios.create({
    baseURL: 'https://real-time-amazon-data.p.rapidapi.com',
    headers: {
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
      'x-rapidapi-key': 'b17df51ccemsh1b9721718138f77p15a079jsnc168bb17ee62'
    }
  });