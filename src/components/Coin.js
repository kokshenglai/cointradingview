import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CoinChart from './CoinChart';

//renders the page with information about a specific coin
export default function Coin() {
    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.main,
    }));

    const RedItem = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'white',
        backgroundColor: theme.palette.error.main,
    }));

    const GreenItem = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'white',
        backgroundColor: theme.palette.success.main,
    }));

    const params = useParams()
    const [coin, setCoin] = useState({})

    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`

    useEffect(() => {
        axios.get(url).then((res) => {
            setCoin(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [url])

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{ height: '100vh', paddingTop: '1rem' }}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Box sx={{ paddingRight: '1rem' }}>{coin.image ? <img src={coin.image.small} alt='' /> : null}</Box>
                                <Box sx={{ paddingRight: '1rem' }}><h2>{coin.name}</h2></Box>
                                <Box sx={{ flexGrow: 1 }}>{coin.symbol ? <p>{coin.symbol.toUpperCase()}/USD</p> : null}</Box>
                                <Box><Button variant="contained">Rank # {coin.market_cap_rank}</Button></Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    {coin.market_data?.current_price ? <h3>${coin.market_data.current_price.usd.toLocaleString()}</h3> : null}
                                </Box>
                                <Box sx={{ paddingRight: '1rem' }}>
                                    {coin.market_data?.market_cap ? <div><b>${coin.market_data.market_cap.usd.toLocaleString()}</b> <br />Market Cap</div> : null}
                                </Box>
                                <Box>
                                    {coin.market_data ? <div><b>{coin.market_data.circulating_supply}</b> <br />Circulating Supply</div> : null}
                                </Box>
                            </Box>
                            <Box container>
                                <CoinChart coinId={params.coinId} />
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <b>Performance</b>
                                <Grid container spacing={2}>
                                    <Grid xs={4}>
                                        {coin.market_data?.price_change_percentage_1h_in_currency ? 
                                        (coin.market_data.price_change_percentage_1h_in_currency.usd < 0 ? 
                                            <RedItem>{coin.market_data.price_change_percentage_1h_in_currency.usd}% <br />1h</RedItem> :
                                            <GreenItem>{coin.market_data.price_change_percentage_1h_in_currency.usd}% <br />1h</GreenItem>)
                                        : <Item>1h</Item>}
                                    </Grid>
                                    <Grid xs={4}>
                                        {coin.market_data?.price_change_percentage_24h_in_currency ? 
                                        (coin.market_data.price_change_percentage_24h_in_currency.usd < 0 ? 
                                            <RedItem>{coin.market_data.price_change_percentage_24h_in_currency.usd}% <br />1d</RedItem> :
                                            <GreenItem>{coin.market_data.price_change_percentage_24h_in_currency.usd}% <br />1d</GreenItem>)
                                        : <Item>1d</Item>}
                                    </Grid>
                                    <Grid xs={4}>
                                        {coin.market_data?.price_change_percentage_7d_in_currency ?
                                        (coin.market_data.price_change_percentage_7d_in_currency.usd < 0 ? 
                                            <RedItem>{coin.market_data.price_change_percentage_7d_in_currency.usd}% <br />1w</RedItem> :
                                            <GreenItem>{coin.market_data.price_change_percentage_7d_in_currency.usd}% <br />1w</GreenItem>)
                                        : <Item>1w</Item>}
                                    </Grid>
                                    <Grid xs={4}>
                                        {coin.market_data?.price_change_percentage_14d_in_currency ?
                                        (coin.market_data.price_change_percentage_14d_in_currency.usd < 0 ? 
                                            <RedItem>{coin.market_data.price_change_percentage_14d_in_currency.usd}% <br />2w</RedItem> :
                                            <GreenItem>{coin.market_data.price_change_percentage_14d_in_currency.usd}% <br />2w</GreenItem>)
                                        : <Item>2w</Item>}
                                    </Grid>
                                    <Grid xs={4}>
                                        {coin.market_data?.price_change_percentage_30d_in_currency ?
                                        (coin.market_data.price_change_percentage_30d_in_currency.usd < 0 ? 
                                            <RedItem>{coin.market_data.price_change_percentage_30d_in_currency.usd}% <br />1m</RedItem> :
                                            <GreenItem>{coin.market_data.price_change_percentage_30d_in_currency.usd}% <br />1m</GreenItem>)
                                        : <Item>1m</Item>}
                                    </Grid>
                                    <Grid xs={4}>
                                        {coin.market_data?.price_change_percentage_1y_in_currency ?
                                        (coin.market_data.price_change_percentage_1y_in_currency.usd < 0 ? 
                                            <RedItem>{coin.market_data.price_change_percentage_1y_in_currency.usd}% <br />1y</RedItem> :
                                            <GreenItem>{coin.market_data.price_change_percentage_1y_in_currency.usd}% <br />1y</GreenItem>)
                                        : <Item>1y</Item>}
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: '1rem' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '1rem' }}>
                                    <b>24 Hour Low</b>
                                    {coin.market_data?.low_24h ? <div>${coin.market_data.low_24h.usd.toLocaleString()}</div> : null}

                                </Box>
                                {coin.market_data?.current_price && coin.market_data?.low_24h && coin.market_data?.high_24h ?
                                    <Box sx={{ flexGrow: 1, paddingRight: '1rem' }}>
                                        <Slider disabled min={coin.market_data.low_24h.usd} max={coin.market_data.high_24h.usd} defaultValue={coin.market_data.current_price.usd} aria-label="24 Hour Range" valueLabelDisplay="auto" />
                                    </Box>
                                    : null
                                }
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <b>24 Hour High</b>
                                    {coin.market_data?.high_24h ? <div>${coin.market_data.high_24h.usd.toLocaleString()}</div> : null}
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Typography sx={{ fontSize: 14 }} variant="caption" align="left" gutterBottom>
                                <h3>About</h3>
                                <p dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),
                                }}>
                                </p>
                            </Typography>
                        </CardActions>
                    </Card>
                </Box>
            </Container>
        </React.Fragment>
    )
}