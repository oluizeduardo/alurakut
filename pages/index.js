import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(){
  const gitHubUser = 'oluizeduardo';
  return(
    <Box>
      <img src={`https://github.com/${gitHubUser}.png`} style={{borderRadius: '8px'}}  alt=''/>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${gitHubUser}`}>
          @{gitHubUser}
        </a>
      </p>
      <hr/>
      <p>
        <AlurakutProfileSidebarMenuDefault/>
      </p>
    </Box>
  )
}

export default function Home() {
  
  const [comunities, setComunities] = React.useState([{
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  
  const favoritePeople =
  ['peas', 
  'omariosouto', 
  'codebytere', 
  'ErickWendel',
  'marcogomes'];
  
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar/>        
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className='title'>
              Bem vindo, Luiz.
            </h1>
            <OrkutNostalgicIconSet/>
          </Box>
          <Box className="subTitle">
            <h2>O que deseja fazer?</h2>
            <br/>
            <form onSubmit={function handleCreateCommunity(e){
              e.preventDefault();
              
              const dataFromForm = new FormData(e.target);
              const newComunity = {
                title: dataFromForm.get('title'),
                image: dataFromForm.get('image'),
              }

              const updatedComunities = [...comunities, newComunity];
              setComunities(updatedComunities)

            }}>
              <div>
                <input 
                  placeholder="Qual o nome da comunidade?" 
                  name="title" 
                  arial-lable="Qual o nome da comunidade?"
                  type="text"/>
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  arial-lable="Coloque uma URL para usarmos de capa"
                  type="text"/>
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Amigos ({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map((atualItem) => {
                return (
                  <li>
                    <a href={`/users/${atualItem}`} key={atualItem}>
                      <img src = {`https://github.com/${atualItem}.png`} alt='' />
                      <span>{atualItem}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Comunidades ({comunities.length})
            </h2>
            <ul>
              {comunities.map((atualItem) => {
                return (
                  <li>
                    <a href={`/users/${atualItem.title}`} key={atualItem.title}>
                      <img src = {atualItem.image} alt='' />
                      <span>{atualItem.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
