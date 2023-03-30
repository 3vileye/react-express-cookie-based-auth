import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import {Box,Typography} from '@mui/material';
import {useTitle} from '../../../context/Title.context'



const TitleBar = () => {
    const {title} = useTitle();  
  return (
    <>
    <Box 
        sx={{
            width: '100%',
            flexShrink: 0,
            backgroundColor:"pink",
            paddingY: "12px",
            paddingX: "24px",
            
            }}
    >
        <Typography variant="h6" component="div" sx={{  }}>
            {title}
          </Typography>
    </Box>

    </>
  )
}

export {TitleBar}
