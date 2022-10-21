import  React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import FolderIcon from '@mui/icons-material/Folder';
// import DeleteIcon from '@mui/icons-material/Delete';
import { useState,useEffect } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableContainer from '@mui/material/TableContainer';
// import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
// import TableRow from '@mui/material/TableRow';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import '/Users/ar-sadiyya.fayaz/sanavi project2/client/src/pages/Subscription.css';
import axios from "axios";
// import { Button } from '@mui/material';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));


export default function InteractiveList() {

 const [wordlist,setWordlist]=useState([])
 let [wordId, setWordId] = useState(0)
 let [optionwords, setoptionwords] = useState([])


useEffect(() => {
    const getData = async () => {
      
        const res= await axios.get('http://127.0.0.1:8000/subscribe/'+localStorage.getItem("user_id"));
        console.log(res)
        // const data=await res.json();
      console.log(res.data.Order)
      setWordlist(res.data.Order)   
    };
    getData();
  }, [wordId,optionwords]);
 
  
  let deletebutton= async (event)=>{
    // setId(event.target.value)
    console.log(event.target)
    console.log(event.target.value)
    // alert("u clicked")
    wordId=event.target.value
    console.log(wordId)
    setWordId(event.target.value)
    localStorage.setItem('word_id',event.target.value)
  //   if(localStorage.getItem("word_id"))
  //   {
  //   <CircularProgress sx={{ display: 'flex' }}/>
  // }
  // else{
  //   localStorage.removeItem("word_id")
  // }
    // try{
      const result= await axios.delete('http://127.0.0.1:8000/unsubscribe/'+wordId,
      {
    method: 'DELETE',
     header: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
       }
      }
      );
    //   const data=await result.json();
      console.log(result)
      // localStorage.removeItem("word_id")
    // }catch(error){
    //   console.log(error) 
    // }
    // window.location.reload(false);
  }

  

   optionwords = wordlist.map((word) =>
  
  //  <TableContainer
  <ul className='set'
   component={Paper}>
   {/* <Table  */}
    <li 
   sx={{ minWidth: 700 }} aria-label="customized table">
     
       {/* <TableBody> */}
                {/* <StyledTableRow */}
                <li
                 className='set-item'  value={word.id} 
                // onClick={console.log(word.id)}
                >
                  {word.sentence}
                  <>
               {/* <card className='DELBUTTON' sx={{ flexGrow: 2, maxWidth: 3000 }}> */}
                 
               <button className="positiondelbutton" 
                  edge="end" 
                  aria-label="delete" 
                  value={word.id} 
                  // onClick={(event) => deletebutton(event),
                    
                  //   refreshPage
                  // }
                  onClick={(event)=>{
                    deletebutton(event)
                    refreshPage()
                 }
                 }
                 >
                         
                   
                        unsubscribe
                      </button>
                     
                    
                    </> 
                    </li> 
                
                  </li>
                
    </ul>
                
                 
            );

            function refreshPage() {
              window.location.reload(false);
            }
  return (
   <><div>
   
    </div><Box sx={{ flexGrow: 3, maxWidth: 3000 }}>

        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" className="div">
          List of registered Favorite word
          </Typography>
          <Demo>
            <List>

              <ListItem
              >
               
                <ListItemText className='subscribe'
                  // primary="Single-line item"
                  primary={optionwords}
                   />
              </ListItem>

            </List>
          </Demo>
        </Grid>
                  
{/* {localStorage.getItem("word_id")?<CircularProgress sx={{ display: 'flex' }}/>:null} */}
        
      </Box></>
  );

  
};