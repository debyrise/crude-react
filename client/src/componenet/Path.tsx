import React, { useState } from 'react'
import styled from '@emotion/styled'
import { BsTelephoneFill } from "react-icons/bs";
import {MdEmail} from "react-icons/md"
import Nigeria from "../assets/download (3).jpg"
import Ghana from "../assets/download (3).jpg"
import USA from "../assets/download (3).jpg"
import { AiFillDelete } from "react-icons/ai"

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Form = styled.form`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 500px;
   border-radius: 1px solid #f1f1f1;
   padding: 20px;
   flex-direction: column;
   background-color: #f1f1f1;
`;
const Input = styled.input`
    height: 40px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #dcdce9 ;
    margin-bottom: 10px;
    outline-color: #aba5f5;
    transition: all 350ms;
    padding-left: 10px;
   


`;
const Select = styled.select`
   height: 40px; 
   width: 420px;
   border-radius: 5px;
   padding: 10px;
   margin-bottom:5px;
   padding-left: 10px;
   outline-color: #aba5f5;
   border:  1px solid #dcdce9 ;
   transition: all 350ms;


`;
const Option = styled.option``;
const Button= styled.button`
    height: 30px;
    width: 220px;
    outline: none;
    border: none;
    background-color: #123456;;
    color: white;
    cursor: pointer;
`;
const CardHold =styled.div`
   display: flex;
   flex-wrap: wrap;
`;
const Hold = styled.div`
     display: flex;
     justify-content: space-between;
     align-items: center;
`;
const Card = styled.div`
     background-color: white;
     width: 400px;
    display: flex;
    margin: 10px;
    padding: 10px;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid #f1f1f1;


`;
const Tname = styled.div``
const Name = styled.div`
   font-weight:bold;

`;
const Span = styled.div`
  font-size: 11px;
`;
const Logo = styled.img`
   height: 30px;
   width: 30px;
   border-radius: 50px;
   object-fit: cover;
   background-color: silver;
`;
const Box = styled.div`
    color: gray;
	padding: 15px 5px 10px 5px;
	height: 10px;
`;
const Del = styled.div`
    
    color: red;
`

interface userdata {
    Fullname:string;
    email:string;
    phonenumber:string;
    country:string;
    id:string
}


const Mainscreen:React.FC = () => {
    const [Fullname , setfuname] = useState <string> (" ")
    const [email, setemail] = useState <string> ("")
    const [phonenumber, setphonenunmber] = useState <string> (" ")
    const [country,setcountry] = useState <string>("")
   const [togglevalue, settogglevalue] = useState <userdata>()
   const [show, setshow] = useState <boolean> (false)
   const [edithFullname, setedithFullname] =useState <string> ("")
   const [edithemail, setedithemail] =useState <string> ("")


    const [data, setdata] = useState <Array<userdata>> ([])

    const  Addcontact = () => {
		setdata((prev) => [
			...prev,

			{
				id: `${Math.random() * 139575638745}`,
				Fullname,
				email,
				phonenumber,
				country,
			},
		]);
	};

    const toggle = (props:userdata) => {
       setshow(!show)
       settogglevalue(props)
    }; 

    const Edithcontact = () => {
        const iterate = data.map((el) => {
            return el.id === togglevalue?.id
            ?{
                Fullname:edithFullname === ""  ? togglevalue?.Fullname :edithFullname,
                email: edithemail === " " ? togglevalue?.email  : edithemail,
                country:togglevalue?.country,
                phonenumber:togglevalue?.phonenumber,
                id:togglevalue?.id
            }
            :el
        });
        setdata(iterate)
    };


    const deletecontact = ( id: string) =>{
       const  filtered = data.filter((el) => el.id !== id)

        setdata(filtered)
    };



    

  return (
    <Container>
        <Form onSubmit={(e) => {
					e.preventDefault();
					Addcontact();
				}}>
            <h2>Add Contacts</h2>
            <Input  onChange={(e) => {
                setfuname(e.target.value)
            }}  placeholder='Enter fullname' required />

            <Input type="tel" maxLength={11} onChange={(e) => {
                setphonenunmber(e.target.value)
            }} required placeholder='e.g 09034567898' />

               <Input  type='email' onChange={(e)=> {
                setemail(e.target.value)
               }}required placeholder='Enter email' />

            <Select onChange={(e) => {
                setcountry(e.target.value)
            }}>
               <Option>
                 --select country--
               </Option>
               <Option value='Nigeria' >Nigeria</Option>
               <Option value='Ghana'>Ghana</Option>
               <Option value= 'USA'>USA</Option>

            </Select>
            <Button type='submit'>Submit</Button>
            
        </Form>
        <br />
        <br />
        <br />
        <h2>All Contacts</h2>
        <CardHold>
            {data?.map((props)=> (
                <Card key={props.id} >
                <Hold>
                    <Tname>
                        <Name>  {props.Fullname} </Name>
                        <Span>  {props.country}  </Span>
                    </Tname>
                    {props.country === "Nigeria" ? <Logo src={Nigeria} /> : null}

                    {props?.country === "Ghana" ? <Logo src={Ghana} /> : null}

                    {props.country === "USA" ? <Logo src={USA} /> : null}
                </Hold>
                <br />
                <Box>
                    < BsTelephoneFill/>
                    {props.phonenumber}

                </Box>
                <Box>
                    < MdEmail />
                    {props.email}

                </Box>
                <Del onClick={() => {
                    deletecontact(props.id)
                }} >{""}  <  AiFillDelete />  </Del>

                  <Button onClick={() => {
                    toggle (props)
                  }}>Edith</Button>
                  {show && togglevalue?.id === props.id? (
                    <div>
                        <Input onChange={(e)=> {
                            setedithFullname(e.target.value)
                        }} 
                        defaultValue={togglevalue?.Fullname}
                          placeholder='edit name'
                          
                          />

                          <Input onChange={(e) => {
                            setedithemail(e.target.value)
                        }}
                            defaultValue = {togglevalue?.email}
                         
                           />  
                    <Button  onClick={Edithcontact}>save</Button>
                    </div>
                  ): null}
             </Card>
            ))}
          
        </CardHold>
    </Container>
  )
}

export default Mainscreen