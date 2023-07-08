import React from 'react'
import HeaderAlumno from '../../../components/headers/headerAlumno'
import { Grid } from '@mui/material'
import CreateBitaAlumno from './CreateBitaAlumno'

const BitAlumnoRender = () => {

    return (
        <Grid sx={{width: "100%", display:'flex', flexDirection:'column',  minHeight:'100vh'}}>
            <HeaderAlumno/>
            <CreateBitaAlumno />
        </Grid>
    )
}

export default BitAlumnoRender;