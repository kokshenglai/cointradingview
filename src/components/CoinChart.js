import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts";
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function CoinChart(props) {
  const [days, setDays] = useState('1');
  const options = {
    chart: {
      id: "coin-prices"
    },
    xaxis: {
      type: 'datetime'
    }
  };
  const [series, setSeries] = useState([]);

  const handleToggleChange = (event, newDays) => {
    setDays(newDays);
  };

  const url = `https://api.coingecko.com/api/v3/coins/${props.coinId}/market_chart?vs_currency=usd&days=${days}`;
  useEffect(() => {
    axios.get(url).then((res) => {
      setSeries([
        {
          name: "Prices",
          type: 'line',
          data: res.data.prices
        }
      ]);
    }).catch((error) => {
      console.log(error)
    })
  }, [url]);

  return (
    <Box>
      <ToggleButtonGroup
        color="primary"
        value={days}
        exclusive={true}
        onChange={handleToggleChange}
        aria-label="Price per"
      >
        <ToggleButton sx={{ width:'100px' }} value="1" aria-label="Day">Day</ToggleButton>
        <ToggleButton sx={{ width:'100px' }} value="7" aria-label="Week">Week</ToggleButton>
        <ToggleButton sx={{ width:'100px' }} value="30" aria-label="Month">Month</ToggleButton>
        <ToggleButton sx={{ width:'100px' }} value="365" aria-label="Year">Year</ToggleButton>
      </ToggleButtonGroup>
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
      />
    </Box>
  );
}