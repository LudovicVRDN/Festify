import React from 'react'
import TornEdge from '../../components/TornEdge'

const SkillsPage = () => {
  return (
    <div>
       <TornEdge position='top' />
       <section className='bg-black '>
       <h1 className="font-metal text-4xl text-festify-red  text-center ">Tes compétences</h1>
       <p className='text-lg lg:text-xl  text-center tracking-widest '>Ici tu peux lister et mettre à jour tout ce que tu sais mieux faire que personne ! </p>
       <ul className='m-auto'>
        <li className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4">Manger</li>
         <li className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4">Manger</li>
          <li className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4">Manger</li>
           <li className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4">Manger</li>
            <li className="bg-transparent border-b border-zinc-700 outline-none pt-2 pb-2 lg:pb-4">Manger</li>
       </ul>
    </section>
       <TornEdge position='bottom'/>
    </div>
  )
}

export default SkillsPage
