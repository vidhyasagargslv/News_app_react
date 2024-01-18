
import React, { useMemo} from 'react'
import './Home.css'
import { useState,useEffect } from 'react'
import axios from 'axios'

export default function Homepage() {

    const [Articles, setArticles] = useState([]);

const date = new Date();
date.setDate(date.getDate() - 30);
const fromDate = date.toISOString().split('T')[0];

const apiurl=`https://newsapi.org/v2/everything?q=tesla&from=${fromDate}&sortBy=publishedAt&apiKey=0d2e831c03224c2b8d2ae6943047a474`
    useEffect(() => {
        const fetchArticles = async () => {
          try {
            const response = await axios.get(apiurl);
            setArticles(response.data.articles);
          } catch (error) {
            console.error('Error fetching articles:', error);
          }
        };
    
        fetchArticles();
      }, []);

      const renderedArticles = useMemo(() => Articles.map((Article, index) => (
        <div key={index} className='mainbox'>
          <a href={Article.url} target="_blank">
            <div className='box'>
              <div className='author m-4 line-clamp-1'>{Article.author}</div>
              <div className='title m-4 line-clamp-3'>{Article.title}</div>
              <img className='image' src={Article.urlToImage} alt={Article.title} />
              <div className='time m-4'>{Article.publishedAt}</div>
            </div>
          </a>
        </div>
      )), [Articles]);



    return (
        
    <div>
        <nav className='navbar flex flex-row justify-between'>
        <div className="NewsApp text-center text-3xl font-bold font-['Poppins'] tracking-widest m-8 ml-16 ">NEWS APP</div>
        <label className="flex cursor-pointer gap-2 mr-14">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              <input type="checkbox" value="light" className="toggle theme-controller"/>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
        </label>
        </nav>

        <div className="app-heading text-center text-4xl font-bold my-6">
        Your Source for Breaking News and Updates
        </div> <br />


        {/* card for the news app */}
        {Articles.map(Article => (
      
    <div className='flex flex-row flex-wrap m-6 '>
        {renderedArticles}
    </div>
       ))}

    </div>
  )
}
