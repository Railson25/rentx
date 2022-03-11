import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { StatusBar, useWindowDimensions } from 'react-native'
import DoneSvg from '../../assets/done.svg'
import LogoSvg from '../../assets/logo_background_gray.svg'
import { ConfimButton } from '../../components/ConfimButton'
import {
    Container,
    Content, Footer, Message, Title
} from './styles'

interface Params {
    title: string
    message: string
    nextScreenRoute: string
}

export function Confirmation(){
    const {width} = useWindowDimensions()
    const navigation = useNavigation()
    const route = useRoute()

    const {title, message, nextScreenRoute} = route.params as Params

    function handleHome(){
        navigation.navigate(nextScreenRoute)
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
                <Title>{title}</Title> 
                <Message>
                    {message}
                </Message> 
            </Content> 
            <Footer>
                <ConfimButton title='OK' onPress={handleHome}/>
            </Footer> 
      </Container>
   )
}