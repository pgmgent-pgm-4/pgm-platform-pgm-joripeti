import '../App.css'
import ImageRightTextLeft from '../components/ImageRightTextLeft'
import ImageLeftTextRight from '../components/ImageLeftTextRight'

import useRandomOpleiding  from '../hooks/useRandomOpleiding'
import useRandomPortfolio from '../hooks/useRandomPortfolio'
import useRandomBlogpost from '../hooks/useRandomBlogpost'
import useRandomService from '../hooks/useRandomService'

import { Alert, Avatar, Badge, Box, Card, CardContent, CardHeader, CircularProgress, List, ListItem, Typography } from '@mui/material'

export default function Home() {

// 1 item ophalen
const { data: randomOpleiding, isLoading: isLoadingOpleiding, error: errorOpleiding } = useRandomOpleiding();
const { data: randomPortfolio, isLoading: isLoadingPortfolio, error: errorPortfolio } = useRandomPortfolio();
const { data: randomBlogpost, isLoading: isLoadingBlogpost, error: errorBlogpost } = useRandomBlogpost();
const { data: randomService, isLoading: isLoadingService, error: errorService } = useRandomService();

if (isLoadingOpleiding || isLoadingPortfolio || isLoadingBlogpost || isLoadingService) return <CircularProgress />;
if (!randomOpleiding || !randomPortfolio || !randomBlogpost || !randomService) return <Alert severity='warning'>Geen data gevonden</Alert>;
if (errorOpleiding || errorPortfolio || errorBlogpost || errorService) return <Alert severity='error'>oeps... dit lukte niet helemaal</Alert>;

  return (
    <div className='home_mid'>  
      <ImageRightTextLeft 
        key={randomOpleiding.id}
        imageSrc={randomOpleiding.opleidingPic}
        textContent={
          <>
            <Typography variant='h4' sx={{margin: 1}}>
              {randomOpleiding.opleidingTitel}
            </Typography>
            <Typography variant='body1' sx={{margin: 1}}> 
              omschrijving: {randomOpleiding.opleidingOmschrijving}
            </Typography> 
            <Typography variant='body2' sx={{margin: 1, mb:4 }}>
              ECTS: {randomOpleiding.opleidingEcts} 
            </Typography>
            <Box variant='body2' sx={{margin: 1}}> 
              <Card variant='outlined' sx={{ padding: '1rem'}}>
                <CardHeader
                title={
                  <Badge badgeContent={randomOpleiding.instructeurs.length} color='secondary' className='badge'>
                    Instructeurs  
                  </Badge>
              } titletopographyprops={{ variant: 'h6' }} 
              />
              <CardContent>
                <List>
                  {randomOpleiding.instructeurs.map((instructeur, index) => (
                      <ListItem key={`opleiding-${index}`} className='home list_item'>
                        <Avatar 
                          src={instructeur.instructeurPic} 
                          alt={instructeur.instructeurVoornaam} 
                          className='pic-avatar'
                          sx={{ width: 70, height: 70 }}
                          />
                        <div>
                          <Typography variant="subtitle1">
                            {instructeur.instructeurVoornaam} {instructeur.instructeurFamilienaam}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            BIO • {instructeur.instructeurBio}
                          </Typography>
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                </Card>
            </Box>
          </>
        }
      />
      <ImageLeftTextRight 
        key={randomPortfolio.id}
        imageSrc={randomPortfolio.portfolioPic}
        textContent={
          <>
            <Typography variant='h4' sx={{margin: 1}}>
              {randomPortfolio.portfolioTitel}
            </Typography>
            <Typography variant='body1' sx={{margin: 1, mb:4 }}> 
              Omschrijving • {randomPortfolio.portfolioOmschrijving}
            </Typography>
            <Box variant='body2' sx={{margin: 1}}> 
              <Card variant='outlined' sx={{ padding: '1rem'}}>
                <CardHeader
                title={
                  <Badge badgeContent={randomPortfolio.opleidingen.length} color='secondary' className='badge'>
                    Opleidingen  
                  </Badge>
              } titletopographyprops={{ variant: 'h6' }} 
              />
              <CardContent>
                <List>
                  {randomPortfolio.opleidingen.map((opleiding, index) => (
                      <ListItem key={`opleiding-${index}`} className='home list_item'>
                        <div>
                          <Typography variant="subtitle1">
                            {opleiding.opleidingTitel}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Omschrijving • {opleiding.opleidingOmschrijving}
                          </Typography>
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                </Card>
            </Box>
          </>
        }
      />
      <ImageRightTextLeft 
        key={randomBlogpost.id}
        imageSrc={randomBlogpost.imageUrl}
        textContent={
          <>
            <Typography variant='h4' sx={{margin: 1}}>
              {randomBlogpost.blogpostTitel}
            </Typography>
            <Typography variant='body1' sx={{margin: 1}}> 
              Omschrijving • {randomBlogpost.blogpostTekst}
            </Typography> 
            <Typography variant='body2' sx={{margin: 1, mb:4 }}>
              datum: {randomBlogpost.publicatieDatum} • leestijd: {randomBlogpost.leestijd} 
            </Typography>
            <Box variant='body2' sx={{margin: 1}}> 
              <Card variant='outlined' sx={{ padding: '1rem'}}>
                <CardHeader
                title={
                  <Badge badgeContent={randomBlogpost.themas?.length} color='secondary' className='badge'>
                    Thema's  
                  </Badge>
              } titletopographyprops={{ variant: 'h6' }} 
              />
              <CardContent>
                <List>
                  {randomBlogpost.themas?.map((thema, index) => (
                      <ListItem key={`thema-${index}`} className='home list_item'>
                          <Typography variant="subtitle1">
                            {thema.themaTitel}
                          </Typography>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                </Card>
                <Box className='home auteur'>
                  <Box>
                    <Typography variant="subtitle1">
                      Auteur • {randomBlogpost.auteur.voornaam} {randomBlogpost.auteur.familienaam}
                    </Typography>
                  </Box>
                  <Avatar 
                  src={randomBlogpost.auteur.imageUrl} 
                  alt={`${randomBlogpost.auteur.voornaam} ${randomBlogpost.auteur.familienaam}`}
                  className='pic-avatar'
                  sx={{ width: 70, height: 70 }}
                  />
                </Box>
            </Box>
          </>
        }
      />
      <ImageLeftTextRight 
        key={randomService.id}
        imageSrc={randomService.servicePic}
        textContent={
          <Box >
            <Typography variant='h4' sx={{margin: 1}}>
              {randomService.serviceTitel}
            </Typography>
            <Typography variant='body1' sx={{margin: 1, mb:4 }}> 
              Omschrijving • {randomService.serviceOmschrijving}
            </Typography>
          </Box>
        }
      />
    </div>
  );
}
