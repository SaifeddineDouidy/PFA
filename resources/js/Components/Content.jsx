import img from '../../assets/img/laptop.jpg'
import React from 'react'

const Content = () => {
  return (
    <div className='h-full w-full bg-white py-16 px-4'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
            <img className='w-[500px] mx-auto my-4' src={img} alt="/" />
            <div className='flex flex-col justify-center'>
                <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Trouvez votre emploi idéal dès maintenant</h1>
                <p className=''>Notre site offre une expérience utilisateur unique et vous permet de trouver facilement et rapidement les offres d'emploi qui vous correspondent.</p>
                <button className="mt-5 w-[200px] relative border-2 border-black bg-black px-5 py-2.5 font-medium text-[#00df9a] transition-all duration-700 ease-in-out rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:bg-gray-200 hover:text-[#00df9a] hover:scale-105 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white before:transition-transform before:duration-700 before:content-[''] hover:before:scale-x-100">
                En savoir plus
                </button>
            </div>
        </div>
      
    </div>
  )
}

export default Content
