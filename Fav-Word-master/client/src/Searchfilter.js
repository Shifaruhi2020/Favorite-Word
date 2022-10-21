


// import React,{useEffect,useState} from 'react'
// import './Searchfilter.css'
// import axios from "axios";


// function Searchfilter(){
//     const[loading,setLoading]=useState(false);
//     const[posts,setPosts]=useState([]);
//     const[subposts,setSubPosts]=useState([]);
//     const[searchTitle,setSearchTitle]=useState("");
//     const{newlist, setNewlist}=useState([]);


    
// //    localStorage.setItem("user_id",3)
// //    localStorage.setItem('email',"jai@gmail.com")
//    let uid=localStorage.getItem("user_id")
      

// function refreshPage() {
//     window.location.reload(false);
//   }

//   const handleClick=(id)=>{
//       localStorage.setItem("word_id",id)
    
//   }
//   const handleClickagain=(sentence)=>{
//     localStorage.setItem("sentence",sentence)
  
// }

// const submitHandler=(event)=>{
//     const sentence=localStorage.getItem('sentence')
//     const email=localStorage.getItem('email')
//     const user_id=localStorage.getItem("user_id")
//     const word_id=localStorage.getItem("word_id")
//     axios
//        .post("http://127.0.0.1:8000/subscribe",{
//         // sentence,
//         // email,
//         user_id,
//         word_id
//        })
//        .then((response)=>{
//            console.log(response);

//        })
//        .catch((error)=>{
//          console.log(error)
//        });
        
         
// };



//     useEffect(()=>{
//         const loadPosts = async ()=>{
//             setLoading(true);
//             const response=await axios.get("http://127.0.0.1:8000/word");
//             setPosts(response.data.Word);
//             setLoading(false);
            
//         };
//         loadPosts();
//     },[]);
    



//     useEffect(()=>{
//         const loadSubPosts = async ()=>{
           
//             const resp=await axios.get("http://127.0.0.1:8000/subs");
//             setSubPosts(resp.data.Order);
          
//         };
//         loadSubPosts();
//     },[]);

//    let x,y;
//    x =subposts.filter(function(item){
//        return item.user_id==uid;
//    }).map(function({email,id,sentence,word_id}){
//        return {word_id,sentence};
//    })


//    y=posts.filter((itemA)=>{
//        return !x.find((itemB)=>{
//            return itemA.id===itemB.word_id;

//        })
//    })



   
//     return(
//         <div className='container'>
            
//             <input
//             type="text"
//             placeholder='Search for word'
//             onChange={(e)=>setSearchTitle(e.target.value)}
//             />
            
//             {loading?(
//                 <h4>Loading....</h4>
//             ):(
//                 y.filter((value)=>{
//                     if(searchTitle===""){
//                         return value;
//                     }else if(value.sentence.includes(!searchTitle.toLowerCase())){
                        
//                      return "no result"
//                                             }
//                  else if(value.sentence.includes(searchTitle.toLowerCase())  ){
//                         // setNewlist(value)
                       
//                         return value;
//                     }
//                 }).map((item)=> <ul className='set' key={item.id}> 
//                 <li className='set-item'  key={item.sentence} > 
//                 {item.sentence}
                
//                 <button 
//                 // onClick={(event) => addbutton(event)}
//                 onClick={()=>{
//                    handleClick(item.id)
//                    handleClickagain(item.sentence)
//                    submitHandler()
//                    refreshPage()
//                 }
//                 }

//                className='sub_but'> Subscribe</button>
//                 {/* <p> {item.id}</p> */}
//                 </li>
//                 </ul>)
               
//             )}
          
          

//         </div>
//     );


//     }
//  export default Searchfilter;












 /*new code */
import React,{useEffect,useState} from 'react'
import './Searchfilter.css'
import axios from "axios";


function Searchfilter(){
    const[loading,setLoading]=useState(false);
    const[posts,setPosts]=useState([]);
    const[subposts,setSubPosts]=useState([]);
    const[searchTitle,setSearchTitle]=useState("");
    const{newlist, setNewlist}=useState([]);


    
//    localStorage.setItem("user_id",4)
//    localStorage.setItem('email',"sadiya@gmail.com")
   let uid=localStorage.getItem("user_id")
      

function refreshPage() {
    window.location.reload(false);
  }

  const handleClick=(id)=>{
      localStorage.setItem("word_id",id)
    
  }
  const handleClickagain=(sentence)=>{
    localStorage.setItem("sentence",sentence)
  
}

const submitHandler=(event)=>{
    const sentence=localStorage.getItem('sentence')
    const email=localStorage.getItem('email')
    const user_id=localStorage.getItem("user_id")
    const word_id=localStorage.getItem("word_id")
    axios
       .post("http://127.0.0.1:8000/subscribe",{
        user_id,
        word_id
       })
       .then((response)=>{
           console.log(response);

       })
       .catch((error)=>{
         console.log(error)
       });
        
         
};


let [word_search,SetWord_search]=useState()
    useEffect(()=>{
        const loadPosts = async ()=>{
            setLoading(true);
            let word_search=localStorage.getItem("search_word")
            console.log(word_search)
            const response=await axios.get("http://127.0.0.1:8000/srch/"+word_search);
           

            setPosts(response.data.Word);
            setLoading(false);
            
        };
        loadPosts();
    },[]);
    

 const search=(event)=>{
     localStorage.setItem("search_word",searchTitle)

}

    useEffect(()=>{
        const loadSubPosts = async ()=>{
           
            const resp=await axios.get("http://127.0.0.1:8000/subscribe/"+localStorage.getItem("user_id"));
            setSubPosts(resp.data.Order);
          
        };
        loadSubPosts();
    },[]);

   let x,y;
   x =subposts.filter(function(item){
       return item.user_id==uid;
   }).map(function({email,id,sentence,word_id}){
       return {word_id,sentence};
   })


   y=posts.filter((itemA)=>{
       return !x.find((itemB)=>{
           return itemA.id===itemB.word_id;

       })
   })


    let ans="result not found";
   
    return(
        <div className='container'>
            
            <input className='inp'
            type="text"
            placeholder={localStorage.getItem("search_word")?localStorage.getItem("search_word"):'Search for word'}
            onChange={(e)=>setSearchTitle(e.target.value)}
            />
            <button className="sub-but2"  onClick={()=>{
                   search()
                   refreshPage()
                }
                }>
                Search
            </button>
            
            {loading?(
                <h4>Loading....</h4>
            ):(
                y.filter((value)=>{
                    // if(searchTitle===""){
                    //     return value;
                    // }else
                     if (value.sentence.includes(searchTitle.toLowerCase())){
                        // setNewlist(value)
                       
                        return value;
                    }
                }).map((item)=> <ul className='set' key={item.id}> 
                <li className='set-item'  key={item.sentence} > 
                {item.sentence}
                
                <button 
                // onClick={(event) => addbutton(event)}
                onClick={()=>{
                   handleClick(item.id)
                   handleClickagain(item.sentence)
                   submitHandler()
                   refreshPage()
                }
                }

               className='sub-but'> Subscribe</button>
                {/* <p> {item.id}</p> */}
                </li>
                </ul>)
               
            )}
          
          

        </div>
    );


    }
 export default Searchfilter;


