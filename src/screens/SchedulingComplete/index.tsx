import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StatusBar, useWindowDimensions } from 'react-native'
import DoneSvg from '../../assets/done.svg'
import LogoSvg from '../../assets/logo_background_gray.svg'
import { ConfimButton } from '../../components/ConfimButton'
import {
    Container,
    Content, Footer, Message, Title
} from './styles'




export function SchedulingComplete(){
    const {width} = useWindowDimensions()
    const navigation = useNavigation()

    function handleHome(){
        navigation.navigate('Home')
    }
   return(
      <Container>
          <StatusBar 
            barStyle='light-content'
            translucent
            backgroundColor='transparent'
          />
          <LogoSvg width={width}/>
            <Content>
                <DoneSvg width={80} height={80}/>
                <Title>Carro Alugado!</Title> 
                <Message>
                    Agora você só precisa ir {'\n'}
                    até a concessionária da RENTX {'\n'}
                    pegar o seu automóvel.
                </Message> 
            </Content> 
            <Footer>
                <ConfimButton title='OK' onPress={handleHome}/>
            </Footer> 
      </Container>
   )
}