import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {Link} from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const[books,setBooks] = useState([]);
  const[loading,setLoading] = useState(false);
  const[give, setGive]=useState(false);
  useEffect(()=>{
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response)=>{
        console.log(response.data);
        setBooks(response.data);
        //console.log(books);
        setLoading(false);
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false);
      })
  }, []);
  useEffect(() => {
    console.log(books); 
    setGive(true);

  }, [books]);
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl my-8'>Book Lists</h2>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl'/>
        </Link>
      </div>
      {loading?(
        <Spinner/>
      ):(
        <table className='w=full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.length!=0 ? books.map((book,index)=>{
              return (
              <tr key={book._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index+1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {book.title}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {book.author}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {book.publishYear}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600'/>
                    </Link>
                  </div>
                </td>
              </tr>
              )
            }
            ):<tr className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                 
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                 
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    
                      <BsInfoCircle className='text-2xl text-green-800' />
                   
                      <MdOutlineDelete className='text-2xl text-red-600' />
                  
                      <AiOutlineEdit className='text-2xl text-yellow-600'/>
                  </div>
                </td>
              </tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home
