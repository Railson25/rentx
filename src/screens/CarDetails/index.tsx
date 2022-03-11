import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useTheme } from 'styled-components'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { ImageSlider } from '../../components/ImageSlider'
import { CarDto } from '../../dto/CarDto'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import {
    About, Accessories, Brand, CarImages, Container, Description, Details, Footer, Header, Name, Period,
    Price, Rent
} from './styles'

interface Params {
    car: CarDto
}

export function CarDetails(){
    const navigation = useNavigation()
    const route = useRoute()
    const {car} = route.params as Params
    const scrollY = useSharedValue(0)
    const theme = useTheme()

    const scrollHnadler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y
        console.log(event.contentOffset.y)
    })

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP
            )
        }
    })

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return{
            opacity: interpolate(
                scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP
            )
        }
    })

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
            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header, 
                    {backgroundColor: theme.colors.background_secondary}
                ]}
            >
                <Header>
                    <BackButton onPress={handleBack} />
                </Header>   
                <Animated.View style={sliderCarsStyleAnimation}>
                    <CarImages>
                        <ImageSlider imageUrl={car.photos}/>
                    </CarImages>
                </Animated.View>        
            </Animated.View>    

            <Animated.ScrollView
                 contentContainerStyle= {{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160,
                    alignItems: 'center',
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHnadler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
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
                <About>{car.about}</About>
                <About>{car.about}</About>
                <About>{car.about}</About>
                <About>{car.about}</About>
                <About>{car.about}</About>
            </Animated.ScrollView>  
            <Footer>
                <Button title='Escolher período do aluguel' onPress={handleSchedulling} />
            </Footer>
      </Container>
   )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1
    }
})