import { Typography } from "@mui/material";
import { Container } from "@mui/system";

const Tietoa = (props) => {


    return (
        <>
            <Container sx={{bgcolor: "yellow", height: "100vh"}}> 
                <Typography variant="h6" align="center">Tämä on Tietoa sivu</Typography>

                <Typography variant="h6" align="center">Tämä on tullut kokoelma sivulta: {props.laskuri}</Typography>
            </Container>


        
        
        </>
    )
}
export {Tietoa}