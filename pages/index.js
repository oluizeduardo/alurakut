import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(){
  const gitHubUser = 'oluizeduardo';
  return(
    <Box>
      <img src={`https://github.com/${gitHubUser}.png`} style={{borderRadius: '8px'}} />
    </Box>
  )
}

export default function Home() {
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
              Bem vindo
            </h1>
            <OrkutNostalgicIconSet/>
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
                      <img src = {`https://github.com/${atualItem}.png`} />
                      <span>{atualItem}</span>
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
