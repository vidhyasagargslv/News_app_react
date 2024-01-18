
import React from 'react'
import './Home.css'
import { useState,useEffect } from 'react'
import axios from 'axios'

export default function Homepage() {

    const [Articles, setArticles] = useState([]);

    const apiurl="https://newsapi.org/v2/everything?q=tesla&from=2023-12-18&sortBy=publishedAt&apiKey=0d2e831c03224c2b8d2ae6943047a474"

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



    return (
        
    <div>
        <nav className='navbar flex flex-row'>
        <div className="NewsApp text-white text-3xl font-bold font-['Poppins'] tracking-widest m-8 ml-14 ">NEWS APP</div>
        </nav>

        <div className="app-heading text-center text-4xl font-bold my-6">
        Your Source for Breaking News and Updates
        </div> <br />


        {/* card for the news app */}
        {Articles.map(Article => (
      
    <div className='flex flex-row flex-wrap m-6 '>
        {Articles.map(Article => (
            <div key={Article.title} className='mainbox'>
                <a href={Article.url} target="_blank">
                    <div className='box'>
                        <div className='author m-4 line-clamp-1'>{Article.author}</div>
                        <div className='title m-4 line-clamp-3'>{Article.title}</div>
                        <img className='image' src={Article.urlToImage} alt={Article.title} />
                        <div className='time m-4'>{Article.publishedAt}</div>
                    </div>
                </a>
            </div>
        ))}
    </div>
       ))}

    </div>
  )
}
