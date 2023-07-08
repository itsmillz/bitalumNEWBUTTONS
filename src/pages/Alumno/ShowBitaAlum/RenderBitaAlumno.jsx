import React from 'react'
import ShowBitaAlumno from './ShowBitaAlumno'
import HeaderAlumno from '../../../components/headers/headerAlumno'
import { Grid } from '@mui/material'

const RenderBitaAlumno = () => {

    return (
        <Grid sx={{width: "100%", display:'flex', flexDirection:'column',  minHeight:'100vh'}}>
            <HeaderAlumno/>
           <ShowBitaAlumno/>
        </Grid>
    )
}

export default RenderBitaAlumno;