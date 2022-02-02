import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { ImageSlider } from '../../components/ImageSlider'
import { CarDto } from '../../dto/CarDto'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import {
    About, Accessories, Brand, CarImages, Container, Content, Description, Details, Footer, Header, Name, Period,
    Price, Rent
} from './styles'

interface Params {
    car: CarDto
}

export function CarDetails(){
    const navigation = useNavigation()
    const route = useRoute()
    const {car} = route.params as Params

    function handleSchedulling(){
        navigation.navigate('Scheduling', {car})
    }

    function handleBack(){
        navigation.goBack()
    }
   return(
      <Container>
             <StatusBar 
                    barStyle='dark-content'
                    translucent
                    backgroundColor='transparent'
                />
            <Header>
                <BackButton onPress={handleBack} />
            </Header>   
            <CarImages>
                <ImageSlider imageUrl={car.photos}/>
            </CarImages>     

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory 
                                key={accessory.type} 
                                name={accessory.name} 
                                icon={getAccessoryIcon(accessory.type)}/>
                        ))
                    }
                </Accessories>
                <About>{car.about}</About>
            </Content>  
            <Footer>
                <Button title='Escolher período do aluguel' onPress={handleSchedulling} />
            </Footer>
      </Container>
   )
}