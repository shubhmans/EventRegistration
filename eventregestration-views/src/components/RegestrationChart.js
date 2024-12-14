import React, { PureComponent,useState,useEffect } from "react";
import {Grid, MenuItem, Select, Divider} from '@material-ui/core';
import Title from './Title';

import axios from 'axios';
import querystring from "querystring";
import { LineChart,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";

function RegestrationChart() {

    const [graphData, setGraphData] = useState([])
    const [duration, setDuration] = useState("last_month")
    
    const handleChange = (event)=>{
      event.preventDefault()
      setDuration(event.target.value)
    } 

    useEffect(() => {
        axios.post('http://localhost:8080/admin/users', querystring.stringify({duration: duration}))
        .then((res)=>{
            if(res.status === 200){
              setGraphData(res.data.reg_data)
              
            }
            
        })
        .catch((error)=>{
            alert('Internal server error'+error);
        })
    }, [duration])
  return (
    <React.Fragment>
      <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>   
            <Title>Regestrations</Title>         
          </Grid>
          <Grid item xs={12} md={4} lg={3} >
          
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
          <div style={{marginLeft:50}}>
            <Select
              id="select-duration"
              variant="outlined"
              value={duration}
              onChange={handleChange}
              style={{ maxWidth: 200 ,maxHeight:40}}
            >
              <MenuItem value="current_month">Current Month</MenuItem>
              <MenuItem value="last_month">Last Month</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </div>
          </Grid>
      </Grid>
      <ResponsiveContainer width="100%" height={500}>
      <LineChart
        width={1200}
        height={450}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 20
        }}
      >
        <XAxis dataKey="_id" interval={1} label={{value:"Timeline", position:"bottom"}}/>
        <YAxis label={{value:"Count" ,angle:-90 }}/>
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default RegestrationChart;