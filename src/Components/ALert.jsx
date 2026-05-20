import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
export function Toast({statue , content , open}){
    
    return(
        <Stack   sx={{ maxWidth: '100%',whiteSpace:"nowrap",position: 'fixed', top: "10%", left: "50%" , zIndex: 1000,transform: 'translateX(-50%)',borderRadius: 8 , transition: 'all 0.3s ease' ,marginTop: 2} } spacing={2} >
                <Collapse in={open}>
                                    <Alert severity={statue}>{content}</Alert>
                </Collapse>
        </Stack>
    )
}