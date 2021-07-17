import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

async function getFollowers(username) {
  const data = await fetch(`https://api.github.com/users/${username}/followers`);
  if (!data.ok) return [];
  const json = await data.json();
  const followers = json.map(({ id, login, avatar_url }) => ({ id: id, title: login, image: avatar_url }))
  return followers;
}

async function getFollowing(username) {
  const data = await fetch(`https://api.github.com/users/${username}/following`);
  if (!data.ok) return [];
  const json = await data.json();
  const following = json.map(({ id, login, avatar_url }) => ({ id: id, title: login, image: avatar_url }))
  return following;
}

async function getCommunities(){
  return [{
    id: '32132165489979546544',//randon id.
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  },
  {
    id: '321321654899795444',//randon id.
    title: 'Alura',
    image: 'https://placehold.it/300x300'
  }];
}

function ProfileSidebar(){
  const gitHubUser = 'oluizeduardo';
  return(
    <Box as="aside">
      <img src={`https://github.com/${gitHubUser}.png`} style={{borderRadius: '8px'}}  alt=''/>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${gitHubUser}`}>
          @{gitHubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>      
    </Box>
  )
}

function ProfileRelationsBox({ items, title, limit, total }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({total})
      </h2>
      <ul>
        {items.slice(0, limit).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`https://github.com/${itemAtual.title}`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const [followers, setFollowers] = React.useState([]);
  const [following, setFollowing] = React.useState([]);
  const [comunities, setComunities] = React.useState([]);

  React.useEffect(async () => {
    setFollowers(await getFollowers('oluizeduardo'));
    setFollowing(await getFollowing('oluizeduardo'));
    setComunities(await getCommunities());
  }, [])

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
                id: new Date().toISOString(),
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
          <ProfileRelationsBox title="Seguindo" items={following} limit={6} total={following.length} />
          <ProfileRelationsBox title="Seguidores" items={followers} limit={6} total={followers.length} />
          <ProfileRelationsBox title="Comunidades" items={comunities} limit={6} total={comunities.length} />
        </div>
      </MainGrid>
    </>
  )
}
