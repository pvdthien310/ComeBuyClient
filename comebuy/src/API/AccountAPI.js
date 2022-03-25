import axios from 'axios'
import DatabaseClient from './baseAPI'


export const register = (dataForReg) => DatabaseClient.post('/account', dataForReg)