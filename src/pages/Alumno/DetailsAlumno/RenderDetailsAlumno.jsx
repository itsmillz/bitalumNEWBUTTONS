import React from 'react'
import HeaderAlumno from '../../../components/headers/headerAlumno'
import DetailsBitaAlumno from './DetailsBitaAlumno'
import { Grid } from '@mui/material'
const RenderDetailsAlumno = () => {

    return (
        <Grid sx={{width: "100%", display:'flex', flexDirection:'column',  minHeight:'100vh'}}>
            <HeaderAlumno/>
           <DetailsBitaAlumno/>
        </Grid>
    )
}

export default RenderDetailsAlumno;